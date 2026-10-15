<script setup>
import { ref, computed } from 'vue'
import { useMotion } from '../composables/useMotion.js'
import PageHead from '../components/PageHead.vue'
import { tools, toolGroups } from '../data/tools.js'

const root = ref(null)
useMotion(root)

const q = ref('')
const groups = computed(() =>
  toolGroups
    .map((g) => ({
      ...g,
      items: tools.filter(
        (t) =>
          t.group === g.id &&
          (!q.value ||
            (t.name + ' ' + t.what + ' ' + t.platform).toLowerCase().includes(q.value.toLowerCase())),
      ),
    }))
    .filter((g) => g.items.length),
)
const count = computed(() => groups.value.reduce((n, g) => n + g.items.length, 0))
</script>

<template>
  <div ref="root">
    <PageHead
      :lines="['Gli strumenti', 'e cosa fanno']"
      field="f3"
      :pic="{ src: 'telegames-atari-pong.webp', w: 1600, h: 1175, alt: 'Console Pong di Atari con due manopole' }"
      lead="Più di quaranta programmi, quasi tutti open source su GitHub, divisi per quello che ti permettono di fare. Per ognuno: cosa ti lascia fare davvero e dove si ferma."
    >
      <div class="find" data-r>
        <label for="tool-q" class="small find-label">Cerca per nome, motore o funzione</label>
        <input id="tool-q" v-model="q" type="search" placeholder="Unity, font, OCR, patch…" autocomplete="off" />
        <nav class="jump" aria-label="Vai a una categoria">
          <a v-for="g in toolGroups" :key="g.id" :href="`#/strumenti#${g.id}`" class="chip" @click.prevent="$router.replace({ hash: '#' + g.id })">{{ g.short }}</a>
        </nav>
        <p class="small tab">{{ count }} strumenti mostrati</p>
      </div>
    </PageHead>

    <section
      v-for="g in groups"
      :id="g.id"
      :key="g.id"
      class="group field chapter"
      :class="g.field"
      data-sec
    >
      <div class="grid g-intro">
        <h2 class="head" data-r>{{ g.name }}</h2>
        <p data-r>{{ g.intro }}</p>
      </div>
      <ul class="rows">
        <li v-for="t in g.items" :key="t.id" class="row grid" data-row>
          <div class="who">
            <h3><a :href="t.url" class="link name" target="_blank" rel="noopener">{{ t.name }}</a></h3>
            <p class="small meta tab">{{ t.platform }} · {{ t.stars }}<template v-if="/\d/.test(t.stars)"> stelle</template> · {{ t.active }}</p>
          </div>
          <div class="body">
            <p>{{ t.what }}</p>
            <p class="limits"><strong>Limiti.</strong> {{ t.limits }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section v-if="!groups.length" class="field f1 chapter" data-sec>
      <p class="lead">Nessuno strumento corrisponde a “{{ q }}”. Prova con il nome del motore.</p>
    </section>
  </div>
</template>

<style scoped>
.find { margin-top: 48px; display: grid; gap: 12px; max-width: 760px; }
.find-label { font-weight: 600; }
input[type='search'] {
  font: inherit; font-size: var(--step-lead);
  border: 0; background: var(--step); color: var(--ink);
  padding: 16px 18px; width: 100%;
}
input[type='search']:focus-visible { outline: 3px solid var(--accent); outline-offset: 0; background: var(--paper); }
.jump { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  background: var(--ink); color: var(--paper); text-decoration: none; font-weight: 600;
  padding: 0.5em 0.9em; transition: background-color var(--t-hover) ease, transform var(--t-press) var(--ease-out);
}
.chip:active { transform: scale(0.97); }
@media (hover: hover) and (pointer: fine) { .chip:hover { background: var(--accent); } }

.g-intro { align-items: end; }
.g-intro h2 { grid-column: 1 / 7; }
.g-intro p { grid-column: 8 / 13; }
.rows { list-style: none; margin-top: 72px; display: grid; gap: 48px; }
.row { align-items: start; }
.who { grid-column: 1 / 6; }
.body { grid-column: 6 / 13; display: grid; gap: 10px; }
.name { font-size: clamp(1.6rem, 1rem + 1.6vw, 2.5rem); font-weight: 800; letter-spacing: -0.04em; line-height: 1.02; text-decoration-color: transparent; }
@media (hover: hover) and (pointer: fine) { .name:hover { text-decoration-color: currentColor; } }
.meta { margin-top: 8px; color: var(--muted); font-weight: 600; }
.limits { color: var(--muted); }
.limits strong { color: var(--ink); }
@media (max-width: 800px) {
  .rows { margin-top: 40px; gap: 36px; }
  .g-intro p { margin-top: 16px; }
}
</style>
