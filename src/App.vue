<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteFooter from './components/SiteFooter.vue'

const route = useRoute()
const open = ref(false)
watch(() => route.fullPath, () => (open.value = false))

const links = [
  { to: '/strumenti', label: 'Strumenti' },
  { to: '/motori', label: 'Motori' },
  { to: '/mestiere', label: 'Mestiere' },
  { to: '/fonti', label: 'Fonti' },
]
// la barra prende il colore del primo capitolo della pagina
const barField = computed(() => route.meta.field || 'f1')
</script>

<template>
  <header class="bar field" :class="barField">
    <RouterLink to="/" class="wordmark" aria-label="Rosetta Pixel, home">rosetta pixel</RouterLink>
    <nav class="links" :class="{ open }" aria-label="Sezioni">
      <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="link navlink">{{ l.label }}</RouterLink>
      <RouterLink to="/percorso" class="button navcta">Inizia <span class="tri" aria-hidden="true"></span></RouterLink>
    </nav>
    <button class="menu-toggle link" type="button" :aria-expanded="open" @click="open = !open">
      {{ open ? 'Chiudi' : 'Menu' }}
    </button>
  </header>

  <main>
    <RouterView v-slot="{ Component, route: r }">
      <component :is="Component" :key="r.fullPath" />
    </RouterView>
  </main>

  <SiteFooter />
</template>

<style scoped>
.bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-block: calc(18px + env(safe-area-inset-top, 0px)) 18px;
  background: transparent;
}
.wordmark {
  font-weight: 800;
  font-size: 1.75rem;
  letter-spacing: -0.05em;
  text-decoration: none;
  line-height: 1;
}
.links { display: flex; align-items: center; gap: clamp(16px, 2.4vw, 36px); }
.navlink { font-weight: 600; text-decoration-color: transparent; }
.navlink.router-link-active { text-decoration-color: currentColor; }
.navcta { padding: 0.7em 1em 0.7em 1.1em; }
.menu-toggle { display: none; background: none; border: 0; font-weight: 600; cursor: pointer; padding: 8px 0; }

@media (max-width: 800px) {
  .menu-toggle { display: block; }
  .links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 12px max(16px, env(safe-area-inset-right, 0px)) 28px max(16px, env(safe-area-inset-left, 0px));
    background: var(--ink);
    color: var(--paper);
  }
  .links.open { display: flex; }
  .navlink { font-size: 2.2rem; font-weight: 800; letter-spacing: -0.04em; }
  .navcta { margin-top: 14px; }
}
</style>
