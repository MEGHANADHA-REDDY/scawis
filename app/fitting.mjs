export const fields = [
  { id: "shoulder", label: "Shoulder", speech: "शोल्डर", aliases: ["shoulder", "kandha", "kandhe", "कंधा", "कंधे", "शोल्डर"] },
  { id: "bust", label: "Bust", speech: "बस्ट", aliases: ["bust", "chest", "seena", "chaati", "chhati", "बस्ट", "चेस्ट", "सीना", "छाती"] },
  { id: "waist", label: "Waist", speech: "कमर", aliases: ["waist", "kamar", "वेस्ट", "कमर"] },
  { id: "sleeve", label: "Sleeve length", speech: "स्लीव", aliases: ["sleeve length", "sleeve", "baazu ki lambai", "bazu ki lambai", "baju ki lambai", "baaju", "स्लीव", "बाजू की लंबाई", "बाज़ू की लंबाई", "बाजू"] },
  { id: "length", label: "Blouse length", speech: "ब्लाउज़ की लंबाई", aliases: ["blouse length", "blouse ki lambai", "ब्लाउज की लंबाई", "ब्लाउज़ की लंबाई", "ब्लाउज लेंथ", "ब्लाउज़ लेंथ"] }
];

const english = "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
const teluguFields = [
  ["భుజం", "భుజము", "భుజాల వెడల్పు", "షోల్డర్", "షోల్డరు", "షోల్డర్స్", "bhujam"],
  ["ఛాతీ", "ఛాతి", "చాతి", "చాతీ", "చెస్ట్", "బస్ట్", "chaati"],
  ["నడుము", "వెయిస్ట్", "వైస్ట్", "వేస్ట్", "nadumu"],
  ["చేతి పొడవు", "చేయి పొడవు", "స్లీవ్ పొడవు", "స్లీవ్", "sleeve podavu"],
  ["బ్లౌజ్ పొడవు", "బ్లౌజు పొడవు", "జాకెట్ పొడవు", "బ్లౌజ్ లెంగ్త్", "blouse podavu"]
];
fields.forEach((field, index) => {
  field.speech = teluguFields[index][0];
  field.aliases.push(...teluguFields[index]);
});
const teluguNumbers = "ఒకటి రెండు మూడు నాలుగు ఐదు ఆరు ఏడు ఎనిమిది తొమ్మిది పది పదకొండు పన్నెండు పదమూడు పద్నాలుగు పదిహేను పదహారు పదిహేడు పద్దెనిమిది పంతొమ్మిది ఇరవై ఇరవైఒకటి ఇరవైరెండు ఇరవైమూడు ఇరవైనాలుగు ఇరవైఐదు ఇరవైఆరు ఇరవైఏడు ఇరవైఎనిమిది ఇరవైతొమ్మిది ముప్పై ముప్పైఒకటి ముప్పైరెండు ముప్పైమూడు ముప్పైనాలుగు ముప్పైఐదు ముప్పైఆరు ముప్పైఏడు ముప్పైఎనిమిది ముప్పైతొమ్మిది నలభై నలభైఒకటి నలభైరెండు నలభైమూడు నలభైనాలుగు నలభైఐదు నలభైఆరు నలభైఏడు నలభైఎనిమిది నలభైతొమ్మిది యాభై".split(" ");
const hindi = [
  ["ek", "एक"], ["do", "दो"], ["teen", "tin", "तीन"], ["char", "chaar", "चार"],
  ["paanch", "panch", "पांच", "पाँच"], ["chhe", "chhah", "छह", "छः"],
  ["saat", "सात"], ["aath", "आठ"], ["nau", "nav", "नौ"], ["das", "dus", "दस"],
  ["gyarah", "gyaarah", "ग्यारह"], ["barah", "baarah", "बारह"],
  ["terah", "तेरह"], ["chaudah", "choudah", "चौदह"],
  ["pandrah", "पंद्रह", "पन्द्रह"], ["solah", "सोलह"], ["satrah", "सत्रह"],
  ["atharah", "अठारह"], ["unnees", "unnis", "उन्नीस"], ["bees", "बीस"],
  ["ikkees", "इक्कीस"], ["baais", "बाईस"], ["teis", "तेईस"],
  ["chaubees", "चौबीस"], ["pachis", "pachees", "पच्चीस"], ["chhabbees", "छब्बीस"],
  ["sattais", "सत्ताईस"], ["atthais", "अट्ठाईस"], ["untees", "उनतीस"],
  ["tees", "तीस"], ["ikattis", "इकतीस"], ["battees", "बत्तीस"],
  ["taintees", "तैंतीस"], ["chauntees", "चौंतीस"], ["paintees", "पैंतीस"],
  ["chhattees", "chhattis", "छत्तीस"], ["saintees", "सैंतीस"], ["adtees", "अड़तीस"],
  ["untalees", "उनतालीस"], ["chalees", "chalis", "चालीस"],
  ["iktalees", "इकतालीस"], ["bayalees", "बयालीस"], ["taintalees", "तैंतालीस"],
  ["chawalees", "चवालीस"], ["paintalees", "पैंतालीस"], ["chhiyalees", "छियालीस"],
  ["saintalees", "सैंतालीस"], ["adtalees", "अड़तालीस"], ["unchaas", "उनचास"],
  ["pachaas", "pachas", "पचास"]
];
const numbers = new Map();
teluguNumbers.forEach((word, index) => numbers.set(word, index + 1));
for (const [word, value] of [
  ["పధ్నాలుగు", 14], ["పదనాలుగు", 14], ["పద్దెనిమిది", 18], ["తొమ్మిదిన్నర", 9.5],
  ["పద్నాలుగున్నర", 14.5], ["పధ్నాలుగున్నర", 14.5], ["పదిన్నర", 10.5],
  ["పదైదు", 15], ["పదియైదు", 15], ["పదారు", 16], ["ముప్పయి", 30],
  ["ముప్పయారు", 36], ["ముప్పయ్యారు", 36],
  ["తొమ్మిదీ", 9], ["పద్నాలుగూ", 14], ["పద్నాలుగునర", 14.5]
]) numbers.set(word, value);
english.forEach((word, index) => numbers.set(word, index + 1));
hindi.forEach((words, index) => words.forEach(word => numbers.set(word, index + 1)));
const tens = new Map([["twenty", 20], ["thirty", 30], ["forty", 40], ["fifty", 50], ["sixty", 60]]);
for (const [word, number] of tens) numbers.set(word, number);
const fractions = new Map([
  ["saade", .5], ["sadhe", .5], ["साढ़े", .5], ["साढ़े", .5],
  ["sawa", .25], ["sava", .25], ["सवा", .25],
  ["paune", -.25], ["पौने", -.25]
]);
const halves = new Set(["half", "aadha", "adha", "आधा"]);
const joins = new Set(["and", "aur", "और", "a"]);
for (const word of ["అర", "అరఁ", "సగం", "న్నర"]) halves.add(word);
joins.add("మరియు");
const otherUnits = new Set(["cm", "centimeter", "centimeters", "centimetre", "centimetres", "सेंटीमीटर", "सेमी", "mm", "मीटर", "meter", "metre"]);
const yes = new Set(["haan", "ha", "han", "हां", "हाँ", "yes", "ji haan", "जी हाँ", "जी हां", "haan ji", "han ji", "हाँ जी", "हां जी", "haan save kar do", "हाँ सेव कर दो", "yes save it"]);
const no = new Set(["nahi", "nahin", "nai", "नहीं", "नही", "no", "cancel", "रद्द"]);
const finish = new Set(["ho gaya", "hogaya", "हो गया", "done", "finish", "save", "सेव", "save fitting", "save kar do", "सेव कर दो", "ho gaya save kar do", "हो गया सेव कर दो"]);
const saveConfirmation = /^(?:save|సేవ్|సేవు)\s+(?:chey+u*|cheyyandi|చెయ్|చేయ్|చెయ్యి|చేయి|చేయు|చెయ్యు|చేయండి|చెయ్యండి)$/iu;
const finishAtEnd = /(?:^|[\s,;])(?:అయిపోయింది|పూర్తయింది|పూర్తి అయింది|ayipoyindi)[.!?\s]*$/iu;
for (const word of ["అవును", "సరే", "సేవ్ చేయండి", "avunu", "sare"]) yes.add(word);
for (const word of ["కాదు", "వద్దు", "kaadu", "vaddu"]) no.add(word);
for (const word of ["అయిపోయింది", "పూర్తయింది", "పూర్తి అయింది", "సేవ్", "సేవ్ చేయండి", "ayipoyindi"]) finish.add(word);
for (const word of ["సెం", "సెమీ", "సెంటీమీటర్", "సెంటీమీటర్లు", "మిల్లీమీటర్లు"]) otherUnits.add(word);

