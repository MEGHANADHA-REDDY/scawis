import argparse
import io
import json
import mimetypes
import threading
import wave
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from piper import PiperVoice


ROOT = Path(__file__).resolve().parent
MODELS = {"te": "te_IN-maya-medium", "hi": "hi_IN-pratham-medium"}
mimetypes.add_type("application/javascript", ".mjs")


class FittingServer(ThreadingHTTPServer):
    def __init__(self, address, model_dir):
        super().__init__(address, FittingHandler)
        self.model_dir = model_dir
        self.voices = {}
        self.speech_lock = threading.Lock()

    def speak(self, language, text):
        with self.speech_lock, io.BytesIO() as output:
            if language not in self.voices:
                self.voices[language] = PiperVoice.load(
                    self.model_dir / f"{MODELS[language]}.onnx"
                )
            with wave.open(output, "wb") as wav:
                self.voices[language].synthesize_wav(text, wav)
            return output.getvalue()


class FittingHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "app"), **kwargs)

    def do_POST(self):
        if self.path != "/api/speech":
            self.send_error(404)
            return
        if self.headers.get_content_type() != "application/json":
            self.send_error(415)
            return
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 4096:
                raise ValueError
            request = json.loads(self.rfile.read(size))
            language, text = request["language"], request["text"]
            if language not in MODELS or not isinstance(text, str) or not 0 < len(text.strip()) <= 700:
                raise ValueError
        except (TypeError, ValueError, KeyError):
            self.send_error(400, "Expected Telugu or Hindi and a short reply")
            return

        try:
            audio = self.server.speak(language, text)
        except Exception as error:
            self.log_error("Speech synthesis failed: %s", type(error).__name__)
            self.send_error(503, "Speech unavailable")
            return
        self.send_response(200)
        self.send_header("Content-Type", "audio/wav")
        self.send_header("Content-Length", str(len(audio)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        try:
            self.wfile.write(audio)
        except (BrokenPipeError, ConnectionResetError):
            pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", default=8080, type=int)
    parser.add_argument("--voices", default=ROOT / "voices", type=Path)
    options = parser.parse_args()
    with FittingServer((options.host, options.port), options.voices) as server:
        print(f"Bolkar Fit: http://{options.host}:{options.port}", flush=True)
        server.serve_forever()
