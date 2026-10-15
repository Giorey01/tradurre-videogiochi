<script setup>
import { ref, computed } from 'vue'
import { useMotion } from '../composables/useMotion.js'
import PageHead from '../components/PageHead.vue'
import { engines, engineById, clues } from '../data/engines.js'

const root = ref(null)
useMotion(root)

// Riconoscitore: spunta i file che vedi, il motore con più indizi vince.
const picked = ref([])
const guess = computed(() => {
  if (!picked.value.length) return null
  const score = {}
  picked.value.forEach((id) => {
    const c = clues.find((x) => x.id === id)
    score[c.engine] = (score[c.engine] || 0) + 1
  })
  const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0][0]
  const notes = picked.value.map((id) => clues.find((x) => x.id === id)).filter((c) => c.engine === best && c.note).map((c) => c.note)
  return { engine: engineById[best], notes, mixed: Object.keys(score).length > 1 }
})
</script>

<template>
  <div ref="root">
    <PageHead
      :lines="['Trova il testo', 'nel tuo motore']"
      field="f4"
      :pic="{ src: 'nes-famicom-pal-ntsc-european-american-japanese.webp', w: 1417, h: 1600, alt: 'Un Famicom giapponese sopra un NES americano e uno europeo: lo stesso hardware in tre regioni' }"
      lead="Il motore decide dove sta il testo, in che formato e con quali strumenti lo tiri fuori. Aprire la cartella del gioco di solito basta a capirlo."
    />

    <section class="finder field dark chapter" data-sec>
      <div class="grid">
        <div class="f-copy">
          <h2 class="head" data-r>Cosa vedi nella cartella?</h2>
          <p data-r>Apri la cartella di installazione (su Steam: tasto destro sul gioco, Gestisci, Sfoglia file locali) e spunta quello che trovi.</p>
        </div>
        <div class="f-tool" data-r>
          <div class="clues">
            <label v-for="c in clues" :key="c.id" class="clue" :class="{ on: picked.includes(c.id) }">
              <input :id="'clue-' + c.id" v-model="picked" type="checkbox" :value="c.id" />
              <span>{{ c.label }}</span>
            </label>
          </div>
          <div class="answer" aria-live="polite">
            <template v-if="guess">
              <p class="lead">Probabilmente è <strong>{{ guess.engine.name }}</strong>.</p>
              <p v-for="n in guess.notes" :key="n">{{ n }}</p>
              <p v-if="guess.mixed" class="small">Hai spuntato indizi di motori diversi: alcuni giochi includono file di altri programmi, quindi fidati dell’indizio più specifico.</p>
              <RouterLink :to="`/motori/${guess.engine.id}`" class="button">Guida a {{ guess.engine.name }} <span class="tri" aria-hidden="true"></span></RouterLink>
            </template>
            <p v-else class="muted">Spunta almeno un file per vedere il motore probabile.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="list field f3" data-sec>
      <ul class="poster">
        <li v-for="e in engines" :key="e.id" data-row>
          <RouterLink :to="`/motori/${e.id}`" class="p-row">
            <span class="p-name">{{ e.short || e.name }}</span>
            <span class="p-fact">{{ e.level }}</span>
          </RouterLink>
          <p class="p-clue">{{ e.clue }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.f-copy { grid-column: 1 / 6; display: grid; gap: 20px; align-content: start; }
.f-tool { grid-column: 7 / 13; display: grid; gap: 32px; }
.clues { display: flex; flex-wrap: wrap; gap: 8px; }
.clue {
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
  background: var(--dark-step); padding: 0.6em 0.9em; font-weight: 600;
  transition: background-color var(--t-hover) ease, color var(--t-hover) ease, transform var(--t-press) var(--ease-out);
}
.clue:active { transform: scale(0.97); }
.clue input { width: 16px; height: 16px; accent-color: var(--f5); }
.clue.on { background: var(--f5); color: var(--ink); }
.answer { display: grid; gap: 14px; justify-items: start; min-height: 140px; }
.list { padding-block: 96px; }
.poster { list-style: none; display: grid; gap: 22px; }
.p-row { display: flex; justify-content: space-between; align-items: baseline; gap: 24px; text-decoration: none; transition: color var(--t-hover) ease; }
.p-name { font-size: clamp(2.6rem, 0.4rem + 7.6vw, 7.6rem); font-weight: 800; letter-spacing: -0.055em; line-height: 0.95; text-transform: lowercase; }
.p-fact { font-weight: 600; font-size: 1.15rem; white-space: nowrap; }
.p-clue { max-width: 70ch; margin-top: 6px; }
@media (hover: hover) and (pointer: fine) { .p-row:hover { color: var(--accent); } }
@media (max-width: 800px) {
  .f-tool { margin-top: 28px; }
  .list { padding-block: 56px; }
  .p-row { flex-direction: column; gap: 4px; }
  .p-name { font-size: 12vw; }
}
</style>