function normalize(text) {
  return text.normalize("NFC").toLowerCase()
    .replace(/([\p{L}\p{M}])(?:అంగుళాలు|ఇంచులు)(?=$|[^\p{L}\p{M}])/gu, "$1 ")
    .replace(/[౦-౯]/gu, char => String(char.codePointAt(0) - 0xC66))
    .replace(/[०-९]/gu, char => String(char.codePointAt(0) - 0x966))
    .replace(/([\p{L}\p{M}])-(?=[\p{L}\p{M}])/gu, "$1 ")
    .replace(/[–—]/gu, " ");
}

function tokenize(text) {
  return normalize(text).match(/-?\d+(?:\.\d+)?|[\p{L}\p{M}]+/gu) ?? [];
}

const aliases = fields.flatMap(field =>
  field.aliases.map(alias => ({ field, words: tokenize(alias) }))
).sort((a, b) => b.words.length - a.words.length);

function readWhole(words, index) {
  const word = words[index];
  if (word === undefined) return null;
  if (/^-?\d/u.test(word)) return { value: Number(word), end: index + 1 };
  if (!numbers.has(word)) return null;
  const base = numbers.get(word);
  const ones = english.indexOf(words[index + 1]) + 1;
  const teluguOnes = teluguNumbers.indexOf(words[index + 1]) + 1;
  const suffix = tens.has(word) ? ones : ["ఇరవై", "ముప్పై", "ముప్పయి", "నలభై", "యాభై"].includes(word) ? teluguOnes : 0;
  if (suffix > 0 && suffix < 10) {
    return { value: base + suffix, end: index + 2 };
  }
  return { value: base, end: index + 1 };
}

