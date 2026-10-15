<script setup>
import { ref, computed, watch } from 'vue'

// Banco di prova: scrivi la tua traduzione e la vedi nel box del gioco.
// Controlla codici e variabili, righe, glifi del font e qualche regola tipografica italiana.
const samples = [
  {
    id: 'rpgm',
    engine: 'RPG Maker MV',
    note: 'Box messaggi: 3 righe da 36 caratteri. \\N[1] è il nome dell’eroe, \\V[3] una variabile, \\C[n] cambia colore.',
    src: '\\C[2]\\N[1]\\C[0], you finally woke up! The village needs \\V[3] potions before nightfall.',
    ref: '\\C[2]\\N[1]\\C[0], finalmente ti sei svegliato! Al villaggio servono \\V[3] pozioni prima del tramonto.',
    cols: 36,
    rows: 3,
    token: /\\[A-Za-z]\[\d+\]|\\[!|.<>^]/g,
    vars: { '\\N[1]': 'Harold', '\\V[3]': '12' },
  },
  {
    id: 'unity',
    engine: 'Unity · TextMeshPro',
    note: 'Suggerimento a schermo: 2 righe da 30 caratteri. {0} diventa il tasto, i tag <color> colorano.',
    src: 'Press <color=#0f5257>{0}</color> to open the chest.',
    ref: 'Premi <color=#0f5257>{0}</color> per aprire il forziere.',
    cols: 30,
    rows: 2,
    token: /<\/?[a-z]+(=[^>]+)?>|\{\d+\}/g,
    vars: { '{0}': 'E' },
  },
  {
    id: 'renpy',
    engine: 'Ren’Py',
    note: 'Nota il genere: il giocatore può chiamarsi Anna o Marco. [player_name] è la variabile, {i} il corsivo.',
    src: '[player_name] has joined the party. {i}Finally.{/i}',
    ref: 'Anche [player_name] fa parte del gruppo. {i}Finalmente.{/i}',
    cols: 34,
    rows: 2,
    token: /\[[a-z_]+\]|\{\/?[a-z]+\}/g,
    vars: { '[player_name]': 'Anna' },
  },
  {
    id: 'button',
    engine: 'Bottone di menu',
    note: 'Un solo bottone: 1 riga da 13 caratteri. Qui si impara a tradurre corto.',
    src: 'Save and Quit',
    ref: 'Salva ed esci',
    cols: 13,
    rows: 1,
    token: /$^/g,
    vars: {},
  },
]

const sel = ref('rpgm')
const s = computed(() => samples.find((x) => x.id === sel.value))
const text = ref('')
const fontFull = ref(true)
// un font "da gioco" tipico: niente È maiuscola accentata, niente apostrofo tipografico, niente …
const missingGlyphs = ['È', 'É', '’', '…', '«', '»']

watch(sel, () => (text.value = ''), { immediate: true })

const tokensOf = (str, re) => (str.match(new RegExp(re.source, 'g')) || []).slice().sort()

