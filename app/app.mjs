import { fields, newFitting, runTurn } from "./fitting.mjs";
import { fieldText, languages, uiText } from "./language.mjs";
import { cancelPlayback, primePlayback, speakOffline } from "./playback.mjs";

const key = "bolkar-fit-v1";
const byId = id => document.getElementById(id);
const input = byId("transcript");
const speechEngine = globalThis.speechSynthesis;
const hasOfflineVoice = Boolean(globalThis.AudioContext && globalThis.Worker && location.protocol !== "file:");
const canSpeak = Boolean(speechEngine || hasOfflineVoice);
let autoSubmitTimer;
let lastReply;
let storageAvailable = true;
let state = { active: null, saved: [], sound: canSpeak };

try {
  const saved = JSON.parse(localStorage.getItem(key) ?? "null");
  if (saved && Array.isArray(saved.saved)) state = saved;
} catch {
  storageAvailable = false;
}
let lang = languages.includes(state.lang) ? state.lang : "te";
const t = key => uiText(key, lang);
const replyText = reply => (lang === "te" ? reply.speech : lang === "hi" ? reply.hindi : reply.text) ?? reply.text;

function showReply(reply) {
  byId("replay").hidden = !canSpeak || !reply;
  byId("reply").textContent = (reply ? replyText(reply) : t(state.active?.savedAt ? "saved" : state.active ? "draft" : "idle"))
    + (storageAvailable ? "" : " " + t("storageError"));
}

function persist() {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    storageAvailable = false;
  }
}

function say(reply) {
  lastReply = reply;
  showReply(reply);
  if (!state.sound) return;
  speechEngine?.cancel();
  const audioError = () => {
    byId("reply").textContent = replyText(reply) + " " + t("speechError");
  };
  if (hasOfflineVoice && lang !== "en") {
    speakOffline(lang, replyText(reply), audioError);
    return;
  }
  cancelPlayback();
  if (!speechEngine) return;
  const voices = speechEngine.getVoices();
  const preferred = voices.find(voice => voice.lang.toLowerCase().split(/[-_]/)[0] === lang);
  function speakEnglish() {
    if (lang !== "en") {
      audioError();
      return;
    }
    const fallback = new SpeechSynthesisUtterance(reply.text);
    fallback.lang = "en-IN";
    const english = voices.find(voice => /^en-IN$/i.test(voice.lang))
      ?? voices.find(voice => /^en(?:-|_|$)/i.test(voice.lang));
    if (english) {
      fallback.voice = english;
      fallback.lang = english.lang;
    } else {
      fallback.lang = "en-US";
    }
    fallback.onerror = event => {
      if (event.error !== "canceled" && event.error !== "interrupted") {
        byId("reply").textContent = replyText(reply) + " " + t("speechError");
      }
    };
    speechEngine.speak(fallback);
  }
  if (!preferred) {
    speakEnglish();
    return;
  }
  const utterance = new SpeechSynthesisUtterance(replyText(reply));
  utterance.lang = preferred.lang;
  utterance.voice = preferred;
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
    name.textContent = fieldText(field, lang);
    const value = document.createElement("dd");
    value.textContent = values[field.id] === undefined ? t("pending") : `${values[field.id]} ${t("unit")}`;
    row.append(name, value);
    return row;
  });
}

function renderHistory() {
  const history = byId("history");
  history.replaceChildren();
  if (!state.saved.length) {
    const empty = document.createElement("p");
    empty.textContent = t("noHistory");
    history.append(empty);
    return;
  }
  state.saved.forEach(fitting => {
    const entry = document.createElement("details");
    const heading = document.createElement("summary");
    heading.textContent = [fitting.customer, new Date(fitting.savedAt).toLocaleString(`${lang}-IN`)].filter(Boolean).join(" · ");
    const list = document.createElement("dl");
    list.append(...makeRows(fitting.values));
    entry.append(heading, list);
    history.append(entry);
  });
}

function render() {
  document.documentElement.lang = lang;
  document.title = `Bolkar Fit · ${t("title")}`;
  document.querySelectorAll("[data-copy]").forEach(element => {
    element.textContent = t(element.dataset.copy);
  });
  document.querySelector(".language-switch").setAttribute("aria-label", t("language"));
  byId("language-label").textContent = t("language");
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  });
  input.placeholder = t("placeholder");
  const active = state.active;
  byId("customer").textContent = active?.customer || t("customer");
  const values = active?.values ?? {};
  const count = fields.filter(field => values[field.id] !== undefined).length;
  byId("badge").textContent = t(active?.savedAt ? "saved" : active ? "progress" : "empty");
  const total = fields.length;
  const progress = { en: `${count} of ${total} measurements`, te: `${total} కొలతల్లో ${count} నమోదు అయ్యాయి`, hi: `${total} में से ${count} नाप दर्ज` };
  byId("progress").textContent = progress[lang];
  byId("meter").setAttribute("aria-label", progress[lang]);
  byId("meter").value = count;
  byId("measurements").replaceChildren(...makeRows(values));
  input.disabled = !active || Boolean(active.savedAt);
  byId("process").disabled = input.disabled;
  const save = byId("save");
  save.hidden = input.disabled || count !== fields.length || active?.pending?.type === "replace";
  save.textContent = t(active?.pending?.type === "save" ? "confirm" : "save");
  byId("sound").disabled = !canSpeak;
  byId("sound").textContent = t(canSpeak ? (state.sound ? "soundOn" : "soundOff") : "soundNone");
  byId("sound").setAttribute("aria-pressed", String(Boolean(canSpeak && state.sound)));
  renderHistory();
}

byId("new").addEventListener("click", () => {
  if (hasOfflineVoice) primePlayback();
  if (state.active && !state.active.savedAt) {
    const okay = window.confirm(t("discard"));
    if (!okay) return;
  }
  state.active = newFitting();
  clearTimeout(autoSubmitTimer);
  input.value = "";
  persist();
  render();
  input.focus();
  say({ text: uiText("start", "en"), speech: uiText("start", "te"), hindi: uiText("start", "hi") });
});

byId("sound").addEventListener("click", () => {
  state.sound = !state.sound;
  if (state.sound && hasOfflineVoice) primePlayback();
  if (!state.sound) {
    speechEngine?.cancel();
    cancelPlayback();
  }
  persist();
  render();
  if (state.sound && lastReply) say(lastReply);
});

byId("replay").addEventListener("click", () => {
  if (hasOfflineVoice) primePlayback();
  state.sound = true;
  persist();
  render();
  if (lastReply) say(lastReply);
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

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => {
    lang = button.dataset.lang;
    state.lang = lang;
    speechEngine?.cancel();
    cancelPlayback();
    if (hasOfflineVoice) primePlayback();
    persist();
    render();
    showReply(lastReply);
  });
});

lastReply = state.active?.pending?.reply;
render();
showReply(lastReply);
