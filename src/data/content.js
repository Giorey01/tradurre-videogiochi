// Testi lunghi della guida: mestiere, ostacoli, percorso, FAQ, glossario, fonti.

export const ways = [
  {
    id: 'overlay',
    name: 'Leggere lo schermo',
    body: 'Un programma guarda i pixel, riconosce il testo con l’OCR e ti mostra la traduzione sopra il gioco. Funziona ovunque, anche su un emulatore, ma è automatica e resta sul tuo PC.',
    tools: 'Translumo, LunaTranslator in modalità OCR, RSTGameTranslation',
  },
  {
    id: 'hook',
    name: 'Agganciare il processo',
    body: 'Il programma si inserisce nel gioco e cattura il testo mentre passa dalle funzioni che lo disegnano. È più preciso dell’OCR, ma devi comunque tradurre al volo.',
    tools: 'LunaTranslator con LunaHook, Textractor',
  },
  {
    id: 'runtime',
    name: 'Sostituire a runtime',
    body: 'Un plugin caricato dal gioco sostituisce ogni stringa con quella che trova nei tuoi file. Se i file li scrivi o li correggi tu, è una traduzione vera e si distribuisce come una mod.',
    tools: 'XUnity.AutoTranslator con BepInEx o MelonLoader',
  },
  {
    id: 'patch',
    name: 'Riscrivere i file',
    body: 'Estrai il testo dagli archivi, lo traduci in un CAT e lo reinserisci. Poi pubblichi una patch con le sole differenze. È la strada delle fan translation storiche e quella che ti fa crescere di più.',
    tools: 'Translator++, UABEA, FModel, UndertaleModTool, GARbro, ImHex',
  },
]

export const craft = [
  {
    title: 'Localizzare, non solo tradurre',
    body: 'Un gioco tradotto parola per parola funziona, ma non si sente scritto in italiano. Localizzare vuol dire adattare battute, giochi di parole, nomi parlanti, unità di misura, riferimenti culturali e tono. Se un personaggio parla in dialetto inglese, chiediti come lo farebbe sentire un autore italiano, senza trasformarlo in una macchietta.',
  },
  {
    title: 'Il contesto prima di tutto',
    body: 'Le stringhe arrivano spesso fuori ordine e senza contesto. “Open” è un verbo su un bottone (Apri) o un aggettivo su un forziere (Aperto)? “Fire” è fuoco o spara? Gioca prima di tradurre, tieni screenshot accanto al file e quando puoi chiedi allo sviluppatore. Una stringa tradotta senza contesto è un bug in attesa.',
  },
  {
    title: 'Glossario e guida di stile',
    body: 'Prima di tradurre decidi i termini fissi: oggetti, abilità, luoghi, statistiche (HP diventa PS o PV?). Poi una guida di stile: tu o voi verso il giocatore, maiuscole nei nomi di oggetti, virgolette, come si rendono le parolacce. Un glossario di 200 voci salva una traduzione da 100.000 parole.',
  },
  {
    title: 'Variabili, tag e codici',
    body: 'Tutto quello che il motore sostituisce o interpreta resta identico: {0}, %s, %d, [player], \\N[1], <color=red>, {i}, \\n. Puoi spostarli dentro la frase, ma non cambiarli né cancellarli. Un tag rotto può bloccare il gioco.',
  },
  {
    title: 'Genere, numero e frasi composte',
    body: 'Il codice spesso costruisce frasi a pezzi: “You found ” + item + “!”. In inglese funziona sempre, in italiano no: “Hai trovato una spada” ma “un arco”. Soluzioni: frasi neutre (“Ottenuto: Spada”), articoli dentro i nomi degli oggetti, o una patch al codice. Lo stesso vale per il genere del protagonista scelto dal giocatore.',
  },
  {
    title: 'Lo spazio è un vincolo',
    body: 'L’italiano è in media più lungo dell’inglese, spesso tra il 15 e il 30% (le stime cambiano molto tra un testo e l’altro). Bottoni, box di dialogo e righe di HUD hanno larghezze fisse. Impara a tradurre corto: sinonimi brevi, imperativi al posto di frasi intere (Salva, non Salva la partita), abbreviazioni coerenti solo dove servono.',
  },
  {
    title: 'Tipografia italiana',
    body: 'Usa l’apostrofo tipografico (’), i puntini come carattere singolo (…), le virgolette basse o alte secondo la guida di stile. Attenzione a È maiuscola (non E’) e a perché, poiché, né, sé con l’accento acuto. Molti font di gioco non hanno È: controlla prima di decidere.',
  },
  {
    title: 'La revisione è metà del lavoro',
    body: 'Una traduzione non è finita finché non la vedi in gioco. Il controllo di qualità (LQA) cerca testo che esce dai box, stringhe non tradotte, glifi mancanti, frasi incoerenti tra loro. Rileggi ad alta voce i dialoghi: se suonano strani detti da una persona, sono strani.',
  },
]