const checks = computed(() => {
  const out = []
  const t = text.value
  if (!t.trim()) return out
  const a = tokensOf(s.value.src, s.value.token)
  const b = tokensOf(t, s.value.token)
  const missing = a.filter((x) => { const i = b.indexOf(x); if (i === -1) return true; b.splice(i, 1); return false })
  if (missing.length) out.push({ bad: true, msg: `Mancano codici o variabili: ${[...new Set(missing)].join('  ')}` })
  if (b.length) out.push({ bad: true, msg: `Codici in più o scritti male: ${[...new Set(b)].join('  ')}` })
  if (!missing.length && !b.length && a.length) out.push({ bad: false, msg: 'Codici e variabili intatti.' })
  if (laid.value.over) out.push({ bad: true, msg: `Non ci sta: servono ${laid.value.lines.length} righe, il box ne ha ${s.value.rows}.` })
  else out.push({ bad: false, msg: `Ci sta: ${laid.value.lines.length} di ${s.value.rows} righe.` })
  if (/\bE'|\bE’/.test(t)) out.push({ bad: true, msg: 'Scrivi È, non E’ (se il font ce l’ha).' })
  if (/\.\.\./.test(t)) out.push({ bad: false, msg: 'Tre punti: valuta il carattere … se il font lo supporta.' })
  if (/\b(perchè|poichè|nè|sè|affinchè)\b/i.test(t)) out.push({ bad: true, msg: 'Accento: perché, poiché, né, sé, affinché vogliono l’acuto.' })
  if (!fontFull.value) {
    const miss = missingGlyphs.filter((g) => t.includes(g))
    if (miss.length) out.push({ bad: true, msg: `Il font del gioco non ha: ${miss.join(' ')}. Li vedrai come quadratini.` })
  }
  if (t.trim() === s.value.src.trim()) out.push({ bad: true, msg: 'È ancora il testo originale.' })
  return out
})

// Sostituisce variabili e colori, poi va a capo per parole come farebbe il motore.
const laid = computed(() => {
  const src = text.value.trim() ? text.value : s.value.src
  const segs = []
  let color = null
  let italic = false
  const re = new RegExp(s.value.token.source, 'g')
  let last = 0
  let m
  const push = (str, extra = {}) => { if (str) segs.push({ str, color, italic, ...extra }) }
  while ((m = re.exec(src))) {
    push(src.slice(last, m.index))
    const tok = m[0]
    if (s.value.vars[tok] !== undefined) push(s.value.vars[tok], { v: true })
    else if (/^\\C\[(\d+)\]$/.test(tok)) color = tok === '\\C[0]' ? null : 'c' + tok.match(/\d+/)[0]
    else if (/^<color=/.test(tok)) color = 'c2'
    else if (tok === '</color>') color = null
    else if (tok === '{i}') italic = true
    else if (tok === '{/i}') italic = false
    last = m.index + tok.length
    if (tok.length === 0) re.lastIndex++
  }
  push(src.slice(last))

  // a capo per parole sul testo visibile
  const chars = []
  segs.forEach((g) => [...g.str].forEach((ch) => chars.push({ ch, color: g.color, italic: g.italic, v: g.v })))
  const lines = [[]]
  let lineLen = 0
  let i = 0
  while (i < chars.length) {
    let j = i
    while (j < chars.length && chars[j].ch !== ' ') j++
    const word = chars.slice(i, j)
    if (lineLen > 0 && lineLen + 1 + word.length > s.value.cols) { lines.push([]); lineLen = 0 }
    else if (lineLen > 0) { lines[lines.length - 1].push({ ch: ' ' }); lineLen++ }
    lines[lines.length - 1].push(...word)
    lineLen += word.length
    i = j + 1
  }
  return { lines, over: lines.length > s.value.rows }
})

const glyphMissing = (ch) => !fontFull.value && missingGlyphs.includes(ch)
const useRef = () => (text.value = s.value.ref)
</script>

<template>
  <div class="tester">
    <div class="pick" role="tablist" aria-label="Scegli una stringa">
      <button
        v-for="x in samples"
        :key="x.id"
        type="button"
        role="tab"
        class="chip"
        :class="{ on: sel === x.id }"
        :aria-selected="sel === x.id"
        @click="sel = x.id"
      >{{ x.engine }}</button>
    </div>

    <p class="small note">{{ s.note }}</p>

    <div class="src">
      <span class="small label">Originale</span>
      <p class="orig" lang="en">{{ s.src }}</p>
    </div>

    <label class="small label" for="tester-input">La tua traduzione</label>
    <textarea
      id="tester-input"
      v-model="text"
      rows="3"
      spellcheck="true"
      lang="it"
      :placeholder="'Scrivi qui in italiano, mantenendo i codici…'"
    ></textarea>
    <div class="actions">
      <button type="button" class="link plain" @click="useRef">Mostra una soluzione</button>
      <label class="toggle">
        <input id="tester-font" v-model="fontFull" type="checkbox" />
        Font completo (togli la spunta per un font da gioco senza È, ’ e …)
      </label>
    </div>

    <div class="screen" data-ui>
      <div class="box" :class="{ over: laid.over, one: s.rows === 1 }" :style="{ '--cols': s.cols, '--rows': s.rows }">
        <div
          v-for="(line, li) in laid.lines"
          :key="li"
          class="ln"
          :class="{ spill: li >= s.rows }"
        ><span
          v-for="(c, ci) in line"
          :key="ci"
          :class="[c.color, { it: c.italic, v: c.v, miss: glyphMissing(c.ch) }]"
        >{{ glyphMissing(c.ch) ? '□' : c.ch }}</span></div>
        <span v-if="!laid.over && s.rows > 1" class="next"></span>
      </div>
    </div>

    <ul class="checks" aria-live="polite">
      <li v-if="!text.trim()" class="small">Il box mostra l’originale. Scrivi la tua versione per vedere i controlli.</li>
      <li v-for="c in checks" :key="c.msg" :class="{ bad: c.bad }">{{ c.msg }}</li>
    </ul>
  </div>
</template>

<style scoped>
.tester { display: grid; gap: 14px; min-width: 0; }
.pick { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  border: 0;
  background: var(--step);
  padding: 0.55em 0.9em;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--t-hover) ease, transform var(--t-press) var(--ease-out);
}
.chip:active { transform: scale(0.97); }
.chip.on { background: var(--ink); color: var(--paper); }
.note { max-width: 60ch; }
.label { font-weight: 600; display: block; margin-bottom: 4px; }
.orig { font-size: var(--step-lead); line-height: 1.3; overflow-wrap: anywhere; }
textarea {
  width: 100%;
  font: inherit;
  font-size: var(--step-body);
  background: var(--step);
  color: var(--ink);
  border: 0;
  padding: 14px 16px;
  resize: vertical;
}
textarea:focus-visible { outline: 3px solid var(--accent); outline-offset: 0; background: var(--paper); }
.actions { display: flex; flex-wrap: wrap; gap: 10px 24px; align-items: center; font-size: 0.95rem; }
.plain { background: none; border: 0; padding: 0; cursor: pointer; font-weight: 600; }
.toggle { display: inline-flex; gap: 8px; align-items: center; cursor: pointer; }
.toggle input { width: 18px; height: 18px; accent-color: var(--accent); }

