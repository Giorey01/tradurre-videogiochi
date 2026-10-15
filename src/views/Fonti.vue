<script setup>
import { ref } from 'vue'
import { useMotion } from '../composables/useMotion.js'
import PageHead from '../components/PageHead.vue'
import { communities, videos, guides } from '../data/content.js'

const root = ref(null)
useMotion(root)
const img = (f) => `${import.meta.env.BASE_URL}img/${f}`
</script>

<template>
  <div ref="root">
    <PageHead
      :lines="['Chi traduce', 'già da anni']"
      field="f2"
      :pic="{ src: 'rosetta-stone-front-face-corrected-image.webp', w: 1100, h: 1287, alt: 'La stele di Rosetta' }"
      lead="Community italiane e internazionali, talk della GDC, tutorial video, documentazione ufficiale e libri. Ogni link è stato aperto e controllato il 15 ottobre 2026."
    />

    <section id="community" class="comm field f3 chapter" data-sec>
      <div class="grid">
        <div class="c-head">
          <h2 class="head" data-r>Community</h2>
          <figure class="pic" data-r>
            <img :src="img('burgertime-arcade-video-game.webp')" width="1600" height="900" alt="Cabinato da tavolo di BurgerTime in un locale" loading="lazy" />
          </figure>
        </div>
        <ul class="c-list">
          <li v-for="c in communities" :key="c.name" data-row>
            <a :href="c.url" class="link c-name" target="_blank" rel="noopener">{{ c.name }}</a>
            <p class="small c-where">{{ c.where }}</p>
            <p>{{ c.what }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="video" class="vid field dark chapter" data-sec>
      <h2 class="head" data-r>Video da guardare</h2>
      <ul class="v-list">
        <li v-for="v in videos" :key="v.url" class="v-row" data-row>
          <a :href="v.url" class="v-link" target="_blank" rel="noopener">
            <span class="v-title">{{ v.title }}</span>
            <span class="v-meta small">{{ v.tag }} · {{ v.who }}</span>
          </a>
        </li>
      </ul>
    </section>

    <section id="guide" class="gd field f4 chapter" data-sec>
      <div class="grid">
        <div class="g-head">
          <h2 class="head" data-r>Guide e libri</h2>
          <figure class="pic" data-r>
            <img :src="img('telegames-atari-pong.webp')" width="1600" height="1175" alt="Console Pong di Atari con due manopole" loading="lazy" />
          </figure>
        </div>
        <ul class="g-list">
          <li v-for="g in guides" :key="g.url" data-row>
            <p class="small g-who">{{ g.who }}</p>
            <a :href="g.url" class="link g-name" target="_blank" rel="noopener">{{ g.title }}</a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.c-head, .g-head { grid-column: 1 / 5; display: grid; gap: 28px; align-content: start; position: sticky; top: 96px; align-self: start; }
.pic { margin: 0; aspect-ratio: 3 / 2; overflow: hidden; background: var(--step); }
.pic img { width: 100%; height: 100%; object-fit: cover; }
.c-list, .g-list { grid-column: 6 / 13; list-style: none; display: grid; gap: 36px; }
.c-name, .g-name { font-size: clamp(1.4rem, 1rem + 1.2vw, 2.1rem); font-weight: 800; letter-spacing: -0.035em; line-height: 1.05; }
.c-where { font-weight: 600; margin: 6px 0 8px; color: var(--muted); }
.g-list { gap: 26px; }
.g-who { margin-bottom: 4px; font-weight: 600; color: var(--muted); }
.v-list { list-style: none; margin-top: 48px; display: grid; gap: 4px; }
.v-link { display: flex; justify-content: space-between; align-items: baseline; gap: 24px; text-decoration: none; padding-block: 10px; transition: color var(--t-hover) ease; }
.v-title { font-size: clamp(1.35rem, 0.9rem + 1.5vw, 2.4rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; }
.v-meta { white-space: nowrap; color: var(--muted); font-weight: 600; }
@media (hover: hover) and (pointer: fine) { .v-link:hover { color: var(--f5); } }
@media (max-width: 800px) {
  .c-head, .g-head { position: static; margin-bottom: 40px; }
  .v-link { flex-direction: column; gap: 4px; }
  .v-meta { white-space: normal; }
}
</style>
