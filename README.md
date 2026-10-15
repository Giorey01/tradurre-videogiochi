# Rosetta Pixel

Guida in italiano per imparare a tradurre videogiochi, dagli indie ai giochi più grandi.

**Sito:** https://giorey01.github.io/tradurre-videogiochi/

## Cosa trovi

- **Strumenti**: più di quaranta programmi (quasi tutti open source su GitHub), con quello che ti permettono di fare e i loro limiti. Ci sono traduttori live (Translumo, LunaTranslator), plugin a runtime (XUnity.AutoTranslator), strumenti di estrazione (UABEA, FModel, UndertaleModTool, GARbro…), CAT (OmegaT, Weblate), pipeline AI e reverse engineering.
- **Motori**: come riconoscere il motore dai file del gioco e come tradurre in Ren’Py, RPG Maker, Unity, Unreal, Godot, GameMaker, visual novel giapponesi, ROM e giochi nati per le mod.
- **Il mestiere**: contesto, glossario, variabili, genere e plurali, spazio, tipografia italiana e revisione.
- **Ostacoli**: archivi cifrati, font senza accentate, testo nel codice, anti-cheat e diritto d’autore.
- **Un programma tuo?**: quando conviene scriverlo, la pipeline consigliata e due script Python di esempio.
- **Percorso**: dieci passi da zero alla prima patch.
- **Fonti**: community italiane e internazionali, talk GDC, tutorial YouTube, documentazione e libri.
- **Il box di dialogo**: prova interattiva in cui traduci una stringa vera e vedi se codici, righe e font reggono.

I dati dei repository (stelle, ultima attività) sono stati rilevati il 15 ottobre 2026.

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

Stack: Vue 3, Vue Router (hash history, così funziona su GitHub Pages), GSAP con ScrollTrigger e Vite. A ogni push su `main` il workflow `.github/workflows/pages.yml` pubblica il sito.

I contenuti stanno in `src/data/`:

- `tools.js`: strumenti
- `engines.js`: motori e indizi per riconoscerli
- `content.js`: mestiere, ostacoli, percorso, FAQ, glossario, community, video e guide

Per aggiungere uno strumento o una fonte modifica questi file.

## Crediti delle immagini

Tutte le immagini e il video vengono da Wikimedia Commons o rawpixel, con licenze CC BY, CC BY-SA o CC0. L’elenco completo, con autori e link, è nel footer del sito e in `assets/credits.json`.

## Avvertenza

È una guida indipendente e non è affiliata a nessuno sviluppatore o publisher. Le note sul diritto d’autore non sono un parere legale.
