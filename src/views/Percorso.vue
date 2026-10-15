<script setup>
import { ref, watch } from 'vue'
import { useMotion } from '../composables/useMotion.js'
import PageHead from '../components/PageHead.vue'
import { path } from '../data/content.js'

const root = ref(null)
useMotion(root)

// i passi completati restano solo nel tuo browser
const KEY = 'rosetta-percorso'
const done = ref([])
try { done.value = JSON.parse(localStorage.getItem(KEY) || '[]') } catch { done.value = [] }
watch(done, (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* storage non disponibile */ } }, { deep: true })
</script>

<template>
  <div ref="root">
    <PageHead
      :lines="['Da zero alla', 'prima patch']"
      field="f5"
      :pic="{ src: 'signed-pong-cabinet.webp', w: 974, h: 1600, alt: 'Cabinato arcade di Pong, giallo e legno' }"
      lead="Dieci passi, in quest’ordine. I primi sette bastano per pubblicare la tua prima traduzione. Spunta quelli fatti: il segno resta in questo browser."
    >
      <p class="small tab progress" data-r>{{ done.length }} di {{ path.length }} completati</p>
    </PageHead>

    <section class="steps field f2 chapter" data-sec>
      <ol class="p-list">
        <li v-for="(p, i) in path" :key="p.title" class="p-item" :class="{ done: done.includes(i) }" data-row>
          <div class="p-head">
            <input :id="'step-' + i" v-model="done" type="checkbox" :value="i" />
            <label :for="'step-' + i"><h2 class="p-title">{{ p.title }}</h2></label>
          </div>
          <div class="p-body">
            <p class="goal"><strong>Obiettivo.</strong> {{ p.goal }}</p>
            <p>{{ p.body }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section class="next field dark chapter" data-sec>
      <h2 class="head" data-r>Per il tuo primo weekend</h2>
      <ul class="w-list">
        <li data-row>Scarica un gioco Ren’Py corto e gratuito da itch.io e chiedi allo sviluppatore se puoi tradurlo.</li>
        <li data-row>Installa l’SDK di Ren’Py, genera i file in game/tl/italian e traduci le prime cento battute.</li>
        <li data-row>Scrivi un glossario di venti voci e una guida di stile di dieci righe.</li>
        <li data-row>Gioca la parte tradotta, fai screenshot dei problemi e correggili.</li>
      </ul>
      <div class="w-actions" data-r>
        <RouterLink to="/motori/renpy" class="button">Guida a Ren’Py <span class="tri" aria-hidden="true"></span></RouterLink>
        <RouterLink to="/mestiere" class="button ghost">Le regole del mestiere</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.progress { margin-top: 28px; font-weight: 600; }
.p-list { list-style: none; display: grid; gap: 80px; }
.p-item { display: grid; grid-template-columns: 6fr 6fr; column-gap: var(--gutter); align-items: start; }
.p-head { display: flex; gap: 16px; align-items: flex-start; }
.p-head input { width: 26px; height: 26px; margin-top: 0.35em; flex: none; accent-color: var(--accent); cursor: pointer; }
.p-head label { cursor: pointer; }
.p-title { font-size: clamp(1.9rem, 0.9rem + 3vw, 4rem); letter-spacing: -0.05em; line-height: 1; transition: color var(--t-hover) ease; }
.p-item.done .p-title { color: var(--accent); }
.p-body { display: grid; gap: 10px; }
.goal strong { font-weight: 800; }
.w-list { list-style: none; margin-top: 40px; display: grid; gap: 16px; font-size: var(--step-lead); line-height: 1.3; max-width: 60ch; }
.w-list li { padding-left: 1.1em; position: relative; }
.w-list li::before { content: ''; position: absolute; left: 0; top: 0.42em; width: 0.5em; height: 0.5em; background: var(--f5); }
.w-actions { margin-top: 48px; display: flex; flex-wrap: wrap; gap: 12px; }
@media (max-width: 800px) {
  .p-item { grid-template-columns: 1fr; gap: 14px; }
  .p-list { gap: 72px; }
}
</style>