export const obstacles = [
  { title: 'Archivi cifrati', body: 'Pak di Unreal con chiave AES, pck di Godot cifrati, archivi proprietari. Senza chiave o senza tool non si entra: prima di iniziare, controlla che la community del gioco abbia già aperto gli archivi.' },
  { title: 'Testo nel codice', body: 'Stringhe scritte direttamente nel codice (soprattutto in Unity IL2CPP e nei giochi nativi). Si traducono solo con un plugin runtime (XUnity) o con una patch al codice.' },
  { title: 'Font senza accentate', body: 'È il problema numero uno per l’italiano. Atlas TextMeshPro, font bitmap di GameMaker, Shift-JIS nelle VN: à, è, ì, ò, ù diventano quadratini o spariscono. Devi rigenerare o ridisegnare il font.' },
  { title: 'Testo che non ci sta', body: 'Box di dialogo a righe fisse, bottoni stretti, HUD. A volte serve accorciare, a volte allargare l’interfaccia con una patch.' },
  { title: 'Testo nelle immagini', body: 'Titoli, cartelli, mappe, tutorial disegnati. Richiedono un editor di immagini e un po’ di occhio grafico per rifare il lettering.' },
  { title: 'Aggiornamenti del gioco', body: 'Ogni patch dello sviluppatore può cambiare stringhe, ID o formato e rompere la tua traduzione. Tieni tutto in Git e automatizza estrazione e reinserimento, così rifai il lavoro con un comando.' },
  { title: 'Anti-cheat e online', body: 'Nei giochi con Easy Anti-Cheat, BattlEye o simili, modificare file o iniettare plugin può portare al ban dell’account. Le traduzioni non ufficiali hanno senso solo su giochi offline o con supporto alle mod.' },
  { title: 'Diritto d’autore', body: 'Per la legge italiana (L. 633/1941, art. 18) il diritto di tradurre un’opera spetta all’autore: una traduzione non autorizzata è tollerata, non garantita. Riduci il rischio così: chiedi il permesso, pubblica solo patch senza file del gioco, non chiedere soldi, togli tutto se te lo chiedono. Questo non è un parere legale.' },
  { title: 'Volume e motivazione', body: 'Un indie piccolo ha 5–20.000 parole, un RPG medio centinaia di migliaia, una visual novel anche più di un milione di caratteri. Molti progetti amatoriali muoiono a metà. Inizia piccolo e finisci.' },
  { title: 'Traduzione automatica', body: 'Una traduzione automatica non rivista (MTL) sbaglia contesto e genere, inventa termini diversi per la stessa cosa e a volte rompe i tag. Usala come bozza o per capire il testo, mai come prodotto finale senza revisione.' },
]

