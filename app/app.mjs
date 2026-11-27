import { fields, newFitting, runTurn } from "./fitting.mjs";

const key = "bolkar-fit-v1";
const byId = id => document.getElementById(id);
const input = byId("transcript");
const speechEngine = globalThis.speechSynthesis;
let autoSubmitTimer;
let storageAvailable = true;
let state = { active: null, saved: [], sound: Boolean(speechEngine) };

try {
  const saved = JSON.parse(localStorage.getItem(key) ?? "null");
  if (saved && Array.isArray(saved.saved)) state = saved;
} catch {
  storageAvailable = false;
}

function persist() {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    storageAvailable = false;
  }
}

function say(reply) {
  byId("reply").textContent = reply.text + (storageAvailable ? "" : " Device storage is unavailable.");
  if (!state.sound || !speechEngine) return;
  speechEngine.cancel();
  const voices = speechEngine.getVoices();
  const telugu = voices.find(voice => /^te(?:-|_|$)/i.test(voice.lang));
  function speakEnglish() {
    const fallback = new SpeechSynthesisUtterance(reply.text);
    fallback.lang = "en-IN";
    const english = voices.find(voice => /^en-IN$/i.test(voice.lang))
      ?? voices.find(voice => /^en(?:-|_|$)/i.test(voice.lang));
    if (english) fallback.voice = english;
    fallback.onerror = event => {
      if (event.error !== "canceled" && event.error !== "interrupted") {
        byId("reply").textContent = reply.text + " Spoken reply unavailable on this device.";
      }
    };
    speechEngine.speak(fallback);
  }
  if (!telugu) {
    speakEnglish();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(reply.speech);
  utterance.lang = "te-IN";
  utterance.voice = telugu;
  utterance.onerror = event => {
    if (event.error !== "canceled" && event.error !== "interrupted") speakEnglish();
  };
  speechEngine.speak(utterance);
}

function makeRows(values) {
  return fields.map(field => {
    const row = document.createElement("div");
    row.className = "measurement";
    const name = document.createElement("dt");
    name.textContent = field.speech;
    const value = document.createElement("dd");
    value.textContent = values[field.id] === undefined ? "Pending" : `${values[field.id]} in`;
    row.append(name, value);
    return row;
  });
}

function renderHistory() {
  const history = byId("history");
  history.replaceChildren();
  if (!state.saved.length) {
    const empty = document.createElement("p");
    empty.textContent = "Completed fitting cards appear here.";
    history.append(empty);
    return;
  }
  state.saved.forEach(fitting => {
    const entry = document.createElement("details");
    const heading = document.createElement("summary");
    heading.textContent = [fitting.customer, new Date(fitting.savedAt).toLocaleString()].filter(Boolean).join(" · ");
    const list = document.createElement("dl");
    list.append(...makeRows(fitting.values));
    entry.append(heading, list);
    history.append(entry);
  });
}

function render() {
  const active = state.active;
  byId("customer").textContent = active?.customer || "కస్టమర్ పేరు ఇంకా నమోదు కాలేదు";
  const values = active?.values ?? {};
  const count = fields.filter(field => values[field.id] !== undefined).length;
  byId("badge").textContent = active?.savedAt ? "Saved" : active ? "In progress" : "No fitting";
  byId("progress").textContent = `${count} of ${fields.length} measurements`;
  byId("meter").value = count;
  byId("measurements").replaceChildren(...makeRows(values));
  input.disabled = !active || Boolean(active.savedAt);
  byId("process").disabled = input.disabled;
  const save = byId("save");
  save.hidden = input.disabled || count !== fields.length || active?.pending?.type === "replace";
  save.textContent = active?.pending?.type === "save" ? "Confirm save" : "Save fitting";
  byId("sound").disabled = !speechEngine;
  byId("sound").textContent = speechEngine ? (state.sound ? "Sound on" : "Sound off") : "Sound unavailable";
  byId("sound").setAttribute("aria-pressed", String(Boolean(speechEngine && state.sound)));
  renderHistory();
}

byId("new").addEventListener("click", () => {
  if (state.active && !state.active.savedAt) {
    const okay = window.confirm("Start a new fitting and discard the current draft?");
    if (!okay) return;
  }
  state.active = newFitting();
  clearTimeout(autoSubmitTimer);
  input.value = "";
  persist();
  render();
  input.focus();
  say({ text: "Say the customer name or a measurement.", speech: "ఫిట్టింగ్ మొదలైంది. కస్టమర్ పేరు లేదా కొలత చెప్పండి." });
});

byId("sound").addEventListener("click", () => {
  state.sound = !state.sound;
  if (!state.sound) speechEngine?.cancel();
  persist();
  render();
});

function submitTurn(transcript) {
  clearTimeout(autoSubmitTimer);
  if (!transcript.trim() || input.disabled) return;
  const active = state.active;
  const reply = runTurn(active, transcript);
  if (active?.savedAt && !state.saved.some(fitting => fitting.id === active.id)) {
    state.saved.unshift(active);
  }
  input.value = "";
  persist();
  render();
  if (!input.disabled) input.focus();
  say(reply);
}

byId("form").addEventListener("submit", event => {
  event.preventDefault();
  submitTurn(input.value);
});

function scheduleAutoSubmit(event) {
  clearTimeout(autoSubmitTimer);
  if (event.isComposing || !input.value.trim()) return;
  // Wait for the field to settle in case dictation arrives in several edits.
  autoSubmitTimer = setTimeout(() => submitTurn(input.value), 700);
}

input.addEventListener("input", scheduleAutoSubmit);
input.addEventListener("compositionend", scheduleAutoSubmit);

byId("save").addEventListener("click", () => {
  submitTurn(state.active?.pending?.type === "save" ? "yes" : "save");
});

render();
if (state.active && !state.active.savedAt) {
  byId("reply").textContent = state.active.pending?.reply?.text ?? "Your draft is ready to continue.";
}
