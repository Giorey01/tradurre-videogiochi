// Stelle e ultima attività: rilevate via GitHub API il 15 ottobre 2026.
// "what" = cosa ti lascia fare davvero; "limits" = dove si ferma.

export const toolGroups = [
  {
    id: 'live',
    name: 'Tradurre mentre giochi',
    short: 'Live',
    field: 'f1',
    intro:
      'Leggono il testo mentre il gioco gira e te lo mostrano tradotto. Ottimi per giocare in una lingua che non conosci, ma non producono una traduzione da distribuire: ogni giocatore deve installarli e il risultato è traduzione automatica.',
  },
  {
    id: 'runtime',
    name: 'Plugin a runtime',
    short: 'Runtime',
    field: 'f2',
    intro:
      'Si agganciano al motore e sostituiscono le stringhe al volo. Se poi correggi a mano i file che generano, diventano un vero modo di pubblicare una traduzione senza toccare i file del gioco.',
  },
  {
    id: 'extract',
    name: 'Estrarre e reinserire',
    short: 'Estrazione',
    field: 'f3',
    intro:
      'Aprono gli archivi del gioco, tirano fuori il testo in un formato modificabile e lo rimettono dentro. È la strada delle fan translation vere: patch che si installano una volta e funzionano per tutti.',
  },
  {
    id: 'cat',
    name: 'Dove si traduce davvero',
    short: 'CAT e piattaforme',
    field: 'f4',
    intro:
      'Programmi di traduzione assistita (CAT) e piattaforme di localizzazione. Gestiscono memoria di traduzione, glossario, controlli su tag e numeri, lavoro di squadra. Qui passa il 90% delle ore.',
  },
  {
    id: 'ai',
    name: 'Traduzione con l’AI',
    short: 'AI',
    field: 'f5',
    intro:
      'Pipeline che mandano il testo estratto a un LLM o a un traduttore offline. Quasi tutti nascono per giapponese o cinese verso inglese o cinese; per l’italiano funzionano cambiando la lingua di arrivo, ma la revisione umana resta obbligatoria.',
  },
  {
    id: 're',
    name: 'Scavare più a fondo',
    short: 'Reverse e patch',
    field: 'f1',
    intro:
      'Quando il testo è dentro il codice, il formato è sconosciuto o il font va ridisegnato. Strumenti da reverse engineering, loader di mod e creatori di patch.',
  },
]

