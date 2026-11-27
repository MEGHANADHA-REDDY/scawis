import createEngine from "./voice-engine/espeak-ng.js";

const wasm = fetch("./voice-engine/espeak-ng.wasm").then(response => {
  if (!response.ok) throw new Error("Speech engine is unavailable");
  return response.arrayBuffer();
});

let queue = Promise.resolve();
self.addEventListener("message", ({ data: { id, language, text } }) => {
  queue = queue.then(async () => {
    try {
      const engine = await createEngine({
        wasmBinary: await wasm,
        arguments: ["-v", language, "-b", "1", "-s", "155", "-w", "reply.wav", text]
      });
      const audio = engine.FS.readFile("reply.wav").buffer;
      self.postMessage({ id, audio }, [audio]);
    } catch {
      self.postMessage({ id, error: true });
    }
  });
});