function readValues(words) {
  const values = [];
  if (words.some(word => otherUnits.has(word))) return { values, wrongUnit: true };
  for (let index = 0; index < words.length;) {
    const word = words[index];
    const fraction = fractions.get(word);
    const whole = readWhole(words, index + Number(fraction !== undefined));
    if (!whole) {
      index += 1;
      continue;
    }
    // In “kar do”, do is part of the verb, not the Hindi number two.
    if (word === "do" && words[index - 1] === "kar") {
      index += 1;
      continue;
    }
    let value = whole.value + (fraction ?? 0);
    index = whole.end;
    if (fraction === undefined) {
      let suffix = index;
      while (joins.has(words[suffix])) suffix += 1;
      if (halves.has(words[suffix])) {
        value += .5;
        index = suffix + 1;
      }
    }
    values.push(value);
  }
  return { values: [...new Set(values)], wrongUnit: false };
}

function splitMeasurements(words) {
  const chunks = [];
  let leadEnd = words.length;
  for (let index = 0; index < words.length;) {
    const match = aliases.find(entry =>
      entry.words.every((word, offset) => words[index + offset] === word)
    );
    if (!match) {
      index += 1;
      continue;
    }
    if (chunks.length) {
      chunks.at(-1).words = words.slice(chunks.at(-1).start, index);
    } else {
      leadEnd = index;
    }
    index += match.words.length;
    chunks.push({ field: match.field, start: index, words: [] });
  }
  if (chunks.length) chunks.at(-1).words = words.slice(chunks.at(-1).start);
  return { chunks, lead: words.slice(0, leadEnd) };
}

function fieldById(id) {
  return fields.find(field => field.id === id);
}

const askValue = field => `${field.speech} ఎన్ని అంగుళాలు?`;

export function newFitting() {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
    customer: "",
    values: {},
    pending: null,
    savedAt: null
  };
}

function note(text, speech = text) {
  return { text, speech };
}

function requestNext(fitting) {
  const missing = fields.filter(field => fitting.values[field.id] === undefined);
  if (missing.length) {
    return note(
      `Still needed: ${missing.map(field => field.label).join(", ")}.`,
      `ఇంకా చెప్పాల్సిన కొలతలు: ${missing.map(field => field.speech).join(", ")}.`
    );
  }
  if (!fitting.customer) {
    fitting.pending = { type: "name" };
    return note("Say the customer's name before saving.", "సేవ్ చేయడానికి కస్టమర్ పేరు చెప్పండి.");
  }
  fitting.pending = { type: "save" };
  return note(`Save all five measurements for ${fitting.customer}?`, `${fitting.customer} కొలతలు సేవ్ చేయాలా?`);
}