export const tools = [
  // ——— LIVE
  {
    id: 'translumo', group: 'live', name: 'Translumo',
    url: 'https://github.com/ramjke/Translumo', stars: '5,8k', active: 'set 2026', platform: 'Windows',
    what: 'Fotografa una zona dello schermo, la legge con l’OCR e sovrappone la traduzione (Google, DeepL, Yandex, Papago). Funziona con qualsiasi gioco perché guarda i pixel, non i file.',
    limits: 'Font pixel art e testo stilizzato confondono l’OCR. C’è un po’ di ritardo e non ottieni nessun file da correggere o condividere.',
  },
  {
    id: 'luna', group: 'live', name: 'LunaTranslator',
    url: 'https://github.com/HIllya51/LunaTranslator', stars: '13,7k', active: 'ott 2026', platform: 'Windows',
    what: 'Il coltellino svizzero delle visual novel: aggancia il processo (hook, tramite LunaHook), oppure usa OCR o appunti, e passa il testo a decine di traduttori, LLM compresi. Ha dizionari, sintesi vocale e un sistema di correzioni personali.',
    limits: 'Pensato per VN e giochi giapponesi. Gli hook possono non trovare il testo nei motori meno comuni.',
  },
  {
    id: 'textractor', group: 'live', name: 'Textractor',
    url: 'https://github.com/Artikash/Textractor', stars: '2,7k', active: 'mar 2024', platform: 'Windows',
    what: 'Il text hooker storico: si inietta nel gioco e cattura le stringhe che passano per le funzioni di disegno del testo. Ha estensioni per mandarle a un traduttore o a una pagina web.',
    limits: 'Fermo dal 2024. Oggi molti usano LunaHook dentro LunaTranslator. Utile da capire perché tante guide lo citano.',
  },
  {
    id: 'rst', group: 'live', name: 'RSTGameTranslation',
    url: 'https://github.com/thanhkeke97/RSTGameTranslation', stars: '724', active: 'ott 2026', platform: 'Windows',
    what: 'OCR in tempo reale con traduzione tramite modelli AI, pensato apposta per i giochi. Progetto giovane e molto attivo.',
    limits: 'Stessi limiti di ogni OCR: resta una lettura dello schermo, non una traduzione dei file.',
  },

  // ——— RUNTIME
  {
    id: 'xunity', group: 'runtime', name: 'XUnity.AutoTranslator',
    url: 'https://github.com/bbepis/XUnity.AutoTranslator', stars: '3,5k', active: 'ott 2026', platform: 'Giochi Unity',
    what: 'Plugin per BepInEx o MelonLoader che intercetta il testo di UGUI, TextMeshPro, NGUI e IMGUI. Lo traduce con un servizio online e salva tutto in file di testo che puoi correggere a mano. Può anche sostituire texture e font, e tradurre senza rete usando solo i tuoi file.',
    limits: 'Solo Unity. Senza revisione resta traduzione automatica. Il testo costruito in pezzi dal codice viene tradotto a pezzi.',
  },
  {
    id: 'bepinex', group: 'runtime', name: 'BepInEx',
    url: 'https://github.com/BepInEx/BepInEx', stars: '8,8k', active: 'set 2026', platform: 'Unity, XNA',
    what: 'Il loader di plugin su cui gira XUnity e quasi ogni mod Unity. Con Harmony puoi modificare metodi del gioco: ad esempio allargare un box di testo o correggere una frase composta dal codice.',
    limits: 'Va scelta la build giusta (Mono o IL2CPP, x86 o x64). Scrivere patch Harmony richiede C#.',
  },
  {
    id: 'melon', group: 'runtime', name: 'MelonLoader',
    url: 'https://github.com/LavaGang/MelonLoader', stars: '4,3k', active: 'ott 2026', platform: 'Unity Mono e IL2CPP',
    what: 'Alternativa a BepInEx, molto diffusa nei giochi IL2CPP e in VR. XUnity.AutoTranslator ha una build anche per MelonLoader.',
    limits: 'Alcune community usano solo uno dei due loader: segui quello che usa già la scena del tuo gioco.',
  },
  {
    id: 'smapi', group: 'runtime', name: 'SMAPI',
    url: 'https://github.com/Pathoschild/SMAPI', stars: '2,8k', active: 'set 2026', platform: 'Stardew Valley',
    what: 'Il loader di mod di Stardew Valley. Le mod ricevono un file i18n per lingua (ad esempio it.json): tradurre una mod significa aggiungere quel file.',
    limits: 'Vale per un solo gioco, ma è l’esempio più pulito di come un sistema di mod gestisce le lingue.',
  },

  // ——— EXTRACT
  {
    id: 'translatorpp', group: 'extract', name: 'Translator++',
    url: 'https://dreamsavior.net', stars: 'closed source', active: 'freemium', platform: 'Windows',
    what: 'Apre un gioco RPG Maker (da XP a MZ), Wolf RPG, Ren’Py, KiriKiri e altri motori tramite addon. Mostra tutte le stringhe in una griglia, segnala i codici di controllo, fa traduzione automatica in blocco ed esporta la patch.',
    limits: 'Non è open source e le versioni più recenti sono in parte a pagamento. Se lanci la traduzione automatica sugli script, il gioco si rompe: va usata con giudizio.',
  },
  {
    id: 'uabea', group: 'extract', name: 'UABEA',
    url: 'https://github.com/nesrak1/UABEA', stars: '2,5k', active: 'mag 2026', platform: 'Unity',
    what: 'Apre asset e bundle Unity, esporta TextAsset e MonoBehaviour come dump modificabili e li reimporta. È il modo classico di cambiare un file di localizzazione dentro resources.assets.',
    limits: 'Per i MonoBehaviour dei giochi IL2CPP servono i tipi ricostruiti (Il2CppDumper o Cpp2IL).',
  },
  {
    id: 'unitypy', group: 'extract', name: 'UnityPy',
    url: 'https://github.com/K0lb3/UnityPy', stars: '1,5k', active: 'ott 2026', platform: 'Python',
    what: 'Libreria Python per leggere, modificare e salvare asset Unity. Ti permette di scrivere in poche righe un estrattore e reinseritore per il tuo gioco, ripetibile a ogni aggiornamento.',
    limits: 'Serve sapere un po’ di Python e capire come il gioco organizza i suoi dati.',
  },
  {
    id: 'assetripper', group: 'extract', name: 'AssetRipper / AssetStudio',
    url: 'https://github.com/AssetRipper/AssetRipper', stars: '8,6k', active: 'ott 2026', platform: 'Unity',
    what: 'Esplorano un gioco Unity ed esportano testi, immagini, font e script per capire dove sta cosa. AssetStudio (Perfare, 15,6k stelle) è fermo dal 2022 ma ancora molto citato.',
    limits: 'Servono a guardare ed estrarre, non a reinserire.',
  },
  {
    id: 'fmodel', group: 'extract', name: 'FModel',
    url: 'https://github.com/4sval/FModel', stars: '3,3k', active: 'ott 2026', platform: 'Unreal Engine',
    what: 'Esplora i .pak e gli IoStore (.utoc/.ucas) di Unreal e ti mostra dove sono i .locres (le tabelle di localizzazione) e gli asset con testo.',
    limits: 'Se i pak sono cifrati serve la chiave AES del gioco. Esporta, non reimpacchetta.',
  },
  {
    id: 'locres', group: 'extract', name: 'UE4LocalizationsTool · UnrealLocres',
    url: 'https://github.com/amrshaheen61/UE4LocalizationsTool', stars: '171 · 157', active: '2024 · 2021', platform: 'Unreal Engine',
    what: 'Convertono i .locres (e alcuni .uasset con testo) in file di testo, CSV o PO da tradurre e poi li ricompilano. UnrealLocres (akintos) è la versione a riga di comando, comoda negli script.',
    limits: 'I formati cambiano tra versioni di Unreal: controlla sempre il file ricompilato in gioco.',
  },
  {
    id: 'repak', group: 'extract', name: 'repak · retoc',
    url: 'https://github.com/trumank/repak', stars: '582 · 244', active: '2026', platform: 'Unreal Engine',
    what: 'Creano il pak di patch (ad esempio pakchunk99-Traduzione_P.pak) che il gioco carica sopra i file originali. retoc fa lo stesso per l’IoStore di UE5.',
    limits: 'Versione del pak e compressione devono corrispondere a quelle del gioco.',
  },
  {
    id: 'unrpyc', group: 'extract', name: 'unrpyc · unrpa',
    url: 'https://github.com/CensoredUsername/unrpyc', stars: '1,3k · 767', active: '2026 · 2022', platform: 'Ren’Py',
    what: 'unrpa apre gli archivi .rpa e unrpyc ridà gli script .rpy dai .rpyc compilati. Poi puoi usare il sistema di traduzione già incluso in Ren’Py.',
    limits: 'Alcuni giochi offuscano gli script. Prima di decompilare, rispetta quello che chiede lo sviluppatore.',
  },
  {
    id: 'gdre', group: 'extract', name: 'GDRE Tools',
    url: 'https://github.com/GDRETools/gdsdecomp', stars: '4,3k', active: 'ott 2026', platform: 'Godot',
    what: 'Recupera un progetto Godot dal .pck o dall’eseguibile, compresi i file di traduzione (CSV o gettext .po, che Godot legge direttamente).',
    limits: 'I .pck cifrati richiedono la chiave. Dopo le modifiche devi rifare il pck o caricarne uno di patch.',
  },
  {
    id: 'utmt', group: 'extract', name: 'UndertaleModTool',
    url: 'https://github.com/UnderminersTeam/UndertaleModTool', stars: '2,1k', active: 'set 2026', platform: 'GameMaker',
    what: 'Apre il data.win dei giochi GameMaker: lista delle stringhe, codice, sprite e font bitmap. Ha script per esportare e importare il testo in blocco.',
    limits: 'I font sono immagini: per à, è, ì, ò, ù spesso devi aggiungere o ridisegnare i glifi.',
  },
  {
    id: 'mvdec', group: 'extract', name: 'RPG Maker MV Decrypter',
    url: 'https://github.com/Petschko/RPG-Maker-MV-Decrypter', stars: '764', active: '2023', platform: 'RPG Maker MV/MZ',
    what: 'Decifra immagini e audio cifrati (.rpgmvp, .png_) quando devi tradurre titoli, menu disegnati o cartelli. Il testo in data/*.json di solito è già in chiaro.',
    limits: 'Ti serve solo per la grafica con testo.',
  },
  {
    id: 'garbro', group: 'extract', name: 'GARbro',
    url: 'https://github.com/morkt/GARbro', stars: '3,3k', active: '2024', platform: 'Visual novel',
    what: 'Apre centinaia di formati d’archivio di visual novel giapponesi (KiriKiri .xp3, Siglus, NScripter…) e ne estrae script e immagini. Il fork GARbro2 è ancora attivo.',
    limits: 'Estrae molto, reimpacchetta poco: per reinserire servono strumenti specifici del motore.',
  },
  {
    id: 'vntt', group: 'extract', name: 'VNTranslationTools',
    url: 'https://github.com/arcusmaximus/VNTranslationTools', stars: '424', active: '2023', platform: 'Visual novel',
    what: 'VNTextPatch estrae e reinserisce gli script di molti motori VN in fogli Excel o JSON. VNTextProxy risolve i font e permette lettere accentate dove il gioco accetta solo Shift-JIS.',
    limits: 'Supporta una lista precisa di motori: controllala prima di partire.',
  },
  {
    id: 'kuriimu', group: 'extract', name: 'Kuriimu2',
    url: 'https://github.com/FanTranslatorsInternational/Kuriimu2', stars: '444', active: 'ago 2026', platform: 'Console Nintendo e altro',
    what: 'Gestore di progetti per fan translation: apre archivi, testi, immagini e font di molti giochi 3DS, DS e Switch, con plugin per formato.',
    limits: 'Serve un dump legale del gioco da una console tua.',
  },
  {
    id: 'switchtb', group: 'extract', name: 'Switch Toolbox',
    url: 'https://github.com/KillzXGaming/Switch-Toolbox', stars: '1,2k', active: 'ago 2026', platform: 'Formati Nintendo',
    what: 'Editor di tanti formati Nintendo, compresi i file di testo MSBT usati da molti giochi first party.',
    limits: 'Strumento da modding, non da traduzione: il testo lo modifichi a mano o lo esporti con altri tool.',
  },

  // ——— CAT
  {
    id: 'omegat', group: 'cat', name: 'OmegaT',
    url: 'https://omegat.org', stars: 'open source', active: 'gratuito', platform: 'Windows, macOS, Linux',
    what: 'CAT gratuito e libero: segmenta il testo, ricorda ogni frase tradotta (memoria di traduzione), suggerisce i termini del glossario e controlla tag e numeri. Legge PO, XLIFF, testo semplice e, con il plugin Okapi, molti altri formati.',
    limits: 'L’interfaccia è spartana. Per JSON e CSV dei giochi a volte conviene convertire prima in PO.',
  },
  {
    id: 'weblate', group: 'cat', name: 'Weblate',
    url: 'https://github.com/WeblateOrg/weblate', stars: '6,1k', active: 'ott 2026', platform: 'Web',
    what: 'Piattaforma web libera collegata a Git: più traduttori lavorano insieme, con revisioni, glossario condiviso, commenti sulle stringhe e controlli automatici. Hosted Weblate ospita gratis i progetti liberi.',
    limits: 'Da installare in proprio è impegnativo. Per due persone basta OmegaT con Git.',
  },
  {
    id: 'crowdin', group: 'cat', name: 'Crowdin · Lokalise · memoQ',
    url: 'https://crowdin.com', stars: 'commerciali', active: 'piani gratuiti per open source', platform: 'Web e desktop',
    what: 'Quello che usano gli studi. Crowdin è la piattaforma più comune per le traduzioni community di giochi ufficiali. memoQ e Trados sono i CAT dei professionisti.',
    limits: 'Ti servono soprattutto quando uno sviluppatore ti invita nel suo progetto: allora conviene saperli usare.',
  },
  {
    id: 'ttk', group: 'cat', name: 'Translate Toolkit',
    url: 'https://github.com/translate/translate', stars: '981', active: 'ott 2026', platform: 'Python e riga di comando',
    what: 'Convertitori pronti tra formati: json2po, csv2po, po2json, prop2po e altri, più pofilter per i controlli di qualità. È il collante tra il gioco e il tuo CAT.',
    limits: 'Strumento da terminale: va messo dentro uno script.',
  },

  // ——— AI
  {
    id: 'ainiee', group: 'ai', name: 'AiNiee',
    url: 'https://github.com/NEKOparapa/AiNiee', stars: '6,4k', active: 'ott 2026', platform: 'Windows',
    what: 'Traduce con modelli AI i file esportati da giochi RPG e SLG (anche tramite MTool o Translator++), oltre a romanzi e sottotitoli. Gestisce glossario, contesto e controlli sui codici.',
    limits: 'Interfaccia e documentazione sono pensate prima di tutto per il cinese.',
  },
  {
    id: 'linguagacha', group: 'ai', name: 'LinguaGacha',
    url: 'https://github.com/neavo/LinguaGacha', stars: '2,6k', active: 'ott 2026', platform: 'Windows',
    what: 'Traduttore AI per romanzi, giochi e sottotitoli, con terminologia, prompt personalizzabili e controllo di coerenza.',
    limits: 'Ti dà una bozza: tono, battute e nomi vanno rivisti a mano.',
  },
  {
    id: 'galtransl', group: 'ai', name: 'GalTransl',
    url: 'https://github.com/GalTransl/GalTransl', stars: '2,3k', active: 'ott 2026', platform: 'Visual novel',
    what: 'Pipeline completa per visual novel con LLM (GPT, Claude, DeepSeek, Sakura): dizionari prima e dopo la traduzione, glossario dei personaggi, cache, si integra con gli strumenti di estrazione.',
    limits: 'Nata per giapponese verso cinese: per l’italiano va configurata e provata.',
  },
  {
    id: 'dazed', group: 'ai', name: 'DazedMTLTool',
    url: 'https://github.com/dazedanon/DazedMTLTool', stars: '13', active: 'ott 2026', platform: 'Python',
    what: 'Script per tradurre con LLM i file di RPG Maker, Wolf e altri motori proteggendo i codici di controllo. Piccolo, ma leggibile: utile da studiare se vuoi scrivere la tua pipeline.',
    limits: 'Poco documentato.',
  },

  // ——— RE
  {
    id: 'il2cpp', group: 're', name: 'Il2CppDumper · Cpp2IL',
    url: 'https://github.com/SamboyCoding/Cpp2IL', stars: '3k · 9,5k', active: '2026 · 2024', platform: 'Unity IL2CPP',
    what: 'Ricostruiscono classi e metodi di un gioco Unity compilato in IL2CPP. Ti servono per capire dove nasce una stringa scritta nel codice o per scrivere una patch BepInEx.',
    limits: 'Sei già nel reverse engineering: è il livello avanzato.',
  },
  {
    id: 'unityexplorer', group: 're', name: 'UnityExplorer',
    url: 'https://github.com/yukieiji/UnityExplorer', stars: '1k', active: 'set 2026', platform: 'Unity',
    what: 'Ispettore dentro il gioco: clicchi un testo e vedi quale oggetto e quale componente lo disegna. Ti dice subito se è un TextMeshPro, che font usa e da dove arriva.',
    limits: 'Va installato tramite BepInEx o MelonLoader.',
  },
  {
    id: 'imhex', group: 're', name: 'ImHex',
    url: 'https://github.com/WerWolv/ImHex', stars: '55k', active: 'ott 2026', platform: 'Windows, macOS, Linux',
    what: 'Editor esadecimale con un linguaggio per descrivere i formati. Quando un file non ha tool, cerchi una frase nota, capisci lunghezze e puntatori e scrivi lo schema del formato.',
    limits: 'Ti mostra i byte. Il formato devi capirlo tu.',
  },
  {
    id: 'ghidra', group: 're', name: 'Ghidra',
    url: 'https://github.com/NationalSecurityAgency/ghidra', stars: '88k', active: 'ott 2026', platform: 'Windows, macOS, Linux',
    what: 'Disassembler e decompilatore. Serve per testo hardcoded nei giochi nativi, per allargare buffer, per cambiare la tabella dei caratteri o aggiungere un font a larghezza variabile in una ROM.',
    limits: 'Curva di apprendimento ripida. Per l’italiano raramente serve, tranne nei giochi vecchi o nativi.',
  },
  {
    id: 'armips', group: 're', name: 'armips',
    url: 'https://github.com/Kingcom/armips', stars: '413', active: 'ago 2026', platform: 'GBA, DS, PSP, PS1, PS2',
    what: 'Assembler usato nelle fan translation di console: inserisce testo, tabelle e piccole modifiche al codice nella ROM in modo ripetibile, da uno script.',
    limits: 'Solo per ROM e architetture ARM e MIPS.',
  },
  {
    id: 'patchers', group: 're', name: 'Floating IPS · xdelta',
    url: 'https://github.com/Sir-Walrus/Flips', stars: '453 · 1,4k', active: '2025 · 2026', platform: 'Tutte',
    what: 'Creano una patch che contiene solo le differenze tra il file originale e quello tradotto (BPS o IPS per le ROM, xdelta per file grandi). Così pubblichi il tuo lavoro senza distribuire il gioco.',
    limits: 'La patch funziona solo sulla versione esatta del file: indica sempre hash o versione.',
  },
]

export const toolById = Object.fromEntries(tools.map((t) => [t.id, t]))
