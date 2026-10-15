<script setup>
import { ref, onMounted } from 'vue'
import { useMotion } from '../composables/useMotion.js'
import HeroBox from '../components/HeroBox.vue'
import DialogueTester from '../components/DialogueTester.vue'
import { engines } from '../data/engines.js'
import { ways, faqs, glossary } from '../data/content.js'

const root = ref(null)
useMotion(root)

// il video gira solo se l'utente non ha chiesto meno movimento
const clip = ref(null)
onMounted(() => {
  if (clip.value && !matchMedia('(prefers-reduced-motion: reduce)').matches) clip.value.play().catch(() => {})
})

const img = (f) => `${import.meta.env.BASE_URL}img/${f}`
const openWay = ref('overlay')

const capabilities = [
  { name: 'Leggere lo schermo', desc: 'OCR e traduzione in sovrimpressione su qualunque gioco, anche emulato.', to: '/strumenti#live' },
  { name: 'Agganciare il gioco', desc: 'Catturare il testo dal processo mentre viene disegnato.', to: '/strumenti#live' },
  { name: 'Sostituire a runtime', desc: 'Un plugin che rimpiazza ogni stringa con la tua, senza toccare i file.', to: '/strumenti#runtime' },
  { name: 'Aprire gli archivi', desc: 'Estrarre testo, font e immagini da pak, assets, rpa, data.win.', to: '/strumenti#extract' },
  { name: 'Tradurre con memoria', desc: 'Glossario, memoria di traduzione e controlli sui tag in un CAT.', to: '/strumenti#cat' },
  { name: 'Bozze con l’AI', desc: 'Pipeline LLM con glossario e contesto, da rivedere riga per riga.', to: '/strumenti#ai' },
  { name: 'Pubblicare una patch', desc: 'Solo le differenze, senza distribuire il gioco.', to: '/strumenti#re' },
]

const tileColors = ['f1', 'f2', 'f3', 'f4', 'f5', 'dark']

const strip = [
  ['famicom-devil-world-cartridge-5158740395.webp', 'Cartuccia Famicom di Devil World, etichetta in giapponese e inglese', 3, 2],
  ['signed-pong-cabinet.webp', 'Cabinato arcade di Pong', 3, 4],
  ['vintage-typewriter-keys.webp', 'Tasti di una macchina da scrivere', 3, 2],
  ['nes-famicom-pal-ntsc-european-american-japanese.webp', 'Famicom giapponese sopra un NES americano e uno europeo', 1, 1],
  ['burgertime-arcade-video-game.webp', 'Cabinato da tavolo di BurgerTime', 3, 2],
  ['telegames-atari-pong.webp', 'Console Pong di Atari', 3, 2],
  ['rosetta-stone-front-face-corrected-image.webp', 'La stele di Rosetta', 3, 4],
]
</script>