export const path = [
  { title: 'Gioca con un traduttore live', body: 'Installa Translumo o LunaTranslator e prova un gioco in una lingua che non conosci. Vedrai subito dove sbaglia la macchina: contesto, nomi, battute. È la tua prima lezione di traduzione.', goal: 'Capire perché serve un traduttore umano.' },
  { title: 'Impara i formati di testo', body: 'JSON, CSV, PO, YAML, INI. Aprili con un editor come VS Code, impara cosa sono codifica (UTF-8, Shift-JIS), escape (\\n, \\") e qualche espressione regolare per trovare tutti i tag.', goal: 'Aprire un file di un gioco senza paura di romperlo.' },
  { title: 'Primo progetto: un indie piccolo', body: 'Scegli un gioco Ren’Py o RPG Maker MV corto, con testo in chiaro e uno sviluppatore che puoi contattare su itch.io. Oppure un gioco open source che accetta traduzioni: Mindustry ha un file bundle_it.properties su GitHub, Wesnoth usa file .po.', goal: 'Una traduzione completa, anche di 3.000 parole.' },
  { title: 'Glossario e guida di stile', body: 'Prima di tradurre la prima riga, raccogli in un foglio i termini ricorrenti e decidi le regole: tu o voi, maiuscole, abbreviazioni. Aggiornalo mentre lavori.', goal: 'Una traduzione coerente dall’inizio alla fine.' },
  { title: 'Lavora in un CAT', body: 'Converti il testo in PO (con translate-toolkit) e traducilo in OmegaT. La memoria di traduzione ti ricorda frasi già fatte, il glossario ti suggerisce i termini e i controlli trovano i tag rotti.', goal: 'Smettere di tradurre dentro i file grezzi.' },
  { title: 'Reinserisci e testa', body: 'Rimetti il testo nel gioco e giocalo tutto. Fai screenshot di ogni problema: testo che esce dai box, glifi mancanti, frasi senza senso nel contesto.', goal: 'Una lista di bug sistemati, non solo una lista di stringhe.' },
  { title: 'Pubblica una patch', body: 'Prepara una patch con le sole differenze, un README con versione del gioco, istruzioni e crediti. Pubblicala dove sta la community del gioco: itch.io, Nexus Mods, Steam Workshop, GitHub.', goal: 'Il tuo primo lavoro pubblico.' },
  { title: 'Sali di motore: Unity e Unreal', body: 'Prova un gioco Unity con XUnity in modalità solo-file, poi uno con UABEA o UnityPy. Poi un gioco Unreal con FModel e un pak di patch.', goal: 'Saper trovare il testo in un gioco che non conosci.' },
  { title: 'Entra in una community', body: 'Unisciti a un gruppo di traduzione, fai revisione per altri, partecipa a una LocJAM. Leggere le correzioni degli altri è il modo più veloce di migliorare.', goal: 'Feedback vero sul tuo italiano.' },
  { title: 'Livello avanzato', body: 'ROM hacking, reverse engineering, font a larghezza variabile, patch al codice per genere e plurali. Arrivaci quando un progetto te lo chiede, non prima.', goal: 'Tradurre giochi che nessun tool apre.' },
]