function askAboutValues(field, values, wrongUnit) {
  if (wrongUnit) return note(`How many inches for ${field.label.toLowerCase()}?`, askValue(field));
  if (values.length > 1) {
    return note(
      `${field.label}: which value, ${values.join(" or ")} inches?`,
      `${field.speech}: ${values.join(" లేదా ")} అంగుళాలా?`
    );
  }
  return note(`Please repeat the ${field.label.toLowerCase()} measurement in inches.`, `${field.speech} కొలత అంగుళాల్లో మళ్ళీ చెప్పండి.`);
}

function applyMeasurements(fitting, entries) {
  const lines = [];
  const spoken = [];
  const followups = [];
  for (const { field, values, wrongUnit } of entries) {
    if (values.length !== 1 || wrongUnit || values[0] <= 0 || values[0] > 100) {
      followups.push({
        type: "value",
        id: field.id,
        reply: askAboutValues(field, values, wrongUnit)
      });
      continue;
    }
    const value = values[0];
    const previous = fitting.values[field.id];
    if (previous !== undefined && previous !== value) {
      followups.push({
        type: "replace",
        id: field.id,
        value,
        reply: note(
          `Change ${field.label.toLowerCase()} from ${previous} to ${value} inches?`,
          `${field.speech} ${previous} నుంచి ${value} అంగుళాలకు మార్చాలా?`
        )
      });
      continue;
    }
    fitting.values[field.id] = value;
    lines.push(`${field.label} ${value} in.`);
    spoken.push(`${field.speech} ${value} అంగుళాలు.`);
  }
  fitting.pending = followups.shift() ?? null;
  if (fitting.pending) {
    const reply = fitting.pending.reply;
    fitting.pending.next = followups;
    lines.push(reply.text);
    spoken.push(reply.speech);
  }
  return note(lines.join(" "), spoken.join(" "));
}

function combine(reply, pending) {
  if (!pending?.reply) return reply;
  return note(`${reply.text} ${pending.reply.text}`, `${reply.speech} ${pending.reply.speech}`);
}

function continueQueue(fitting, next, reply) {
  if (fitting.pending) {
    fitting.pending.next = [...(fitting.pending.next ?? []), ...next];
    return reply;
  }
  fitting.pending = next[0] ? { ...next[0], next: next.slice(1) } : null;
  return combine(reply, fitting.pending);
}

const namePrefix = /^(?:(?:కస్టమర్|customer|kastamar)\s+)?(?:పేరు|name|peru|peeru)(?:\s*[:：,]\s*|\s+)(?:(?:is|అంటే)\s+)?/iu;
const markerPattern = "కొలత రాయండి|కొలత రాయి|note karo|kolata rayi";

function readCustomer(transcript) {
  const prefix = transcript.match(namePrefix);
  if (!prefix) return null;
  const content = transcript.slice(prefix[0].length);
  const punctuation = content.search(/[.!?。\n](?!\p{Nd})/u);
  const marker = content.search(new RegExp(markerPattern, "iu"));
  const tokens = [...content.matchAll(/[\p{L}\p{M}]+/gu)];
  const measurement = tokens.findIndex((_, index) => index > 0 && aliases.some(alias =>
    alias.words.every((word, offset) => normalize(tokens[index + offset]?.[0] ?? "") === word)
  ));
  const splitAt = Math.min(
    punctuation < 0 ? content.length : punctuation,
    marker < 0 ? content.length : marker,
    measurement < 0 ? content.length : tokens[measurement].index
  );
  return {
    name: content.slice(0, splitAt).trim().replace(/[,:;]+$/u, "").trim(),
    rest: content.slice(splitAt).replace(/^[\s,.!?。;:]+/u, "")
  };
}

