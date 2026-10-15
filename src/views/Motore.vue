<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMotion } from '../composables/useMotion.js'
import { engines, engineById } from '../data/engines.js'
import { toolById } from '../data/tools.js'

const route = useRoute()
const root = ref(null)
useMotion(root)

const e = computed(() => engineById[route.params.id] || engines[0])
const idx = computed(() => engines.findIndex((x) => x.id === e.value.id))
const next = computed(() => engines[(idx.value + 1) % engines.length])
const prev = computed(() => engines[(idx.value - 1 + engines.length) % engines.length])
const tl = computed(() => e.value.tools.map((id) => toolById[id]).filter(Boolean))
</script>

<template>
  <div ref="root">
    <section class="page-head field" :class="e.field" data-sec>
      <h1 class="display lines"><span class="line"><span data-line>{{ e.name }}</span></span></h1>
      <p class="lead" data-r>{{ e.where }}</p>
      <dl class="facts" data-r>
        <div><dt>Difficoltà</dt><dd>{{ e.level }}</dd></div>
        <div><dt>Come lo riconosci</dt><dd>{{ e.clue }}</dd></div>
        <div><dt>Giochi</dt><dd>{{ e.games }}</dd></div>
      </dl>
    </section>

    <section class="steps field dark chapter" data-sec>
      <div class="grid">
        <h2 class="head s-title" data-r>Come si fa</h2>
        <ol class="s-list">
          <li v-for="s in e.steps" :key="s" data-row>{{ s }}</li>
        </ol>
      </div>
      <div v-if="e.code" class="s-code" data-r>
        <pre class="code"><code>{{ e.code.text }}</code></pre>
      </div>
    </section>

    <section class="tools field chapter" :class="e.field" data-sec>
      <div class="grid">
        <div class="t-col">
          <h2 class="head" data-r>Ti servono</h2>
          <ul class="t-list">
            <li v-for="t in tl" :key="t.id" data-row>
              <a :href="t.url" class="link t-name" target="_blank" rel="noopener">{{ t.name }}</a>
              <p>{{ t.what }}</p>
            </li>
          </ul>
        </div>
        <div class="w-col">
          <h2 class="head" data-r>Cosa si rompe</h2>
          <ul class="w-list">
            <li v-for="p in e.pitfalls" :key="p" data-row>{{ p }}</li>
          </ul>
          <h3 class="more" data-r>Approfondisci</h3>
          <ul class="l-list">
            <li v-for="l in e.links" :key="l.url" data-row><a :href="l.url" class="link" target="_blank" rel="noopener">{{ l.label }}</a></li>
          </ul>
        </div>
      </div>
    </section>

    <nav class="pager field f1" aria-label="Altri motori">
      <RouterLink :to="`/motori/${prev.id}`" class="pg"><span class="small">Precedente</span><span class="pg-name">{{ prev.name }}</span></RouterLink>
      <RouterLink :to="`/motori/${next.id}`" class="pg right"><span class="small">Successivo</span><span class="pg-name">{{ next.name }}</span></RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.facts { margin: 48px 0 0; display: grid; grid-template-columns: 1fr 2fr 2fr; gap: var(--gutter); max-width: 1200px; }
.facts dt { font-weight: 600; font-size: var(--step-small); }
.facts dd { margin: 6px 0 0; }
.s-title { grid-column: 1 / 5; align-self: start; position: sticky; top: 96px; }
.s-list { grid-column: 5 / 13; padding-left: 1.4em; display: grid; gap: 22px; font-size: var(--step-lead); line-height: 1.35; }
.s-list li::marker { font-weight: 800; color: var(--f5); }
.s-code { margin-top: 72px; max-width: 980px; margin-left: auto; }
.s-code .code { background: var(--dark-step); }
.t-col { grid-column: 1 / 7; }
.w-col { grid-column: 8 / 13; }
.t-list, .w-list, .l-list { list-style: none; display: grid; gap: 22px; margin-top: 32px; }
.t-name { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.03em; }
.t-list p { margin-top: 6px; }
.w-list li { padding-left: 1.2em; position: relative; }
.w-list li::before { content: ''; position: absolute; left: 0; top: 0.5em; width: 0.55em; height: 0.55em; background: var(--ink); }
.more { margin-top: 56px; font-size: 1.5rem; letter-spacing: -0.03em; }
.l-list { margin-top: 16px; gap: 10px; font-weight: 600; }
.pager { display: flex; justify-content: space-between; gap: 24px; padding-block: 56px; }
.pg { display: grid; gap: 4px; text-decoration: none; transition: color var(--t-hover) ease; }
.pg.right { text-align: right; }
.pg-name { font-size: var(--step-head); font-weight: 800; letter-spacing: -0.045em; line-height: 1; }
@media (hover: hover) and (pointer: fine) { .pg:hover { color: var(--accent); } }
@media (max-width: 800px) {
  .facts { grid-template-columns: 1fr; }
  .s-title { position: static; margin-bottom: 24px; }
  .s-list { font-size: 1.1rem; }
  .s-code { margin-top: 40px; }
  .w-col { margin-top: 56px; }
  .pg-name { font-size: 1.6rem; }
}
</style>