export const faqs = [
  {
    q: 'Mi conviene scrivere un programma tutto mio?',
    a: 'Non un programma generico all’inizio: Translator++, XUnity, UABEA e OmegaT coprono la maggior parte dei casi. Conviene invece scrivere piccoli script per il singolo gioco (estrai, converti in PO, reinserisci, controlla), perché li rilanci a ogni aggiornamento. Un tool tuo e generale ha senso quando traduci molti giochi dello stesso motore o quando il motore non ha strumenti.',
  },
  {
    q: 'Serve sapere programmare?',
    a: 'Per Ren’Py, RPG Maker e giochi pensati per le mod no. Per Unity e Unreal aiuta saper leggere un po’ di codice. Per ROM e motori proprietari sì. Python è la scelta più utile: ha librerie per Unity (UnityPy), per i PO (polib) e per quasi tutti i formati.',
  },
  {
    q: 'Posso usare ChatGPT, Claude o DeepL?',
    a: 'Come assistente sì: bozze, sinonimi corti, controllo di coerenza, spiegazione di un modo di dire. Come traduttore unico no: sbaglia il contesto, cambia i termini tra una scena e l’altra e a volte tocca i tag. Se lo usi, dagli glossario e contesto, rivedi tutto e dichiaralo nei crediti.',
  },
  {
    q: 'È legale?',
    a: 'È un’area grigia. La traduzione è un diritto dell’autore, quindi senza permesso sei tollerato, non autorizzato. Riduci il rischio chiedendo il permesso, pubblicando solo patch senza file del gioco, senza farti pagare e togliendo tutto se te lo chiedono. Questo non è un parere legale.',
  },
  {
    q: 'Gli sviluppatori indie accettano traduzioni?',
    a: 'Spesso sì, e volentieri: per un indie l’italiano può valere migliaia di copie. Scrivi in modo concreto: chi sei, un campione di traduzione, cosa ti serve (i file di testo, un font con le accentate). Alcuni ti daranno i file sorgente, altri inseriranno la tua traduzione nel gioco ufficiale. È la strada migliore.',
  },
  {
    q: 'Posso tradurre giochi su console?',
    a: 'Solo partendo da un dump del gioco fatto con una console tua, e con strumenti come Kuriimu2 o Switch Toolbox. È tecnicamente più duro e legalmente più delicato. Inizia dal PC.',
  },
  {
    q: 'Quanto tempo ci vuole?',
    a: 'Un traduttore professionista fa circa 2.000–3.000 parole al giorno di traduzione, più la revisione. Un amatore all’inizio la metà. Un indie da 10.000 parole è un progetto da qualche settimana di sere, test compresi.',
  },
  {
    q: 'Posso trasformarlo in un lavoro?',
    a: 'Sì: la localizzazione di videogiochi è un mestiere vero, con agenzie, tester LQA e traduttori freelance. Un portfolio di fan translation finite e ben fatte aiuta molto, insieme a una buona conoscenza dei CAT (memoQ, Trados) e delle piattaforme (Crowdin).',
  },
]

export const glossary = [
  { word: 'L10n', caption: 'localizzazione', def: 'Adattare un gioco a una lingua e a una cultura (L, dieci lettere, n).' },
  { word: 'i18n', caption: 'internazionalizzazione', def: 'Preparare il codice per accettare più lingue. Se manca, tradurre è molto più difficile.' },
  { word: 'CAT', caption: 'traduzione assistita', def: 'Programma che divide il testo in segmenti, ricorda ciò che hai tradotto e controlla la qualità.' },
  { word: 'TM', caption: 'memoria', def: 'Archivio di coppie frase originale e traduzione, riusato automaticamente.' },
  { word: 'LQA', caption: 'controllo qualità', def: 'Test della traduzione dentro il gioco: overflow, glifi, contesto, coerenza.' },
  { word: 'MTL', caption: 'traduzione automatica', def: 'Machine translation non rivista. Spesso usato in senso dispregiativo.' },
  { word: 'Hook', caption: 'aggancio', def: 'Inserirsi in un processo per catturare o cambiare ciò che fa, ad esempio il testo che disegna.' },
  { word: 'OCR', caption: 'lettura ottica', def: 'Riconoscere il testo da un’immagine dello schermo.' },
  { word: '.po', caption: 'gettext', def: 'Formato di testo standard per le traduzioni, con contesto, note e plurali. Lo leggono tutti i CAT.' },
  { word: 'locres', caption: 'Unreal', def: 'Tabella binaria delle stringhe localizzate di Unreal Engine.' },
  { word: 'Glifo', caption: 'font', def: 'Il disegno di un carattere nel font. Se manca il glifo di è, vedi un quadratino.' },
  { word: '.tbl', caption: 'ROM', def: 'Tabella che associa i byte del gioco ai caratteri, usata nel ROM hacking.' },
  { word: 'VWF', caption: 'larghezza variabile', def: 'Font in cui ogni lettera occupa la sua larghezza: fa entrare più testo in una riga.' },
  { word: 'Patch', caption: 'differenze', def: 'File che contiene solo le modifiche: si applica all’originale senza distribuirlo.' },
  { word: 'Overflow', caption: 'fuori dal box', def: 'Testo che esce dal suo spazio. Il bug più comune delle traduzioni italiane.' },
]