<template>
  <div ref="root">
    <!-- HERO -->
    <section class="hero field f1" data-sec>
      <HeroBox />
      <div class="hero-copy">
        <h1 class="display lines">
          <span class="line"><span data-line>Tradurre</span></span>
          <span class="line"><span data-line>videogiochi</span></span>
        </h1>
        <p class="hero-sub" data-r>
          Una guida in italiano per passare da zero alla tua prima patch: gli strumenti su GitHub, i motori, il mestiere e le community.
        </p>
        <div data-r>
          <RouterLink to="/percorso" class="button">Inizia il percorso <span class="tri" aria-hidden="true"></span></RouterLink>
        </div>
      </div>
    </section>

    <!-- INTRO: scala -->
    <section class="intro field dark" data-sec>
      <div class="stairs-wrap">
        <p class="stairs" data-r>
          <span style="--s:0">Ogni gioco nasconde migliaia di frasi.</span>
          <span style="--s:1">Impara ad aprirle, tradurle</span>
          <span style="--s:2">e rimetterle al loro posto.</span>
        </p>
        <div class="stair-pics">
          <figure data-r>
            <img :src="img('famicom-devil-world-cartridge-5158740395.webp')" width="1600" height="1142" alt="Cartuccia Famicom di Devil World: titolo in katakana e in inglese sulla stessa etichetta" loading="lazy" />
          </figure>
          <figure data-r class="vid">
            <video :poster="img('olivetti-dora-poster.webp')" muted loop playsinline preload="metadata" ref="clip" aria-label="Una Olivetti Dora portatile degli anni Sessanta: i martelletti battono sul rullo">
              <source :src="img('olivetti-dora.webm')" type="video/webm" />
            </video>
          </figure>
        </div>
      </div>
      <p class="small stair-note" data-r>
        Nelle immagini, un titolo in due scritture sulla stessa cartuccia<br />e una Olivetti Dora, la macchina da scrivere di chi traduceva negli anni Sessanta.
      </p>
    </section>

    <!-- COME FUNZIONA -->
    <section class="ways field f2 chapter" data-sec id="come">
      <div class="grid ways-intro">
        <h2 class="head" data-r>Quattro modi di tradurre</h2>
        <p class="ways-p" data-r>
          Questi programmi non fanno tutti la stessa cosa. Alcuni ti aiutano a giocare, altri ti aiutano a creare una traduzione per tutti. Capire in quale dei quattro casi sei è il primo passo.
        </p>
      </div>
      <div class="acc" data-r>
        <div
          v-for="(w, i) in ways"
          :key="w.id"
          class="panel"
          :class="[{ open: openWay === w.id }, 't' + (i + 1)]"
        >
          <button class="panel-btn" type="button" :aria-expanded="openWay === w.id" @click="openWay = w.id">
            <span class="panel-name">{{ w.name }}</span>
          </button>
          <div class="panel-body" :hidden="openWay !== w.id">
            <p class="panel-text">{{ w.body }}</p>
            <p class="small panel-tools">{{ w.tools }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MOTORI -->
    <section class="engines field f3" data-sec id="motori">
      <ul class="poster">
        <li v-for="e in engines" :key="e.id" data-row>
          <RouterLink :to="`/motori/${e.id}`" class="poster-row">
            <span class="poster-name">{{ e.short || e.name }}</span>
            <span class="poster-fact">{{ e.level }}</span>
          </RouterLink>
        </li>
      </ul>
      <p class="engines-note" data-r>
        Ogni motore nasconde il testo in un posto diverso. Scegli il tuo, oppure
        <RouterLink class="link" to="/motori">riconoscilo dai file</RouterLink> che vedi nella cartella del gioco.
      </p>
    </section>

    <!-- COSA TI LASCIANO FARE -->
    <section class="caps field f4" data-sec>
      <ul class="caps-list">
        <li class="caps-row caps-head" data-row><h2 class="caps-name muted">Cosa ti lasciano fare</h2></li>
        <li v-for="c in capabilities" :key="c.name" class="caps-row" data-row>
          <RouterLink :to="c.to" class="caps-name">{{ c.name }}</RouterLink>
          <p class="caps-desc">{{ c.desc }}</p>
        </li>
      </ul>
    </section>

    <!-- BANCO DI PROVA -->
    <section class="bench field f5 chapter" data-sec id="prova">
      <div class="grid">
        <div class="bench-copy">
          <h2 class="head" data-r>Il box di dialogo</h2>
          <p class="bench-p" data-r>
            Ogni frase tradotta deve stare in uno spazio fisso, senza rompere un solo codice. Prova: scegli una stringa vera, scrivi la tua versione e guardala nel gioco.
          </p>
          <figure class="rosetta" data-shutter>
            <img :src="img('rosetta-stone-front-face-corrected-image.webp')" width="1368" height="1600" alt="La stele di Rosetta: lo stesso decreto inciso in geroglifico, demotico e greco" loading="lazy" />
          </figure>
          <p class="small cap" data-r>La stele di Rosetta: lo stesso testo in tre scritture. Una tabella di stringhe fa lo stesso lavoro.</p>
        </div>
        <div class="bench-tool" data-r>
          <DialogueTester />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="faq field f1 chapter" data-sec>
      <div class="grid">
        <h2 class="head faq-title" data-r>Le domande di tutti</h2>
        <div class="faq-list">
          <details v-for="(f, i) in faqs" :key="f.q" name="faq" class="tile" data-row :open="i === 0">
            <summary>
              <span>{{ f.q }}</span>
              <span class="plus" aria-hidden="true"><i></i><i></i></span>
            </summary>
            <p class="answer">{{ f.a }}</p>
          </details>
          <p class="faq-more" data-r>
            Approfondisci: <RouterLink class="link" to="/ostacoli">tutti gli ostacoli</RouterLink>,
            <RouterLink class="link" to="/programma">quando scrivere un programma tuo</RouterLink> e
            <RouterLink class="link" to="/mestiere">le regole del mestiere</RouterLink>.
          </p>
        </div>
      </div>
    </section>

    <!-- GLOSSARIO -->
    <section class="gloss field dark" data-sec>
      <div class="tiles">
        <div class="tile-w first f5" data-row><span class="tw">Glossario</span><span class="tc">passa sopra una parola</span></div>
        <div v-for="(g, i) in glossary" :key="g.word" class="tile-w" :class="tileColors[i % tileColors.length]" data-row :title="g.def">
          <span class="tw">{{ g.word }}</span>
          <span class="tc">{{ g.caption }}</span>
          <span class="td small">{{ g.def }}</span>
        </div>
      </div>
    </section>

    <!-- COMMUNITY -->
    <section class="community field f2" data-sec>
      <div class="strip" aria-hidden="true">
        <div class="strip-track">
          <img v-for="(p, i) in [...strip, ...strip]" :key="i" :src="img(p[0])" :alt="''" :style="{ aspectRatio: `${p[2]} / ${p[3]}` }" loading="lazy" />
        </div>
      </div>
      <h2 class="head comm-title" data-r>Non tradurre da solo</h2>
      <p class="comm-p" data-r>Gruppi italiani, forum storici, wiki tecniche, talk della GDC e tutorial video, raccolti e controllati.</p>
      <div class="cells" data-r>
        <RouterLink to="/fonti#community" class="cell">Community</RouterLink>
        <RouterLink to="/fonti#video" class="cell">Video</RouterLink>
        <RouterLink to="/fonti#guide" class="cell inv">Guide e libri</RouterLink>
      </div>
      <div class="cells-notes small">
        <span>Dal Discord di TWR Traduzioni all’archivio di Romhacking.net.</span>
        <span>Ogni link è stato aperto il 15 ottobre 2026.</span>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* HERO */
.hero { min-height: 100svh; overflow: hidden; display: flex; align-items: center; }
.hero-copy { position: relative; z-index: 2; padding-left: 6vw; padding-block: 120px 80px; max-width: 54%; }
.hero h1 { font-size: clamp(3rem, 0.6rem + 6.6vw, 7.25rem); }
.hero-sub { margin-top: 28px; font-size: var(--step-lead); line-height: 1.3; max-width: 30ch; }
.hero .button { margin-top: 32px; }

/* INTRO */
.intro { padding-block: clamp(96px, 10vw, 160px) 56px; display: flex; flex-direction: column; gap: 56px; }
.stairs-wrap { display: grid; grid-template-columns: minmax(0, 1fr) 30vw; gap: var(--gutter); align-items: center; }
.stairs { font-size: clamp(1.5rem, 1rem + 1.4vw, 2.25rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.035em; max-width: none; padding-left: 4vw; }
.stairs span { display: block; padding-left: calc(var(--s) * 8vw); }
.stairs span:nth-child(odd) { color: var(--f5); }
.stairs span:nth-child(even) { color: var(--f1); }
.stair-pics { display: grid; gap: 16px; }
.stair-pics figure { margin: 0; aspect-ratio: 3 / 2; overflow: hidden; background: var(--dark-step); }
.stair-pics img, .stair-pics video { width: 100%; height: 100%; object-fit: cover; display: block; }
.stair-note { padding-left: 4vw; color: var(--dark-ink); max-width: 46ch; }

/* WAYS */
.ways-intro { align-items: end; }
.ways-intro h2 { grid-column: 1 / 6; }
.ways-p { grid-column: 7 / 12; }
.acc { display: flex; margin-top: 64px; height: 520px; }
.panel { position: relative; flex: 1 1 0; min-width: 0; transition: flex-grow 450ms var(--ease-out); overflow: hidden; color: var(--paper); }
.panel.open { flex-grow: 5.2; }
.t1 { background: var(--t1); } .t2 { background: var(--t2); } .t3 { background: var(--t3); }
.t4 { background: var(--t4); color: var(--ink); }
.panel-btn { position: absolute; inset: 0; width: 100%; border: 0; background: transparent; cursor: pointer; text-align: left; padding: 0; }
.panel-name {
  position: absolute; left: 22px; bottom: 22px;
  font-weight: 800; font-size: 1.25rem; letter-spacing: -0.02em;
  writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap;
}
.panel.open .panel-btn { cursor: default; pointer-events: none; }
.panel.open .panel-name { writing-mode: horizontal-tb; transform: none; top: 28px; left: 28px; bottom: auto; font-size: clamp(1.8rem, 1rem + 1.8vw, 2.5rem); line-height: 1; max-width: 14ch; }
.panel-body { position: absolute; left: 28px; right: 28px; bottom: 28px; display: grid; gap: 14px; }
.panel-text { max-width: 36ch; }
.panel-tools { font-weight: 600; max-width: 40ch; }
@media (hover: hover) and (pointer: fine) {
  .panel:not(.open):hover { filter: brightness(1.08); }
}

/* POSTER MOTORI */
.engines { padding-block: 80px; }
.poster { list-style: none; }
.poster-row {
  display: flex; justify-content: space-between; align-items: baseline; gap: 24px;
  text-decoration: none;
  transition: color var(--t-hover) ease;
}
.poster-name { font-size: clamp(2.6rem, 0.2rem + 8.4vw, 8.4rem); font-weight: 800; letter-spacing: -0.055em; line-height: 0.95; text-transform: lowercase; }
.poster-fact { font-size: 1.15rem; font-weight: 600; white-space: nowrap; }
.engines-note { margin-top: 56px; max-width: 52ch; font-size: var(--step-lead); line-height: 1.3; }
@media (hover: hover) and (pointer: fine) {
  .poster-row:hover { color: var(--accent); }
}

/* CAPABILITIES */
.caps { padding-block: 18vh; }
.caps-list { list-style: none; display: grid; gap: 0.35em; }
.caps-row { display: grid; grid-template-columns: 8fr 4fr; column-gap: var(--gutter); align-items: first baseline; }
.caps-name { font-size: clamp(2.2rem, 0.9rem + 3.9vw, 5.25rem); font-weight: 800; letter-spacing: -0.05em; line-height: 1; text-decoration: none; transition: color var(--t-hover) ease; }
.caps-head .caps-name { color: var(--muted); }
.caps-desc { font-size: 1.05rem; }
.caps-list:hover .caps-row:not(.caps-head):not(:hover) .caps-name { color: var(--muted); }

/* BENCH */
.bench-copy { grid-column: 1 / 6; display: grid; gap: 24px; align-content: start; }
.bench-tool { grid-column: 7 / 13; min-width: 0; }
.rosetta { margin: 12px 0 0; width: min(100%, 360px); aspect-ratio: 4 / 5; overflow: hidden; background: var(--f5-step); }
.rosetta img { width: 100%; height: 100%; object-fit: cover; }
.cap { max-width: 40ch; }

/* FAQ */
.faq-title { grid-column: 1 / 5; position: sticky; top: 96px; align-self: start; }
.faq-list { grid-column: 5 / 13; display: grid; gap: 8px; }
.tile { background: var(--step); }
.tile summary {
  list-style: none; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center; gap: 20px;
  min-height: 72px; padding: 18px 24px;
  font-size: 1.25rem; font-weight: 600; letter-spacing: -0.02em;
}
.tile summary::-webkit-details-marker { display: none; }
.tile[open] { background: var(--accent); color: var(--accent-ink); }
.plus { position: relative; width: 16px; height: 16px; flex: none; }
.plus i { position: absolute; left: 0; top: 6.5px; width: 16px; height: 3px; background: currentColor; transition: transform var(--t-ui) var(--ease-out); }
.plus i:last-child { transform: rotate(90deg); }
.tile[open] .plus i:last-child { transform: rotate(0deg); }
.answer { padding: 0 24px 24px; max-width: 52ch; font-size: 1.06rem; }
.faq-more { margin-top: 24px; font-weight: 600; }

/* GLOSSARIO */
.gloss { padding-block: 8px; padding-inline: 8px; }
.tiles { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.tile-w {
  aspect-ratio: 1; position: relative; overflow: hidden;
  display: grid; place-items: center; text-align: center; color: var(--ink);
  padding: 16px;
}
.tile-w.dark { background: var(--dark-step); color: var(--dark-ink); }
.tw { font-size: clamp(2.2rem, 0.4rem + 4.6vw, 5.4rem); font-weight: 800; letter-spacing: -0.05em; line-height: 0.9; }
.first .tw { font-size: clamp(1.8rem, 0.4rem + 3.4vw, 4rem); }
.tc { position: absolute; left: 0; right: 0; bottom: 18px; font-size: 0.875rem; font-weight: 600; }
.td {
  position: absolute; inset: 0; padding: 20px; display: grid; place-items: center;
  background: var(--ink); color: var(--paper); opacity: 0; visibility: hidden;
  transition: opacity var(--t-ui) ease, visibility 0s linear var(--t-ui);
}
@media (hover: hover) and (pointer: fine) {
  .tile-w:hover .td { opacity: 1; visibility: visible; transition: opacity var(--t-ui) ease; }
}

/* COMMUNITY */
.community { min-height: 80svh; padding-block: 48px 96px; overflow: hidden; }
.strip { margin-inline: calc(var(--margin) * -1); overflow: hidden; }
.strip-track { display: flex; gap: 8px; width: max-content; animation: marquee 60s linear infinite; }
.strip img { height: 150px; width: auto; object-fit: cover; flex: none; }
@keyframes marquee { to { transform: translateX(-50%); } }
@media (hover: hover) { .strip:hover .strip-track { animation-play-state: paused; } }
@media (prefers-reduced-motion: reduce) { .strip-track { animation: none; } }
.comm-title { margin-top: 72px; }
.comm-p { margin-top: 20px; font-size: var(--step-lead); line-height: 1.3; max-width: 44ch; }
.cells { margin-top: 40px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.cell {
  height: 96px; display: grid; place-items: center; background: var(--step);
  font-size: 1.15rem; font-weight: 600; text-decoration: none;
  transition: background-color var(--t-hover) ease, transform var(--t-press) var(--ease-out);
}
.cell:active { transform: scale(0.98); }
.cell.inv { background: var(--ink); color: var(--paper); }
@media (hover: hover) and (pointer: fine) {
  .cell:hover { background: var(--paper); }
  .cell.inv:hover { background: var(--accent); }
}
.cells-notes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-top: 10px; }
.cells-notes span:last-child { grid-column: 3; }

/* PHONE */
@media (max-width: 800px) {
  .hero { align-items: flex-start; }
  .hero-copy { max-width: none; padding-left: 0; padding-block: 15svh 62vw; }
  .hero h1 { font-size: 11.5vw; }
  .hero-sub { font-size: 1rem; max-width: 34ch; }

  .intro { padding-block: 96px 40px; }
  .stairs-wrap { grid-template-columns: 1fr; }
  .stairs { font-size: 1.4rem; padding-left: 0; }
  .stairs span { padding-left: calc(var(--s) * 5vw); }
  .stair-pics { grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 32px; }
  .stair-note { padding-left: 0; }

  .acc { flex-direction: column; height: auto; margin-top: 40px; }
  .panel { flex: none; min-height: 64px; }
  .panel-name { writing-mode: horizontal-tb; transform: none; top: 20px; left: 18px; bottom: auto; font-size: 1.125rem; }
  .panel.open { padding: 76px 18px 22px; }
  .panel.open .panel-name { top: 20px; left: 18px; font-size: 1.6rem; }
  .panel-body { position: static; }

  .engines { padding-block: 56px; }
  .poster-row { flex-direction: column; align-items: flex-start; gap: 6px; padding-bottom: 18px; }
  .poster-name { font-size: 12vw; }
  .poster-fact { font-size: 0.95rem; }

  .caps { padding-block: 72px; }
  .caps-list { gap: 28px; }
  .caps-row { grid-template-columns: 1fr; }
  .caps-name { font-size: 9.5vw; }
  .caps-desc { padding-left: 16px; margin-top: 6px; }

  .faq-title { position: static; margin-bottom: 24px; font-size: 9vw; }
  .tile summary { font-size: 1.1rem; min-height: 64px; padding: 16px 18px; }
  .answer { padding: 0 18px 20px; }

  .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
  .tw { font-size: 10.5vw; }
  .first .tw { font-size: 7.4vw; }

  .strip img { height: 110px; }
  .comm-title { font-size: 9vw; }
  .cells { grid-template-columns: 1fr; }
  .cell { height: 60px; }
  .cells-notes { grid-template-columns: 1fr; }
  .cells-notes span:last-child { grid-column: auto; }
}
</style>