.screen { background: #1d2a3a; padding: clamp(14px, 3vw, 28px); overflow-x: auto; }
.box {
  position: relative;
  font-family: var(--font);
  font-weight: 600;
  font-size: clamp(0.8rem, 0.55rem + 0.9vw, 1.05rem);
  line-height: 1.6;
  color: #f4f1e6;
  background: #0d1622;
  border: 3px solid #f4f1e6;
  padding: 0.8em 1em;
  width: calc(var(--cols) * 1.02ch + 2em + 6px);
  max-width: none;
  min-height: calc(var(--rows) * 1.6em + 1.6em + 6px);
  white-space: pre;
}
.box.one { text-align: center; }
.box.over { border-color: #ff8a80; }
.ln { min-height: 1.6em; }
.ln.spill { color: #ff8a80; text-decoration: line-through; opacity: 0.85; }
.c1 { color: #ff9d9d; }
.c2 { color: #9fe3e6; }
.c3 { color: #c8f59d; }
.c4 { color: #9fc0ff; }
.c5 { color: #f7d38b; }
.c6 { color: #f7f09b; }
.it { font-style: italic; }
.v { background: #34506e; }
.miss { color: #ffcf6e; }
.next {
  position: absolute;
  right: 1em;
  bottom: 0.5em;
  border-left: 0.45em solid transparent;
  border-right: 0.45em solid transparent;
  border-top: 0.55em solid #f4f1e6;
  animation: bob 0.9s var(--ease-in-out) infinite alternate;
}
@keyframes bob { to { transform: translateY(4px); } }

.checks { list-style: none; display: grid; gap: 6px; }
.checks li { padding-left: 1.4em; position: relative; font-weight: 600; }
.checks li::before { content: ''; position: absolute; left: 0; top: 0.45em; width: 0.7em; height: 0.7em; background: var(--accent); }
.checks li.bad::before { background: #b3261e; }
.checks li.small { font-weight: 400; padding-left: 0; }
.checks li.small::before { display: none; }
</style>
