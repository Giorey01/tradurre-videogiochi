// Ogni motore: come lo riconosci, dove sta il testo, come lo traduci, cosa si rompe.
// level: quanto è dura per chi inizia (Facile, Medio, Difficile, Esperto).

export const engines = [
  {
    id: 'renpy',
    name: 'Ren’Py',
    level: 'Facile',
    field: 'f2',
    clue: 'Cartella game/ con file .rpa, .rpyc o .rpy, e una cartella renpy/ accanto all’eseguibile.',
    games: 'Visual novel indie, Doki Doki Literature Club, Katawa Shoujo e migliaia di giochi su itch.io.',
    where: 'Negli script .rpy (spesso compilati in .rpyc e chiusi in archivi .rpa). Ren’Py ha un sistema di traduzione incluso: ogni battuta riceve un ID e la traduzione vive in game/tl/<lingua>/.',
    steps: [
      'Se trovi solo .rpa e .rpyc, estrai con unrpa e decompila con unrpyc. Se lo sviluppatore ti dà il progetto, salta questo passo.',
      'Apri il progetto con il launcher di Ren’Py, scegli Generate Translations e scrivi italian: nascono i file in game/tl/italian/.',
      'Traduci i blocchi translate italian … : la riga originale resta commentata sopra, tu scrivi sotto.',
      'Le stringhe di menu e interfaccia sono nel blocco translate italian strings: con coppie old e new.',
      'Aggiungi la scelta della lingua nelle preferenze con Language("italian"), oppure imposta config.default_language.',
      'Distribuisci solo la cartella tl/italian (più eventuali font): si copia dentro game/ e basta.',
    ],
    code: {
      lang: 'renpy',
      text: `# game/tl/italian/script.rpy
translate italian start_a170b500:

    # e "You've created a new Ren'Py game."
    e "Hai creato un nuovo gioco Ren'Py."

translate italian strings:

    old "Start"
    new "Inizia"

    old "[player_name] has joined the party."
    new "[player_name] si è unito al gruppo."`,
    },
    tools: ['unrpyc', 'translatorpp', 'omegat'],
    pitfalls: [
      'Non tradurre le variabili tra parentesi quadre come [player_name] né i tag come {i} e {color=#f00}.',
      'Il font di default di molti giochi ha le accentate, ma i font personalizzati spesso no: controlla à, è, é, ì, ò, ù, È.',
      'Ogni aggiornamento del gioco: rigenera le traduzioni, Ren’Py aggiunge solo le battute nuove.',
    ],
    links: [
      { label: 'Documentazione ufficiale sulle traduzioni', url: 'https://www.renpy.org/doc/html/translation.html' },
      { label: 'unrpyc su GitHub', url: 'https://github.com/CensoredUsername/unrpyc' },
    ],
  },
  {
    id: 'rpgmaker',
    name: 'RPG Maker',
    level: 'Facile',
    field: 'f3',
    clue: 'MV: www/data/*.json e js/rpg_core.js. MZ: data/*.json e js/rmmz_core.js. XP, VX, VX Ace: un archivio Game.rgss3a (o .rgssad) e un Game.ini.',
    games: 'To the Moon (XP), Yume Nikki (2003) e tantissimi giochi indie e doujin su itch.io e DLsite.',
    where: 'MV e MZ: testo in chiaro nei JSON (Map001.json, CommonEvents.json, Items.json, System.json…). XP, VX e VX Ace: dati Ruby serializzati dentro l’archivio, da estrarre prima.',
    steps: [
      'Fai una copia del gioco e lavora sempre sulla copia.',
      'MV e MZ: apri il gioco con Translator++, oppure lavora direttamente sui JSON con uno script che estrae solo i campi di testo (codici evento 401, 102, 402 e campi name e description dei database).',
      'XP, VX, VX Ace: estrai l’archivio (Translator++ lo fa per te, o rvpacker) e lavora sui dati estratti.',
      'Proteggi i codici di controllo: \\N[1] è il nome dell’eroe, \\C[2] cambia colore, \\V[3] stampa una variabile, \\! e \\| sono pause.',
      'Controlla la larghezza delle finestre: il box messaggi ha circa 4 righe e la lunghezza dipende dal font.',
      'Distribuisci i JSON modificati (o una patch xdelta) indicando la versione del gioco.',
    ],
    code: {
      lang: 'json',
      text: `// www/data/Map001.json (estratto)
{ "code": 101, "parameters": ["Actor1", 0, 0, 2] },
{ "code": 401, "parameters": ["\\\\C[2]\\\\N[1]\\\\C[0], you finally woke up!"] },
{ "code": 401, "parameters": ["The village needs \\\\V[3] potions."] }

// dopo la traduzione
{ "code": 401, "parameters": ["\\\\C[2]\\\\N[1]\\\\C[0], finalmente ti sei svegliato!"] },
{ "code": 401, "parameters": ["Al villaggio servono \\\\V[3] pozioni."] }`,
    },
    tools: ['translatorpp', 'mvdec', 'dazed', 'ainiee'],
    pitfalls: [
      'Plugin JavaScript che disegnano testo proprio: le stringhe possono stare in js/plugins.js o dentro i plugin.',
      'Switch e variabili a volte confrontano stringhe: se traduci una parola usata come chiave, rompi la logica.',
      'Nomi di file, immagini e suoni non vanno mai tradotti, anche se sembrano testo.',
    ],
    links: [
      { label: 'Translator++', url: 'https://dreamsavior.net' },
      { label: 'Video: tradurre un gioco RPG Maker', url: 'https://www.youtube.com/watch?v=X66enj9-xJM' },
    ],
  },
  {
    id: 'unity',
    name: 'Unity',
    level: 'Medio',
    field: 'f1',
    clue: 'Cartella <Gioco>_Data/ e UnityPlayer.dll. Se c’è GameAssembly.dll è IL2CPP, se c’è <Gioco>_Data/Managed/Assembly-CSharp.dll è Mono.',
    games: 'Hollow Knight, Cuphead, Cult of the Lamb e moltissimi indie e gacha.',
    where: 'Dipende dal gioco: TextAsset dentro resources.assets o nei bundle, tabelle del pacchetto Unity Localization, asset I2 Localization (I2Languages), file JSON o CSV in StreamingAssets, oppure stringhe dentro il codice.',
    steps: [
      'Cerca prima in StreamingAssets: se trovi CSV o JSON con le lingue, hai vinto.',
      'Altrimenti apri il gioco con AssetRipper o UABEA e cerca una frase che vedi a schermo.',
      'Se le lingue sono in una tabella (I2 o Unity Localization), puoi spesso sostituire una lingua esistente o aggiungere una colonna.',
      'Strada alternativa: XUnity.AutoTranslator con la traduzione automatica spenta, e i tuoi file di traduzione corretti a mano.',
      'Controlla i font TextMeshPro: un atlas SDF senza accentate mostra quadratini. Rigeneralo con i caratteri italiani o forza un altro font con XUnity.',
      'Reimporta con UABEA o con uno script UnityPy e prova in gioco ogni schermata.',
    ],
    code: {
      lang: 'ini',
      text: `; BepInEx/config/AutoTranslatorConfig.ini (estratto)
[Service]
Endpoint=

[General]
Language=it
FromLanguage=en

[Behaviour]
OverrideFontTextMeshPro=arialuni_sdf_u2019

; con Endpoint vuoto il plugin usa solo i tuoi file:
; BepInEx/Translation/it/Text/_AutoGeneratedTranslations.txt
; Press any key=Premi un tasto qualsiasi`,
    },
    tools: ['xunity', 'uabea', 'unitypy', 'assetripper', 'unityexplorer', 'il2cpp'],
    pitfalls: [
      'IL2CPP: per leggere i MonoBehaviour servono i tipi ricostruiti con Il2CppDumper o Cpp2IL.',
      'Testo nelle texture (titolo, cartelli, tutorial disegnati): va ridisegnato in un editor di immagini.',
      'Ogni patch del gioco può cambiare i path ID degli asset: uno script UnityPy si rilancia, una modifica fatta a mano no.',
    ],
    links: [
      { label: 'XUnity.AutoTranslator: README', url: 'https://github.com/bbepis/XUnity.AutoTranslator' },
      { label: 'Unity Localization package (lato sviluppatore)', url: 'https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/index.html' },
      { label: 'Video: XUnity con DeepL', url: 'https://www.youtube.com/watch?v=GPVSgd1ulYE' },
    ],
  },
  {
    id: 'unreal',
    name: 'Unreal Engine',
    short: 'unreal',
    level: 'Medio',
    field: 'f4',
    clue: 'Cartella Engine/ e <Gioco>/Content/Paks/ con file .pak (UE5 spesso anche .utoc e .ucas).',
    games: 'Hogwarts Legacy, Palworld, Hellblade, molti indie in UE4 e UE5.',
    where: 'Nelle tabelle di localizzazione Content/Localization/Game/<cultura>/Game.locres, dentro i pak. A volte anche in DataTable e asset .uasset.',
    steps: [
      'Apri i pak con FModel. Se chiede la chiave AES, la community del gioco di solito l’ha già pubblicata.',
      'Esporta Game.locres della lingua di partenza (en) e, se c’è, quello di una lingua che il gioco già supporta.',
      'Convertilo in testo, CSV o PO con UE4LocalizationsTool o UnrealLocres e traduci.',
      'Ricompila il .locres. Molti giochi caricano solo le lingue già previste: spesso la via pratica è sostituire una lingua esistente.',
      'Crea un pak di patch con repak (o retoc per IoStore) con lo stesso percorso interno, chiamalo …_P.pak e mettilo in Paks/ o Paks/~mods/.',
      'Avvia il gioco e controlla che i testi cambino. Se non cambia nulla, controlla percorso interno e versione del pak.',
    ],
    code: {
      lang: 'shell',
      text: `# struttura del pak di patch
Traduzione_P/
  Gioco/Content/Localization/Game/en/Game.locres

# crea il pak (esempio: versione e mount point devono essere quelli del gioco)
repak pack --version V11 Traduzione_P pakchunk99-Traduzione_P.pak

# copialo accanto ai pak originali
cp pakchunk99-Traduzione_P.pak "Gioco/Content/Paks/~mods/"`,
    },
    tools: ['fmodel', 'locres', 'repak'],
    pitfalls: [
      'Pak firmati o con anti-cheat: alcuni giochi rifiutano pak modificati. Nei giochi online non farlo.',
      'Testo nei widget UMG con dimensioni fisse: l’italiano esce dai bottoni.',
      'Font: i font compositi di Unreal vanno estesi se mancano i glifi.',
    ],
    links: [
      { label: 'Localizzazione in Unreal (documentazione Epic)', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/localization-overview-for-unreal-engine' },
      { label: 'Video: come usare FModel', url: 'https://www.youtube.com/watch?v=g5LxpL2bkfk' },
      { label: 'Video: Localization Dashboard', url: 'https://www.youtube.com/watch?v=uyxUp6-WQmo' },
    ],
  },
  {
    id: 'godot',
    name: 'Godot',
    level: 'Medio',
    field: 'f5',
    clue: 'Un file .pck accanto all’eseguibile, oppure un exe grande con il pck incorporato. Spesso un file .pck con lo stesso nome del gioco.',
    games: 'Brotato, Dome Keeper, Cassette Beasts, Buckshot Roulette.',
    where: 'File CSV di traduzione (importati come .translation) o file gettext .po, registrati nelle impostazioni del progetto. Godot supporta i .po in modo nativo.',
    steps: [
      'Apri il gioco con GDRE Tools e recupera il progetto o almeno i file di traduzione.',
      'Se il gioco usa i CSV, aggiungi una colonna it. Se usa i .po, crea it.po dal template .pot.',
      'Se il gioco non è stato preparato per le traduzioni (testi scritti nelle scene), devi modificare le scene: è molto più lavoro.',
      'Ricrea il pck o, se il gioco lo prevede, carica un pck di mod.',
      'Verifica i font: i DynamicFont reggono le accentate se il file TTF le ha.',
    ],
    code: {
      lang: 'po',
      text: `# it.po
msgctxt "menu"
msgid "New Game"
msgstr "Nuova partita"

msgid "You have %d coins"
msgid_plural "You have %d coins"
msgstr[0] "Hai %d moneta"
msgstr[1] "Hai %d monete"`,
    },
    tools: ['gdre', 'omegat', 'ttk'],
    pitfalls: [
      'pck cifrati: senza chiave non si apre nulla.',
      'Versioni diverse di Godot (3 e 4) hanno formati diversi: usa la build di GDRE giusta.',
    ],
    links: [
      { label: 'Internazionalizzare un gioco Godot (documentazione)', url: 'https://docs.godotengine.org/en/stable/tutorials/i18n/internationalizing_games.html' },
      { label: 'GDRE Tools', url: 'https://github.com/GDRETools/gdsdecomp' },
    ],
  },
  {
    id: 'gamemaker',
    name: 'GameMaker',
    level: 'Medio',
    field: 'f2',
    clue: 'Un file data.win (Windows) o game.unx o game.ios accanto all’eseguibile, spesso con options.ini.',
    games: 'Undertale, Deltarune, Hyper Light Drifter, Katana ZERO.',
    where: 'Nella tabella delle stringhe dentro data.win, o in file esterni (JSON, testo) se lo sviluppatore li ha previsti, come lang_en.json in Deltarune.',
    steps: [
      'Apri data.win con UndertaleModTool.',
      'Cerca se esistono file di lingua esterni: tradurre quelli è molto più sicuro.',
      'Altrimenti esporta le stringhe con gli script di UTMT, traduci e reimporta.',
      'Aggiungi i glifi accentati ai font: sono sprite, quindi vanno disegnati o generati con lo stesso stile.',
      'Distribuisci una patch xdelta del data.win, non il file intero.',
    ],
    code: null,
    tools: ['utmt', 'patchers'],
    pitfalls: [
      'Stringhe usate come chiavi nel codice: se le traduci, rompi la logica.',
      'Testo a larghezza fissa nei box: spesso devi spezzare le righe a mano.',
    ],
    links: [{ label: 'UndertaleModTool', url: 'https://github.com/UnderminersTeam/UndertaleModTool' }],
  },
  {
    id: 'vn',
    name: 'Visual novel giapponesi',
    short: 'visual novel',
    level: 'Difficile',
    field: 'f3',
    clue: 'Archivi .xp3 (KiriKiri), .pck o Scene.pck (Siglus), .nsa (NScripter), .arc, .dat proprietari.',
    games: 'Fate/stay night, Clannad, la maggior parte delle VN non pubblicate in occidente.',
    where: 'Script compilati o cifrati negli archivi, quasi sempre in Shift-JIS, una codifica che non ha le lettere accentate italiane.',
    steps: [
      'Identifica il motore (GARbro te lo dice spesso aprendo l’archivio).',
      'Estrai gli script con GARbro o lo strumento specifico del motore.',
      'Usa VNTextPatch per esportarli in Excel o JSON, se il motore è supportato.',
      'Traduci (molti progetti italiani partono dalla traduzione inglese esistente: dichiaralo).',
      'Risolvi la codifica: con VNTextProxy le lettere non presenti in Shift-JIS passano tramite caratteri sostitutivi.',
      'Reinserisci, reimpacchetta e testa tutta la storia, ramo per ramo.',
    ],
    code: null,
    tools: ['garbro', 'vntt', 'luna', 'galtransl'],
    pitfalls: [
      'Il volume è enorme: una VN media supera il milione di caratteri giapponesi.',
      'Testo nelle CG e nei menu disegnati.',
      'Spesso serve modificare il codice per l’a capo automatico: il giapponese non usa spazi.',
    ],
    links: [
      { label: 'VNTranslationTools', url: 'https://github.com/arcusmaximus/VNTranslationTools' },
      { label: 'Fuwanovel, community VN', url: 'https://fuwanovel.moe' },
    ],
  },
  {
    id: 'rom',
    name: 'Retro e ROM',
    level: 'Esperto',
    field: 'f4',
    clue: 'Una ROM (.sfc, .nes, .gba, .nds) o un’immagine disco (.iso, .bin/.cue) dumpata dalla tua console.',
    games: 'Mother 3, Tales of Phantasia (SNES), tutti i giochi mai usciti in Europa.',
    where: 'Byte grezzi nella ROM, con una codifica propria del gioco, puntatori che dicono dove inizia ogni frase, spesso compressione (DTE, MTE) e un font a tile.',
    steps: [
      'Trova la codifica: cerca una frase nota con una ricerca relativa e scrivi una tabella .tbl (byte e carattere).',
      'Trova i puntatori e la fine di ogni stringa.',
      'Estrai lo script in testo con la tabella, traducilo e reinseriscilo con uno script (armips o un tool tuo).',
      'Ridisegna il font con le accentate e, se lo spazio non basta, implementa un font a larghezza variabile o espandi la ROM.',
      'Pubblica una patch IPS, BPS o xdelta, mai la ROM.',
    ],
    code: {
      lang: 'tbl',
      text: `; tabella .tbl di esempio
80=A
81=B
9A=a
9B=b
F0=à
F1=è
FE=[LINE]
FF=[END]`,
    },
    tools: ['imhex', 'armips', 'ghidra', 'kuriimu', 'patchers'],
    pitfalls: [
      'Lo spazio nella ROM è fisso: l’italiano è più lungo dell’inglese e molto più lungo del giapponese.',
      'Codice assembly per far funzionare i nuovi caratteri.',
      'Romhacking.net è in sola lettura dal 2024: archivio e strumenti stanno su Internet Archive.',
    ],
    links: [
      { label: 'Data Crystal, wiki di ROM hacking', url: 'https://datacrystal.tcrf.net/wiki/Main_Page' },
      { label: 'Archivio di Romhacking.net', url: 'https://archive.org/details/romhacking.net-20240801' },
      { label: 'Video: ROM hacking per una fan translation (DS)', url: 'https://www.youtube.com/watch?v=CHE03KiiQ7k' },
    ],
  },
  {
    id: 'moddable',
    name: 'Giochi nati per le mod',
    short: 'giochi moddabili',
    level: 'Facile',
    field: 'f5',
    clue: 'Una cartella localisation/ o lang/, file .yml, .json o .properties per lingua, Steam Workshop attivo.',
    games: 'Crusader Kings 3 e i giochi Paradox, Stardew Valley, Skyrim e Fallout, Minecraft, Mindustry.',
    where: 'In file di testo pensati per essere tradotti: Paradox usa localisation/<lingua>/*_l_<lingua>.yml, Stardew i file i18n delle mod, Bethesda i file .STRINGS dei plugin.',
    steps: [
      'Copia i file della lingua di partenza nella struttura che il gioco si aspetta.',
      'Se l’italiano non è previsto (succede nei giochi Paradox), la mod sostituisce l’inglese: per questo le traduzioni italiane di CK3 e Victoria 3 sono mod.',
      'Traduci rispettando chiavi, variabili ($NAME$, [Character.GetName]) e la codifica (i .yml di Paradox vogliono UTF-8 con BOM).',
      'Pubblica sul Workshop o su Nexus Mods e aggiorna a ogni patch del gioco.',
    ],
    code: {
      lang: 'yaml',
      text: `l_english:
 decision_feast_title:0 "Organizza un banchetto"
 decision_feast_desc:0 "[ROOT.Char.GetFirstName] invita i vassalli a corte."`,
    },
    tools: ['smapi', 'omegat', 'weblate'],
    pitfalls: [
      'Ogni aggiornamento aggiunge e cambia chiavi: tieni i file in Git per vedere cosa è cambiato.',
      'Bethesda: xTranslator (su Nexus Mods) è lo standard per i plugin .esp/.esm.',
    ],
    links: [
      { label: 'Wiki di Stardew: tradurre le mod', url: 'https://stardewvalleywiki.com/Modding:Translations' },
      { label: 'Paradox: localisation (wiki EU4)', url: 'https://eu4.paradoxwikis.com/Localisation' },
    ],
  },
]

// Indizi per il riconoscitore: file che vedi nella cartella del gioco.
export const clues = [
  { id: 'data_folder', label: '<Gioco>_Data/', engine: 'unity' },
  { id: 'unityplayer', label: 'UnityPlayer.dll', engine: 'unity' },
  { id: 'gameassembly', label: 'GameAssembly.dll', engine: 'unity', note: 'Unity IL2CPP: servono Il2CppDumper o Cpp2IL per le patch al codice.' },
  { id: 'paks', label: 'Content/Paks/*.pak', engine: 'unreal' },
  { id: 'utoc', label: '.utoc e .ucas', engine: 'unreal', note: 'IoStore di UE5: per reimpacchettare usa retoc.' },
  { id: 'rpa', label: 'game/*.rpa o *.rpyc', engine: 'renpy' },
  { id: 'wwwdata', label: 'www/data/*.json', engine: 'rpgmaker', note: 'RPG Maker MV.' },
  { id: 'rmmz', label: 'js/rmmz_core.js', engine: 'rpgmaker', note: 'RPG Maker MZ.' },
  { id: 'rgss', label: 'Game.rgss3a', engine: 'rpgmaker', note: 'RPG Maker VX Ace: archivio da estrarre prima.' },
  { id: 'pck', label: 'un file .pck', engine: 'godot' },
  { id: 'datawin', label: 'data.win', engine: 'gamemaker' },
  { id: 'xp3', label: '.xp3 o Scene.pck', engine: 'vn' },
  { id: 'localisation', label: 'localisation/ o lang/', engine: 'moddable' },
  { id: 'rom', label: '.sfc .gba .nds .iso', engine: 'rom' },
]

export const engineById = Object.fromEntries(engines.map((e) => [e.id, e]))
