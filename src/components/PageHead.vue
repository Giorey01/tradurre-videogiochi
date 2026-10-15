<script setup>
defineProps({
  lines: { type: Array, required: true },
  lead: { type: String, default: '' },
  field: { type: String, default: 'f1' },
  pic: { type: Object, default: null }, // { src, alt, w, h }
})
const img = (f) => `${import.meta.env.BASE_URL}img/${f}`
</script>

<template>
  <section class="page-head field" :class="[field, { 'has-pic': pic }]" data-sec>
    <div class="ph-text">
      <h1 class="display lines">
        <span v-for="(l, i) in lines" :key="i" class="line"><span data-line>{{ l }}</span></span>
      </h1>
      <p v-if="lead" class="lead" data-r>{{ lead }}</p>
      <slot />
    </div>
    <figure v-if="pic" class="ph-pic" data-r>
      <img :src="img(pic.src)" :width="pic.w" :height="pic.h" :alt="pic.alt" />
    </figure>
  </section>
</template>

<style scoped>
.page-head.has-pic { display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 4fr); column-gap: var(--gutter); align-items: end; }
.has-pic .display { font-size: clamp(2.75rem, 0.4rem + 6.6vw, 7rem); }
.ph-pic { margin: 0; aspect-ratio: 4 / 5; overflow: hidden; background: var(--step); }
.ph-pic img { width: 100%; height: 100%; object-fit: cover; }
@media (max-width: 800px) {
  .page-head.has-pic { grid-template-columns: 1fr; row-gap: 40px; }
  .ph-pic { aspect-ratio: 3 / 2; }
}
</style>
