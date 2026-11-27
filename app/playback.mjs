let context;
let current;
let request;

export function primePlayback() {
  if (!globalThis.AudioContext) return;
  context ??= new AudioContext();
  if (context.state === "suspended") context.resume().catch(() => {});
}

export function cancelPlayback() {
  request?.abort();
  request = undefined;
  current?.stop();
  current = undefined;
}

export async function speakOffline(language, text, onError) {
  cancelPlayback();
  if (!context) {
    onError();
    return;
  }
  const controller = new AbortController();
  request = controller;
  try {
    if (context.state === "suspended") await context.resume();
    const response = await fetch("/api/speech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, text }),
      signal: controller.signal
    });
    if (!response.ok) throw new Error("Speech service unavailable");
    const buffer = await context.decodeAudioData(await response.arrayBuffer());
    if (controller.signal.aborted) return;
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
    if (!controller.signal.aborted) onError();
  } finally {
    if (request === controller) request = undefined;
  }
}
