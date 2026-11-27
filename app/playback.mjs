let context;
let worker;
let current;
let sequence = 0;

export function primePlayback() {
  if (!globalThis.AudioContext) return;
  context ??= new AudioContext();
  if (context.state === "suspended") context.resume().catch(() => {});
}

export function cancelPlayback() {
  sequence += 1;
  current?.stop();
  current = undefined;
}

export async function speakOffline(language, text, onError) {
  cancelPlayback();
  const id = sequence;
  if (!context) {
    onError();
    return;
  }
  try {
    if (context.state === "suspended") await context.resume();
    if (id !== sequence) return;
    worker ??= new Worker(new URL("./voice-worker.mjs", import.meta.url), { type: "module" });
    worker.onerror = () => {
      worker.terminate();
      worker = undefined;
      if (id === sequence) onError();
    };
    worker.onmessage = async ({ data }) => {
      if (id !== sequence || data.id !== id) return;
      try {
        if (data.error) throw new Error("Speech synthesis failed");
        const buffer = await context.decodeAudioData(data.audio);
        if (id !== sequence) return;
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.onended = () => {
          if (current === source) current = undefined;
          source.disconnect();
        };
        source.start();
        current = source;
      } catch {
        if (id === sequence) onError();
      }
    };
    worker.postMessage({ id, language, text });
  } catch {
    onError();
  }
}