export function runTurn(fitting, transcript) {
  if (!fitting || fitting.savedAt) {
    return note("Start a new fitting first.", "ముందుగా కొత్త ఫిట్టింగ్ మొదలుపెట్టండి.");
  }
  const end = transcript.match(finishAtEnd);
  const finishAfterMeasurements = Boolean(end && end.index > 0);
  if (finishAfterMeasurements) transcript = transcript.slice(0, end.index).trim();
  // Flow can hear చేతి పొడవు as ఛాతి పొడవు. Disambiguate when bust is separately named.
  if (/(?:ఛాతి|ఛాతీ|చాతి|చాతీ|బస్ట్)\s+(?!పొడవు)[\p{L}\p{Nd}]/u.test(transcript)) {
    transcript = transcript.replace(/(?:ఛాతి|ఛాతీ|చాతి|చాతీ)\s+పొడవు/gu, "చేతి పొడవు");
  }
  const words = tokenize(transcript);
  const command = words.join(" ");
  const pending = fitting.pending;
  const named = readCustomer(transcript.trim());
  if (named || (pending?.type === "name" && !finish.has(command))) {
    const name = (named?.name ?? transcript).trim().replace(/[.!?]+$/u, "");
    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]{0,59}$/u.test(name) ||
        yes.has(command) || no.has(command) || splitMeasurements(tokenize(name)).chunks.length) {
      return note("Please say just the customer's name.", "కస్టమర్ పేరు మాత్రమే చెప్పండి.");
    }
    fitting.customer = name;
    if (named?.rest) {
      if (pending?.type === "name") fitting.pending = null;
      const reply = runTurn(fitting, named.rest + (finishAfterMeasurements ? " అయిపోయింది" : ""));
      return note(`Customer: ${name}. ${reply.text}`, `కస్టమర్ పేరు ${name}. ${reply.speech}`);
    }
    if (pending?.type === "name") return requestNext(fitting);
    return note(`Customer: ${name}`, `కస్టమర్ పేరు ${name}.`);
  }
  if (pending?.type === "save") {
    if (yes.has(command) || saveConfirmation.test(command)) {
      fitting.savedAt = new Date().toISOString();
      fitting.pending = null;
      return note("Fitting saved.", "కొలతలు సేవ్ అయ్యాయి.");
    }
    if (no.has(command)) {
      fitting.pending = null;
      return note("Draft kept. Continue when ready.", "కొలతలు అలాగే ఉంచాను.");
    }
  }
  if (pending?.type === "replace") {
    if (yes.has(command)) {
      const field = fieldById(pending.id);
      fitting.values[pending.id] = pending.value;
      fitting.pending = null;
      return continueQueue(fitting, pending.next ?? [], note(
        `${field.label} updated to ${pending.value} in.`,
        `${field.speech} ఇప్పుడు ${pending.value} అంగుళాలు.`
      ));
    }
    if (no.has(command)) {
      fitting.pending = null;
      return continueQueue(fitting, pending.next ?? [], note(
        "Previous measurement kept. Say the measurement again to make a different change.",
        "పాత కొలత అలాగే ఉంచాను. మార్చాలంటే మళ్ళీ చెప్పండి."
      ));
    }
    return pending.reply;
  }
  if (finish.has(command)) return requestNext(fitting);
  const markers = new RegExp(markerPattern, "giu");
  const marked = transcript.split(markers);
  const { chunks, lead } = marked.length === 1
    ? splitMeasurements(words)
    : { chunks: marked.slice(1).flatMap(segment => {
      const firstClause = segment.split(/[!?。\n]|\.(?!\p{Nd})/u)[0];
      const parsed = splitMeasurements(tokenize(firstClause)).chunks;
      return parsed.slice(0, 1);
    }), lead: [] };
  if (chunks.length) {
    const grouped = new Map();
    for (const chunk of chunks) {
      const field = chunk.field;
      const reading = readValues(chunk.words);
      const previous = grouped.get(field.id);
      grouped.set(field.id, {
        field,
        values: [...new Set([...(previous?.values ?? []), ...reading.values])],
        wrongUnit: previous?.wrongUnit || reading.wrongUnit
      });
    }
    const queue = pending?.next ?? [];
    fitting.pending = null;
    const reply = continueQueue(fitting, queue, applyMeasurements(fitting, grouped.values()));
    if (!finishAfterMeasurements || fitting.pending) return reply;
    const next = requestNext(fitting);
    return note(`${reply.text} ${next.text}`, `${reply.speech} ${next.speech}`);
  }
  const reading = readValues(lead);
  if (pending?.type === "value" && reading.values.length) {
    fitting.pending = null;
    return continueQueue(fitting, pending.next ?? [], applyMeasurements(fitting, [
      { field: fieldById(pending.id), ...reading }
    ]));
  }
  if (reading.values.length) {
    return note("Which measurement is that? Say its name and the number.", "ఏ కొలత? కొలత పేరు, సంఖ్య చెప్పండి.");
  }
  if (pending?.type === "save") return requestNext(fitting);
  if (pending?.reply) return pending.reply;
  return note("Please repeat the measurement name and number.", "కొలత పేరు, సంఖ్య మళ్ళీ చెప్పండి.");
}
