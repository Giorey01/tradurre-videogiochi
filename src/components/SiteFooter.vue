<script setup>
const top = () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
const credits = [
  { t: 'Rosetta Stone, front face', by: 'Awikimate', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/w/index.php?curid=84378499', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  { t: 'Famicom “Devil World” cartridge', by: 'Bryan Ochalla', lic: 'CC BY-SA 2.0', url: 'https://commons.wikimedia.org/w/index.php?curid=67033260', licUrl: 'https://creativecommons.org/licenses/by-sa/2.0/' },
  { t: 'NES Famicom PAL NTSC', by: 'Bololabich', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/w/index.php?curid=98596735', licUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  { t: 'Signed Pong Cabinet', by: 'Chris Rand', lic: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/w/index.php?curid=28364913', licUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' },
  { t: 'Vintage typewriter keys', by: 'Markus Spiske', lic: 'CC0', url: 'https://www.rawpixel.com/image/432980/free-photo-image-story-writer-typewriter', licUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' },
  { t: 'BurgerTime Arcade Video Game', by: 'wanderin’ wolfgang', lic: 'CC BY-SA 2.0', url: 'https://commons.wikimedia.org/w/index.php?curid=121804453', licUrl: 'https://creativecommons.org/licenses/by-sa/2.0/' },
  { t: 'Olivetti Dora portable typewriter (video)', by: 'Erik Pålsson', lic: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:Olivetti_Dora_portable_typewriter.webm', licUrl: 'https://creativecommons.org/licenses/by/3.0/' },
  { t: 'TeleGames Atari Pong', by: 'Evan-Amos', lic: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/w/index.php?curid=18298735', licUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' },
]
</script>

<template>
  <footer class="foot field dark">
    <p class="name" aria-hidden="true">rosetta pixel</p>
    <div class="row grid">
      <ul class="places">
        <li><a class="link" href="https://github.com/Giorey01/tradurre-videogiochi">Codice su GitHub</a></li>
        <li><RouterLink class="link" to="/percorso">Il percorso</RouterLink></li>
        <li><RouterLink class="link" to="/fonti">Community</RouterLink></li>
      </ul>
      <div class="cols">
        <ul>
          <li><RouterLink class="link" to="/strumenti">Strumenti</RouterLink></li>
          <li><RouterLink class="link" to="/motori">Motori</RouterLink></li>
          <li><RouterLink class="link" to="/mestiere">Il mestiere</RouterLink></li>
        </ul>
        <ul>
          <li><RouterLink class="link" to="/ostacoli">Ostacoli</RouterLink></li>
          <li><RouterLink class="link" to="/programma">Un programma tuo?</RouterLink></li>
          <li><RouterLink class="link" to="/fonti">Video e guide</RouterLink></li>
        </ul>
        <ul>
          <li><RouterLink class="link" to="/motori/renpy">Ren’Py</RouterLink></li>
          <li><RouterLink class="link" to="/motori/unity">Unity</RouterLink></li>
          <li><RouterLink class="link" to="/motori/unreal">Unreal</RouterLink></li>
        </ul>
      </div>
    </div>
    <p class="credits small">
      Immagini e video:
      <template v-for="(c, i) in credits" :key="c.t">
        <a class="link" :href="c.url">“{{ c.t }}”</a> di {{ c.by }}, <a class="link" :href="c.licUrl">{{ c.lic }}</a><template v-if="i < credits.length - 1">; </template>
      </template>.
      Dati dei repository rilevati da GitHub il 15 ottobre 2026.
    </p>
    <div class="legal small">
      <span>Guida indipendente, non affiliata a nessuno sviluppatore. Nessun parere legale.</span>
      <button class="link back" type="button" @click="top">Torna su</button>
    </div>
  </footer>
</template>

<style scoped>
.foot { padding-block: 0 40px; overflow: hidden; }
.name {
  font-size: clamp(3.5rem, 15.6vw, 17rem);
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: 0.82;
  white-space: nowrap;
  max-width: none;
  margin: 0 0 0 -0.04em;
  padding-top: 0.12em;
  color: var(--f5);
}
.row { margin-top: 72px; align-items: start; }
.places { grid-column: 1 / 6; list-style: none; display: grid; gap: 6px; }
.places a { font-size: clamp(1.6rem, 1.1rem + 1.4vw, 2.25rem); font-weight: 800; letter-spacing: -0.04em; color: var(--f2); text-decoration-color: transparent; }
.cols { grid-column: 7 / 13; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--gutter); }
.cols ul { list-style: none; display: grid; gap: 8px; font-size: 0.95rem; }
.cols a { text-decoration-color: transparent; }
.credits { margin-top: 96px; max-width: 64ch; color: var(--muted); }
.legal { margin-top: 24px; display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; color: var(--muted); }
.back { background: none; border: 0; padding: 0; cursor: pointer; color: var(--dark-ink); }
@media (hover: hover) and (pointer: fine) {
  .places a:hover, .cols a:hover { text-decoration-color: currentColor; }
}
@media (max-width: 800px) {
  .row { margin-top: 40px; row-gap: 32px; }
  .places a { font-size: 1.6rem; }
  .cols { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 20px; }
  .credits { margin-top: 56px; }
}
</style>
