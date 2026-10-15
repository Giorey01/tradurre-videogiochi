<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// La forma gigante dell'hero è un box di dialogo: la stessa riga passa
// dall'inglese al giapponese all'italiano, come in una tabella di stringhe.
const lines = [
  { lang: 'en', text: 'Press any key to continue' },
  { lang: 'ja', text: '何かキーを押してください' },
  { lang: 'it', text: 'Premi un tasto per continuare' },
]
const shown = ref(lines[2].text)
const lang = ref('it')
let timer
let alive = true

const wait = (ms) => new Promise((r) => (timer = setTimeout(r, ms)))

async function loop() {
  let i = 0
  while (alive) {
    const l = lines[i % lines.length]
    lang.value = l.lang
    shown.value = ''
    for (const ch of l.text) {
      if (!alive) return
      shown.value += ch
      await wait(l.lang === 'ja' ? 90 : 48)
    }
    await wait(l.lang === 'it' ? 3200 : 1900)
    i++
  }
}

onMounted(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  shown.value = ''
  loop()
})
onBeforeUnmount(() => {
  alive = false
  clearTimeout(timer)
})
</script>

<template>
  <div class="shape" data-ui aria-hidden="true">
    <div class="inner">
      <span class="tag">{{ lang }}</span>
      <p class="say" :lang="lang">{{ shown }}<span class="caret"></span></p>
      <span class="next"></span>
    </div>
  </div>
</template>

<style scoped>
.shape {
  position: absolute;
  width: 120vh;
  height: 82vh;
  left: 52%;
  top: 22%;
  background: var(--accent);
  color: var(--paper);
  pointer-events: none;
}
.inner { position: absolute; inset: 0; padding: 7vh 6vh; }
.tag {
  display: inline-block;
  font-weight: 600;
  font-size: 1.1rem;
  background: var(--paper);
  color: var(--accent);
  padding: 0.2em 0.6em;
}
.say {
  margin-top: 4vh;
  font-size: clamp(1.6rem, 3.6vh, 2.6rem);
  font-weight: 600;
  line-height: 1.25;
  max-width: 16ch;
  min-height: 2.6em;
  letter-spacing: -0.02em;
}
.caret { display: inline-block; width: 0.5em; height: 0.12em; background: currentColor; margin-left: 0.08em; vertical-align: baseline; }
.next {
  position: absolute;
  left: 6vh;
  top: 31vh;
  width: 0;
  height: 0;
  border-left: 1.2rem solid transparent;
  border-right: 1.2rem solid transparent;
  border-top: 1.5rem solid var(--f5);
  animation: bob 1.1s var(--ease-in-out) infinite alternate;
}
@keyframes bob { to { transform: translateY(8px); } }
@media (prefers-reduced-motion: reduce) { .next { animation: none; } }

@media (max-width: 800px) {
  .shape { width: 130vw; height: 60vw; left: -8vw; top: auto; bottom: -14vw; }
  .inner { padding: 7vw 12vw; }
  .say { margin-top: 3vw; font-size: 6vw; max-width: 18ch; }
  .next { left: auto; right: 22vw; top: 9vw; }
}
</style>