export const communities = [
  { name: 'TWR Traduzioni', where: 'Discord · italiano', what: 'Gruppo italiano di traduzioni amatoriali per PC: Crusader Kings 3, Victoria 3, Sea of Stars, Going Medieval e altri.', url: 'https://discord.com/servers/twr-traduzioni-409048447468175370' },
  { name: 'Morrowind Italian Translation Project', where: 'Intervista · italiano', what: 'Come si organizza e si porta a termine un grande progetto di squadra, raccontato dal coordinatore.', url: 'https://multiplayer.it/articoli/morrowind-italian-translation-project-intervista.html' },
  { name: 'Il caso TWEWY', where: 'Multiplayer.it · italiano', what: 'Quando la localizzazione ufficiale per Switch somiglia a una traduzione amatoriale DS: utile per capire il rapporto fra fan e publisher.', url: 'https://multiplayer.it/articoli/the-world-ends-with-you-traduzione-italiana-nintendo-switch.html' },
  { name: 'Romhack Plaza', where: 'Web · inglese', what: 'Uno dei posti dove la scena ROM hacking pubblica oggi patch e traduzioni dopo la chiusura delle submission su Romhacking.net.', url: 'https://www.romhackplaza.org' },
  { name: 'Archivio Romhacking.net', where: 'Internet Archive', what: 'Vent’anni di patch, documenti e strumenti, salvati quando il sito è passato in sola lettura nel 2024.', url: 'https://archive.org/details/romhacking.net-20240801' },
  { name: 'Data Crystal', where: 'Wiki · inglese', what: 'Mappe delle ROM, tabelle dei caratteri, note tecniche e lista delle traduzioni per gioco.', url: 'https://datacrystal.tcrf.net/wiki/Main_Page' },
  { name: 'ResHax', where: 'Forum · inglese', what: 'Erede di XeNTaX e Zenhax: formati di file dei giochi, script di estrazione, reverse engineering.', url: 'https://reshax.com' },
  { name: 'Fuwanovel', where: 'Forum · inglese', what: 'Community storica delle visual novel e delle loro traduzioni amatoriali.', url: 'https://fuwanovel.moe' },
  { name: 'r/romhacking', where: 'Reddit · inglese', what: 'Domande, progressi e aiuto sul ROM hacking e sulle traduzioni retro.', url: 'https://www.reddit.com/r/romhacking/' },
  { name: 'LocJAM', where: 'Gara · multilingua', what: 'Competizione di traduzione di videogiochi nata dalla IGDA Localization SIG, con categoria per amatori e italiano tra le lingue.', url: 'https://www.locjam.org' },
  { name: 'IGDA Localization SIG', where: 'Associazione · inglese', what: 'Il gruppo dei professionisti della localizzazione di giochi: risorse, eventi, best practice.', url: 'https://igda.org/sigs/localization/' },
  { name: 'Hosted Weblate', where: 'Web · multilingua', what: 'Progetti open source, giochi compresi, che cercano traduttori volontari. Ottimo per fare pratica su testo vero.', url: 'https://hosted.weblate.org/projects/' },
]

