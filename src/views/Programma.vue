<script setup>
import { ref } from 'vue'
import { useMotion } from '../composables/useMotion.js'
import PageHead from '../components/PageHead.vue'

const root = ref(null)
useMotion(root)

const pipeline = [
  ['Estrai', 'Uno script legge i file del gioco e scrive ogni stringa con un identificatore stabile e il contesto (mappa, evento, personaggio).'],
  ['Converti', 'Le stringhe diventano un file PO o XLIFF, così puoi usare qualunque CAT o piattaforma.'],
  ['Traduci', 'In OmegaT o Weblate, con glossario e memoria. Qui puoi inserire una bozza AI, sempre da rivedere.'],
  ['Controlla', 'Uno script verifica codici, variabili, lunghezze, glifi mancanti e stringhe non tradotte.'],
  ['Reinserisci', 'Lo stesso script di estrazione, al contrario, rimette il testo nei file originali.'],
  ['Impacchetta', 'Crea la patch (xdelta, pak di mod, cartella da copiare) e il README con la versione del gioco.'],
]

const extract = `# estrai.py · RPG Maker MV: dalle mappe a un file .pot
import json, pathlib, polib

DATA = pathlib.Path("www/data")
pot = polib.POFile()
pot.metadata = {"Content-Type": "text/plain; charset=utf-8"}

for f in sorted(DATA.glob("Map[0-9]*.json")):
    mappa = json.loads(f.read_text(encoding="utf-8"))
    for ev in filter(None, mappa["events"]):
        for p, page in enumerate(ev["pages"]):
            for i, cmd in enumerate(page["list"]):
                if cmd["code"] == 401:  # una riga di messaggio
                    pot.append(polib.POEntry(
                        msgctxt=f"{f.stem}/ev{ev['id']}/p{p}/c{i}",
                        msgid=cmd["parameters"][0],
                    ))

pot.save("mappe.pot")`

const check = `# controlla.py · codici intatti e righe non troppo lunghe
import re, polib

CODICI = re.compile(r"\\\\[A-Za-z]\\[\\d+\\]|\\\\[!|.<>^]")
MAX = 55  # da tarare sul box del tuo gioco

for e in polib.pofile("it.po"):
    if not e.msgstr:
        print("da tradurre:", e.msgctxt)
        continue
    if sorted(CODICI.findall(e.msgid)) != sorted(CODICI.findall(e.msgstr)):
        print("codici diversi:", e.msgctxt)
    visibile = CODICI.sub("", e.msgstr)
    if len(visibile) > MAX:
        print(f"troppo lunga ({len(visibile)}):", e.msgctxt)`
</script>

<template>
  <div ref="root">
    <PageHead
      :lines="['Un programma', 'tutto tuo?']"
      field="f4"
      :pic="{ src: 'famicom-devil-world-cartridge-5158740395.webp', w: 1600, h: 1142, alt: 'Cartuccia Famicom di Devil World con il titolo in katakana e in inglese' }"
      lead="La risposta breve: non un’applicazione generica, non all’inizio. Sì a piccoli script per il gioco che stai traducendo. Ecco perché e come."
    />

    <section class="verdict field f5 chapter" data-sec>
      <div class="grid">
        <div class="v-col">
          <h2 class="head" data-r>Quando no</h2>
          <ul class="v-list">
            <li data-row>Il motore ha già strumenti maturi: Ren’Py, RPG Maker, Unity, Unreal, Godot, GameMaker.</li>
            <li data-row>Ti serve solo giocare in un’altra lingua: Translumo e LunaTranslator lo fanno già.</li>
            <li data-row>Stai imparando: il tempo speso a scrivere un’interfaccia è tempo tolto alla traduzione.</li>
          </ul>
        </div>
        <div class="v-col">
          <h2 class="head" data-r>Quando sì</h2>
          <ul class="v-list">
            <li data-row>Il gioco riceve aggiornamenti e vuoi rifare estrazione e reinserimento con un comando.</li>
            <li data-row>Il formato è proprietario e nessuno l’ha ancora aperto: dopo ImHex serve un tuo estrattore.</li>
            <li data-row>Traduci molti giochi dello stesso motore o con lo stesso gruppo: una pipeline condivisa ripaga.</li>
            <li data-row>Vuoi una bozza AI con il tuo glossario e il contesto di ogni scena, non un traduttore generico.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="pipe field f1 chapter" data-sec>
      <h2 class="head" data-r>La pipeline che conviene</h2>
      <p class="pipe-p" data-r>Sei passaggi, ognuno un piccolo script o un programma che esiste già. Tieni tutto in un repository Git: ogni aggiornamento del gioco diventa un diff da guardare.</p>
      <ol class="pipe-list">
        <li v-for="p in pipeline" :key="p[0]" data-row>
          <h3>{{ p[0] }}</h3>
          <p>{{ p[1] }}</p>
        </li>
      </ol>
    </section>

    <section class="code-sec field dark chapter" data-sec>
      <div class="grid">
        <div class="c-copy">
          <h2 class="head" data-r>Il primo script</h2>
          <p data-r>Python, polib (pip install polib) e un gioco RPG Maker MV. Il primo script estrae i dialoghi delle mappe con un identificatore unico per ogni riga. Il secondo controlla la tua traduzione prima di reinserirla.</p>
          <p class="small" data-r>Per reinserire: rileggi i JSON, cerca ogni msgctxt nel file it.po e sostituisci il testo. Salva con ensure_ascii=False per tenere le accentate leggibili.</p>
          <p class="small" data-r>Stack consigliato: Python, polib, translate-toolkit, UnityPy per Unity, Git, OmegaT o Weblate.</p>
        </div>
        <div class="c-code">
          <pre class="code" data-r><code>{{ extract }}</code></pre>
          <pre class="code" data-r><code>{{ check }}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.v-col { grid-column: span 6; display: grid; gap: 28px; align-content: start; }
.v-list { list-style: none; display: grid; gap: 18px; font-size: var(--step-lead); line-height: 1.3; }
.v-list li { padding-left: 1.1em; position: relative; }
.v-list li::before { content: ''; position: absolute; left: 0; top: 0.42em; width: 0.5em; height: 0.5em; background: var(--accent); }
.pipe-p { margin-top: 20px; }
.pipe-list { margin-top: 64px; padding-left: 0; list-style-position: inside; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px var(--gutter); }
.pipe-list li::marker { font-weight: 800; font-size: 1.6rem; color: var(--accent); }
.pipe-list h3 { display: inline; font-size: clamp(1.6rem, 1rem + 1.8vw, 2.75rem); letter-spacing: -0.045em; }
.pipe-list p { margin-top: 10px; }
.c-copy { grid-column: 1 / 5; display: grid; gap: 18px; align-content: start; }
.c-code { grid-column: 6 / 13; display: grid; gap: 16px; min-width: 0; }
.c-code .code { background: var(--dark-step); }
@media (max-width: 800px) {
  .v-col + .v-col { margin-top: 56px; }
  .pipe-list { grid-template-columns: 1fr; gap: 32px; margin-top: 40px; }
  .c-code { margin-top: 32px; }
}
</style>
