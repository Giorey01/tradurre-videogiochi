<script setup>
import { ref } from 'vue'
import { useMotion } from '../composables/useMotion.js'
import PageHead from '../components/PageHead.vue'
import { obstacles } from '../data/content.js'

const root = ref(null)
useMotion(root)
const img = (f) => `${import.meta.env.BASE_URL}img/${f}`
</script>

<template>
  <div ref="root">
    <PageHead
      :lines="['A cosa vai', 'incontro']"
      field="f5"
      :pic="{ src: 'burgertime-arcade-video-game.webp', w: 1600, h: 900, alt: 'Cabinato da tavolo di BurgerTime in un locale' }"
      lead="Tradurre un gioco è facile finché il testo è in un file chiaro, il font ha le accentate e lo spazio basta. Ecco cosa succede quando una di queste tre cose manca."
    />

    <section class="obs field f4 chapter" data-sec>
      <ul class="o-list">
        <li v-for="o in obstacles" :key="o.title" class="o-row" data-row>
          <h2 class="o-name">{{ o.title }}</h2>
          <p>{{ o.body }}</p>
        </li>
      </ul>
    </section>

    <section class="legal field dark chapter" data-sec>
      <div class="grid">
        <div class="lg-copy">
          <h2 class="head" data-r>Come restare dalla parte giusta</h2>
          <ul class="lg-list">
            <li data-row>Chiedi il permesso allo sviluppatore. Per un indie è spesso un sì, e a volte diventa una traduzione ufficiale.</li>
            <li data-row>Pubblica solo patch o file tradotti, mai il gioco o i suoi archivi interi.</li>
            <li data-row>Non chiedere soldi per la traduzione e non metterla dietro un abbonamento.</li>
            <li data-row>Non toccare giochi online con anti-cheat.</li>
            <li data-row>Se il titolare ti chiede di togliere tutto, toglilo.</li>
            <li data-row>Dichiara nei crediti fonti e strumenti, compresa l’eventuale traduzione automatica.</li>
          </ul>
          <p class="small lg-note" data-r>In Italia la traduzione è un diritto riservato all’autore (L. 633/1941, art. 18). L’art. 64-quater permette di decompilare un programma solo entro limiti stretti, per l’interoperabilità. Questa pagina non è un parere legale.</p>
        </div>
        <figure class="pong" data-r>
          <img :src="img('signed-pong-cabinet.webp')" width="974" height="1600" alt="Cabinato arcade di Pong, giallo e legno" loading="lazy" data-drift />
        </figure>
      </div>
    </section>
  </div>
</template>

<style scoped>
.o-list { list-style: none; display: grid; gap: 48px; }
.o-row { display: grid; grid-template-columns: 7fr 5fr; column-gap: var(--gutter); align-items: first baseline; }
.o-name { font-size: clamp(2rem, 0.8rem + 3.6vw, 4.6rem); letter-spacing: -0.05em; line-height: 1; }
.lg-copy { grid-column: 1 / 8; display: grid; gap: 28px; align-content: start; }
.lg-list { list-style: none; display: grid; gap: 16px; font-size: var(--step-lead); line-height: 1.3; }
.lg-list li { padding-left: 1.1em; position: relative; }
.lg-list li::before { content: ''; position: absolute; left: 0; top: 0.42em; width: 0.5em; height: 0.5em; background: var(--f5); }
.lg-note { max-width: 70ch; }
.pong { grid-column: 9 / 13; margin: 0; aspect-ratio: 3 / 4; overflow: hidden; background: var(--dark-step); }
.pong img { width: 100%; height: 108%; object-fit: cover; }
@media (max-width: 800px) {
  .o-row { grid-template-columns: 1fr; gap: 10px; }
  .o-list { gap: 36px; }
  .pong { margin-top: 40px; max-width: 320px; }
}
</style>