export const videos = [
  { title: 'Localizing Bungie’s Destiny for the World', who: 'GDC · Tom Slattery', url: 'https://www.youtube.com/watch?v=t6Wwe1_NnOc', tag: 'Mestiere' },
  { title: 'Crowdsourcing the Localization of Gone Home', who: 'GDC · Johnnemann Nordhagen', url: 'https://www.youtube.com/watch?v=3xcyUaJ3IVs', tag: 'Indie' },
  { title: 'Steps for Effective Localization', who: 'GDC', url: 'https://www.youtube.com/watch?v=bSRfeJDEjRs', tag: 'Mestiere' },
  { title: 'Localization Shenanigans in the Chinese Speaking World', who: 'GDC · Jung-Sheng Lin', url: 'https://www.youtube.com/watch?v=1WeZ3X_HZ6U', tag: 'Cultura' },
  { title: 'Game Localization: what is it, how do you get in', who: 'Carriera', url: 'https://www.youtube.com/watch?v=chQLa2IieBQ', tag: 'Carriera' },
  { title: 'How I Hacked Dragon Ball Kai: ROM hacking to fan translate', who: 'Jonko', url: 'https://www.youtube.com/watch?v=CHE03KiiQ7k', tag: 'ROM' },
  { title: 'Creating a Mega Man 2 ROM hack translation (live)', who: 'Bisqwit', url: 'https://www.youtube.com/watch?v=AA0Nc7-cqrs', tag: 'ROM' },
  { title: 'ROM Hacks and Translation Challenges in RPGs', who: 'Bisqwit', url: 'https://www.youtube.com/watch?v=KwpcOYKfXZc', tag: 'ROM' },
  { title: 'Aprendendo Romhacking: tradução de PSP', who: 'Serie in portoghese', url: 'https://www.youtube.com/watch?v=dj3EUORc1Vc', tag: 'ROM' },
  { title: 'Translating RPG Maker Game', who: 'Translator++', url: 'https://www.youtube.com/watch?v=X66enj9-xJM', tag: 'RPG Maker' },
  { title: 'Inject Translation Into Wolf RPG Game', who: 'Translator++', url: 'https://www.youtube.com/watch?v=MaIkQAsylFQ', tag: 'Wolf RPG' },
  { title: 'Translator++: SRPG Studio Games', who: 'Translator++', url: 'https://www.youtube.com/watch?v=Mbbc5mWfC2w', tag: 'SRPG Studio' },
  { title: 'How to use FModel', who: 'Unreal', url: 'https://www.youtube.com/watch?v=g5LxpL2bkfk', tag: 'Unreal' },
  { title: 'UE4: localize a game in 30 minutes, parte 1', who: 'Unreal', url: 'https://www.youtube.com/watch?v=wQ5eu6L17vE', tag: 'Unreal' },
  { title: 'XUnity.AutoTranslator con DeepL', who: 'Unity', url: 'https://www.youtube.com/watch?v=GPVSgd1ulYE', tag: 'Unity' },
]

export const guides = [
  { title: 'Ren’Py: Translation', who: 'Documentazione ufficiale', url: 'https://www.renpy.org/doc/html/translation.html' },
  { title: 'Godot: Internationalizing games', who: 'Documentazione ufficiale', url: 'https://docs.godotengine.org/en/stable/tutorials/i18n/internationalizing_games.html' },
  { title: 'Unreal: Localization overview', who: 'Epic Games', url: 'https://dev.epicgames.com/documentation/en-us/unreal-engine/localization-overview-for-unreal-engine' },
  { title: 'Unity Localization package', who: 'Unity', url: 'https://docs.unity3d.com/Packages/com.unity.localization@1.5/manual/index.html' },
  { title: 'Stardew Valley: Modding/Translations', who: 'Wiki ufficiale', url: 'https://stardewvalleywiki.com/Modding:Translations' },
  { title: 'Paradox: Localisation', who: 'Wiki EU4', url: 'https://eu4.paradoxwikis.com/Localisation' },
  { title: 'Lessons learned from a game translation competition', who: 'MultiLingual, su LocJAM', url: 'https://multilingual.com/articles/lessons-learned-from-a-game-translation-competition/' },
  { title: 'Tutorial: how to create a fan translation', who: 'Thread su itch.io', url: 'https://itch.io/t/899982/tutorial-advice-how-to-create-a-fan-translation' },
  { title: 'Tesi sulla fan translation di videogiochi', who: 'Università di Bologna', url: 'https://amslaurea.unibo.it/8858/1/Pezzuto_Gabriele_tesi.pdf' },
  { title: 'Game Localization (O’Hagan, Mangiron)', who: 'Libro, John Benjamins 2013', url: 'https://benjamins.com/catalog/btl.106' },
  { title: 'The Game Localization Handbook (Chandler, Deming)', who: 'Libro, 2ª edizione 2011', url: 'https://www.google.com/search?q=The+Game+Localization+Handbook+Chandler+Deming' },
]
