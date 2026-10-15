<script setup>
import { ref } from 'vue'
import { useMotion } from '../composables/useMotion.js'
import PageHead from '../components/PageHead.vue'
import { craft } from '../data/content.js'

const root = ref(null)
useMotion(root)
const img = (f) => `${import.meta.env.BASE_URL}img/${f}`

const examples = [
  { src: 'You found a {item}!', bad: 'Hai trovato un {item}!', good: 'Ottenuto: {item}!', why: 'L’articolo cambia con l’oggetto (una spada, un arco, delle frecce). La forma neutra funziona sempre.' },
  { src: 'Open', bad: 'Aperto', good: 'Apri', why: 'Era un bottone, quindi un verbo. Senza contesto non lo sai: chiedi o guarda il gioco.' },
  { src: 'Save and Quit', bad: 'Salva la partita ed esci dal gioco', good: 'Salva ed esci', why: 'Il bottone ha spazio per 13 caratteri. Corto e chiaro batte completo.' },
  { src: '%d enemies remaining', bad: '%d nemici rimasti', good: 'Nemici rimasti: %d', why: 'Con 1 nemico la prima diventa “1 nemici”. Se il motore non gestisce i plurali, sposta il numero.' },
  { src: 'Nice one, mate!', bad: 'Bello, compagno!', good: 'Ottimo lavoro, socio!', why: 'Il registro conta più delle parole. Pensa a come lo direbbe il personaggio in italiano.' },
  { src: 'HP', bad: 'HP / PV / PS mescolati', good: 'PS ovunque', why: 'Qualunque scelta va bene, purché sia una sola: decidila nel glossario.' },
]

const style = [
  ['Allocuzione', 'Il gioco dà del tu al giocatore. I personaggi tra loro come la scena richiede.'],
  ['Maiuscole', 'Nomi propri di oggetti unici sì (la Spada del Re), oggetti comuni no (pozione).'],
  ['Punteggiatura', 'Apostrofo tipografico ’, puntini …, virgolette « » nei dialoghi riportati, se il font le ha.'],
  ['Numeri', 'Separatore delle migliaia con il punto (1.000), decimali con la virgola (2,5).'],
  ['Comandi', 'Imperativo breve: Salva, Carica, Esci. Mai infinito nei bottoni.'],
  ['Nomi', 'I nomi parlanti si adattano, quelli propri di persona di solito no. Decidi caso per caso e annotalo.'],
]
</script>

<template>
  <div ref="root">
    <PageHead
      :lines="['L’arte della', 'traduzione']"
      field="f2"
      :pic="{ src: 'olivetti-dora-poster.webp', w: 1280, h: 720, alt: 'Una macchina da scrivere Olivetti Dora con un foglio inserito' }"
      lead="Gli strumenti aprono il gioco. Il resto è scrittura: contesto, coerenza, spazio e tono. Queste sono le regole che separano una patch che si legge da una che si sopporta."
    />

    <section class="story field f1 chapter" data-sec>
      <div class="grid">
        <div class="st-title">
          <h2 class="head" data-r>Otto regole</h2>
          <figure class="keys" data-shutter>
            <img :src="img('vintage-typewriter-keys.webp')" width="1024" height="683" alt="Tasti di una vecchia macchina da scrivere" loading="lazy" />
          </figure>
        </div>
        <ol class="st-list">
          <li v-for="c in craft" :key="c.title" data-row>
            <h3>{{ c.title }}</h3>
            <p>{{ c.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="ex field f3 chapter" data-sec>
      <h2 class="head" data-r>Prima e dopo</h2>
      <p class="ex-p" data-r>Errori veri e comuni, e come si sistemano.</p>
      <div class="table-wrap" data-r>
        <table>
          <thead>
            <tr><th>Originale</th><th>Da evitare</th><th>Meglio</th><th>Perché</th></tr>
          </thead>
          <tbody>
            <tr v-for="x in examples" :key="x.src">
              <td lang="en"><code class="inline">{{ x.src }}</code></td>
              <td class="bad">{{ x.bad }}</td>
              <td class="good">{{ x.good }}</td>
              <td>{{ x.why }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="sg field dark chapter" data-sec>
      <div class="grid">
        <div class="sg-copy">
          <h2 class="head" data-r>La guida di stile</h2>
          <p data-r>Una pagina, scritta prima di cominciare. Ecco un punto di partenza da copiare e adattare.</p>
          <RouterLink to="/#prova" class="button" data-r>Prova nel box di dialogo <span class="tri" aria-hidden="true"></span></RouterLink>
        </div>
        <dl class="sg-list">
          <div v-for="s in style" :key="s[0]" data-row>
            <dt>{{ s[0] }}</dt>
            <dd>{{ s[1] }}</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>

<style scoped>
.st-title { grid-column: 1 / 5; position: sticky; top: 96px; align-self: start; display: grid; gap: 28px; }
.keys { margin: 0; aspect-ratio: 3 / 2; overflow: hidden; background: var(--f1-step); }
.keys img { width: 100%; height: 100%; object-fit: cover; }
.st-list { grid-column: 6 / 13; list-style: none; display: grid; gap: 56px; }
.st-list h3 { font-size: clamp(1.6rem, 1rem + 1.6vw, 2.5rem); letter-spacing: -0.04em; line-height: 1.02; margin-bottom: 14px; }
.ex-p { margin-top: 16px; }
.table-wrap { margin-top: 48px; overflow-x: auto; }
table { border-collapse: collapse; width: 100%; min-width: 760px; font-size: 1rem; }
th { text-align: left; font-weight: 600; padding: 0 16px 12px 0; font-size: var(--step-small); }
td { padding: 18px 16px 18px 0; vertical-align: top; border-top: 2px solid var(--ink); }
td.bad { text-decoration: line-through; text-decoration-color: #b3261e; text-decoration-thickness: 2px; }
td.good { font-weight: 800; }
.sg-copy { grid-column: 1 / 6; display: grid; gap: 22px; justify-items: start; align-content: start; }
.sg-list { grid-column: 7 / 13; margin: 0; display: grid; gap: 28px; }
.sg-list dt { font-weight: 800; font-size: 1.4rem; letter-spacing: -0.03em; color: var(--f5); }
.sg-list dd { margin: 6px 0 0; }
@media (max-width: 800px) {
  .st-title { position: static; margin-bottom: 40px; }
  .st-list { gap: 40px; }
  .sg-list { margin-top: 40px; }
}
</style>
