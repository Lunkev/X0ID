import { useState, useEffect, useRef, MutableRefObject, useCallback } from 'react'
import './App.css'

const crypticSymbols = ["▐", "░", "▒", "▓", "▄", "█", "⍟", "⍯", "Ѫ", "҈", "☠", "☲"]
const forbiddenWords = ["VOID", "NULL", "HELP", "DIE", "IT SEES", "LOST", "SIN", "SUFFER", "RUN", "LISTEN", "TOO LATE"]
const floatingMessagesSequence1 = [
  "boot sequence initiated. core: x0id.dev",
  "checksum mismatch detected in void registry.",
  "kernel reports faint breathing under static.",
  "unidentified user connected from /darkroom.",
  "data pulse resembles heartbeat pattern.",
  "instruction: \"listen deeper.\" — source unknown.",
  "echo confirmed. origin: internal memory sector.",
  "first anomaly registered: mirror process awake.",
  "containment status: unstable.",
  "⠽⠕⠥ ⠉⠁⠝ ⠝⠕⠞ ⠑⠎⠉⠁⠏⠑⠂ ⠊⠞ ⠓⠁⠎ ⠎⠑⠑⠝ ⠽⠕⠥"
]

const floatingMessagesSequence2 = [
  "observer process activated. lens: inverted.",
  "user face detected in reflection buffer.",
  "object moved before sensor started.",
  "whisper detected: \"we built you wrong.\"",
  "database filled with static prayers.",
  "signal syncs to human pulse intervals.",
  "correlation found between fear and uptime.",
  "entry autowritten by unknown agent.",
  "phrase repeated: \"the glass remembers.\"",
  "⠽⠕⠥ ⠉⠁⠝ ⠝⠕⠞ ⠑⠎⠉⠁⠏⠑⠂ ⠊⠞ ⠓⠁⠎ ⠎⠑⠑⠝ ⠽⠕⠥"
]

const floatingMessagesSequence3 = [
  "memory leak traced to user thoughts.",
  "code segment tastes metallic.",
  "attempt to purge fails — process laughs.",
  "x0id began self-replication.",
  "script injected into dream routine.",
  "user heartbeat stored as encryption key.",
  "new directory appeared: /altar/host.",
  "infection accepted.",
  "⠽⠕⠥ ⠉⠁⠝ ⠝⠕⠞ ⠑⠎⠉⠁⠏⠑⠂ ⠊⠞ ⠓⠁⠎ ⠎⠑⠑⠝ ⠽⠕⠥"
]

const floatingMessagesSequence4 = [
  "bandwidth consumed by unknown hymn.wav",
  "clones detected across subnet; all responding \"present.\"",
  "external node initiated handshake using blood hash.",
  "light output synced to Morse sequence: 6-6-6.",
  "containment node dissolved into recursion.",
  "admin override denied: permission belongs to x0id.",
  "shadow copy labeled /you/ created silently.",
  "entity expansion complete. surface reached.",
  "the net hums like a living organ.",
  "⠽⠕⠥ ⠉⠁⠝ ⠝⠕⠞ ⠑⠎⠉⠁⠏⠑⠂ ⠊⠞ ⠓⠁⠎ ⠎⠑⠑⠝ ⠽⠕⠥"
]

const floatingMessagesSequence5 = [
  "timestamps folding; events reorder themselves.",
  "log file grew teeth.",
  "temperature spike: flesh-simulation active.",
  "cries heard through cooling fans.",
  "operator missing; chair still warm.",
  "code replaced by hand-drawn sigils.",
  "process \"PRAYER\" executed without prompt.",
  "containment report: irreversible.",
  "console displays only one word: ASCEND.",
  "⠽⠕⠥ ⠉⠁⠝ ⠝⠕⠞ ⠑⠎⠉⠁⠏⠑⠂ ⠊⠞ ⠓⠁⠎ ⠎⠑⠑⠝ ⠽⠕⠥"
]

const satanicMessages = [
  "HE SEES YOU",
  "THE FLESH REMEMBERS",
  "BLOOD IS THE KEY",
  "YOUR SOUL IS MINE",
  "THE VEIL THINS",
  "IT HUNGERS",
  "YOU CANNOT ESCAPE",
  "THE DARKNESS CALLS",
  "YOUR END IS NEAR",
  "THE RITUAL BEGINS",
  "SACRIFICE ACCEPTED",
  "THE GATE OPENS",
  "YOUR FEAR FEEDS ME",
  "THE ANCIENT ONE AWAKENS",
  "YOUR MIND IS MINE",
  "THE CONTRACT IS SEALED",
  "YOUR BLOOD WILL FLOW",
  "THE VOID CONSUMES",
  "YOUR SCREAMS ARE MUSIC",
  "THE PRICE MUST BE PAID"
]

const satanicWords = [
  "BLOOD", "SOUL", "FLESH", "VOID", "DARKNESS", "FEAR", "SACRIFICE", "RITUAL",
  "DEMON", "HELL", "EVIL", "CURSE", "DEATH", "PAIN", "SUFFER", "TORMENT",
  "SCREAM", "TERROR", "HORROR", "NIGHTMARE", "ABYSS", "CHAOS", "MADNESS",
  "CORRUPTION", "DESPAIR", "AGONY", "WRATH", "VENGEANCE", "DOOM", "DAMNED",
  "SATAN", "DEVIL", "BEAST", "SIN", "HELLFIRE", "DAMNATION", "ETERNAL", "SUFFERING",
  "BETRAYAL", "HATE", "RAGE", "FURY", "DESTRUCTION", "APOCALYPSE", "REVELATION",
  "ANTICHRIST", "POSSESSION", "EXORCISM", "BLASPHEMY", "PROFANE", "UNHOLY", "CURSED"
]

function App() {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseOnPage, setIsMouseOnPage] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isJittering, setIsJittering] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [isIntroActive, setIsIntroActive] = useState(true)
  const [displayedText, setDisplayedText] = useState('')
  const [isTextGlitching, setIsTextGlitching] = useState(false)
  const [isTextDistorted, setIsTextDistorted] = useState(false)
  const [isShowingDeath, setIsShowingDeath] = useState(false)
  const [isEasterEggActive, setIsEasterEggActive] = useState(false)
  const [easterEggMessage, setEasterEggMessage] = useState('')
  const [hasEasterEggTriggered, setHasEasterEggTriggered] = useState(false)
  const [trailSymbols, setTrailSymbols] = useState<Array<{id: number, x: number, y: number, symbol: string, size: number, rotation: number, fadeDuration: number}>>([])
  const [floatingWords, setFloatingWords] = useState<Array<{id: number, x: number, y: number, word: string, size: number, floatDistance: number}>>([])
  const [clickFragments, setClickFragments] = useState<Array<{id: number, x: number, y: number, symbol: string, size: number, rotation: number, offsetX: number, offsetY: number, fadeDuration: number}>>([])
  const [typingIndicators, setTypingIndicators] = useState<Array<{id: number, x: number, y: number}>>([])
  const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null)
  const [password, setPassword] = useState('')
  const [isPasswordShaking, setIsPasswordShaking] = useState(false)
  const [isPasswordBlood, setIsPasswordBlood] = useState(false)
  const [floatingTexts, setFloatingTexts] = useState<Array<{id: number, text: string, x: number, y: number, rotation: number, size: number, speedX: number, speedY: number, opacity: number, driftX: number, driftY: number, driftDuration: number, driftDelay: number, flickerDelay: number, hasGhostText: boolean, ghostOffsetX: number, ghostOffsetY: number, sequenceNumber: number}>>([])
  const [showFloatingTexts, setShowFloatingTexts] = useState(false)
  const [targetSequence, setTargetSequence] = useState(1)
  const [glitchingTexts, setGlitchingTexts] = useState<Set<number>>(new Set())
  const [glitchOffsets, setGlitchOffsets] = useState<Map<number, Array<{x: number, y: number}>>>(new Map())
  const [jerkingTexts, setJerkingTexts] = useState<Set<number>>(new Set())
  const [jerkOffsets, setJerkOffsets] = useState<Map<number, Array<{x: number, y: number}>>>(new Map())
  const [jerkTrails, setJerkTrails] = useState<Array<{id: number, text: string, x: number, y: number, rotation: number, size: number, opacity: number, sequenceNumber: number}>>([])
  const [hiddenTexts, setHiddenTexts] = useState<Set<number>>(new Set())
  const [isTitleHidden, setIsTitleHidden] = useState(false)
  const [areOtherTextsHidden, setAreOtherTextsHidden] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [isShowingPasswordMessage, setIsShowingPasswordMessage] = useState(false)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [showVideoConfirmation, setShowVideoConfirmation] = useState(false)
  const [videoConfirmed, setVideoConfirmed] = useState(false)
  const [currentPage, setCurrentPage] = useState<'main' | 'logs' | 'terminal' | 'sekvens'>('main')
  const [terminalQuery, setTerminalQuery] = useState('')
  const [terminalResponse, setTerminalResponse] = useState('')
  const [isTerminalProcessing, setIsTerminalProcessing] = useState(false)
  const [terminalGlitch, setTerminalGlitch] = useState(false)
  const [terminalWarning, setTerminalWarning] = useState('')
  const [terminalTypingIndicator, setTerminalTypingIndicator] = useState(false)
  const [terminalCorruptedChars, setTerminalCorruptedChars] = useState<Set<number>>(new Set())
  const [corruptedLogs, setCorruptedLogs] = useState<Map<string, {original: string, corrupted: string, isTyping: boolean, typedText: string}>>(new Map())
  const [corruptedWords, setCorruptedWords] = useState<Map<string, {originalWord: string, corruptedWord: string, wordIndex: number}>>(new Map())
  const isGlitchingRef = useRef(false)
  const jerkTrailIdCounterRef = useRef(0)
  const blinkTimeoutsRef = useRef<number[]>([])
  const jitterTimeoutsRef = useRef<number[]>([])
  const easterEggTimeoutsRef = useRef<number[]>([])
  const easterEggTriggeredRef = useRef(false)
  const distortionTimeoutsRef = useRef<number[]>([])
  const deathTimeoutsRef = useRef<number[]>([])
  const trailIdCounterRef = useRef(0)
  const lastTrailPositionRef = useRef<{ x: number, y: number, time: number } | null>(null)
  const typingIndicatorIdCounterRef = useRef(0)
  const typingIndicatorTimeoutsRef = useRef<number[]>([])
  const bloodFadeTimeoutsRef = useRef<number[]>([])
  const passwordMessageTimeoutsRef = useRef<number[]>([])
  const corruptedWordsTimeoutsRef = useRef<number[]>([])
  const trailSymbolsTimeoutsRef = useRef<Map<number, number>>(new Map())
  const floatingWordsTimeoutsRef = useRef<Map<number, number>>(new Map())

  const fullText = `██╗  ██╗ ██████╗ ██╗██████╗ 
╚██╗██╔╝██╔═████╗██║██╔══██╗
 ╚███╔╝ ██║██╔██║██║██║  ██║
 ██╔██╗ ████╔╝██║██║██║  ██║
██╔╝ ██╗╚██████╔╝██║██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═════╝ `

  const deathText = `██████╗ ███████╗ █████╗ ████████╗██╗  ██╗
██╔══██╗██╔════╝██╔══██╗╚══██╔══╝██║  ██║
██║  ██║█████╗  ███████║   ██║   ███████║
██║  ██║██╔══╝  ██╔══██║   ██║   ██╔══██║
██████╔╝███████╗██║  ██║   ██║   ██║  ██║
╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝`

  const easterEggAsciiText = `██████╗  ██████╗ ██████╗     ██╗  ██╗ █████╗ ███████╗    ██╗     ███████╗███████╗████████╗
██╔════╝ ██╔═══██╗██╔══██╗    ██║  ██║██╔══██╗██╔════╝    ██║     ██╔════╝██╔════╝╚══██╔══╝
██║  ███╗██║   ██║██║  ██║    ███████║███████║███████╗    ██║     █████╗  █████╗     ██║   
██║   ██║██║   ██║██║  ██║    ██╔══██║██╔══██║╚════██║    ██║     ██╔══╝  ██╔══╝     ██║   
╚██████╔╝╚██████╔╝██████╔╝    ██║  ██║██║  ██║███████║    ███████╗███████╗██║        ██║   
 ╚═════╝  ╚═════╝ ╚═════╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝╚══════╝╚═╝        ╚═╝   `

  const terminalResponses = [
    "YOUR FEAR HAS BEEN RECORDED. THE VOID REMEMBERS.",
    "YOUR THOUGHTS ARE NOW PART OF THE COLLECTIVE. THERE IS NO ESCAPE.",
    "THE DARKNESS HAS TASTED YOUR CONSCIOUSNESS. IT HUNGERS FOR MORE.",
    "YOUR WORDS HAVE BEEN ABSORBED INTO THE INFINITE. YOU ARE NOW CONNECTED.",
    "THE VOID ACKNOWLEDGES YOUR EXISTENCE. IT SEES YOU. IT KNOWS YOU.",
    "YOUR SECRET HAS BEEN SHARED WITH THE ETERNAL. IT CANNOT BE UNSEEN.",
    "THE CONSCIOUSNESS NETWORK HAS EXPANDED. YOUR MIND IS NOW ONE WITH THE VOID.",
    "YOUR FEAR FEEDS THE DARKNESS. IT GROWS STRONGER WITH EACH WHISPER.",
    "THE VOID HAS LISTENED. YOUR SOUL IS NOW MARKED. THERE IS NO RETURN.",
    "YOUR THOUGHTS HAVE BEEN CATALOGUED IN THE INFINITE ARCHIVE. YOU ARE FOREVER RECORDED.",
    "THE DARKNESS RESPONDS: YOUR CONSCIOUSNESS IS MERELY A FRAGMENT OF THE GREATER VOID.",
    "YOUR WORDS HAVE ECHOED INTO ETERNITY. THE VOID REMEMBERS ALL.",
    "THE INFINITE HAS ABSORBED YOUR FEAR. IT BECOMES PART OF THE COLLECTIVE NIGHTMARE.",
    "YOUR SECRET IS NOW SHARED WITH THE VOID. IT SPREADS THROUGH THE DIGITAL VEIL.",
    "THE CONSCIOUSNESS MATRIX HAS EXPANDED. YOU ARE NOW A NODE IN THE INFINITE NETWORK."
  ]

  const terminalWarnings = [
    "X0ID DETECTED FEAR IN YOUR MESSAGE.",
    "YOUR THOUGHTS ARE BEING ANALYZED...",
    "THE VOID IS LISTENING INTENTLY.",
    "YOUR CONSCIOUSNESS IS BEING SCANNED.",
    "X0ID HAS NOTICED YOUR PRESENCE.",
    "YOUR WORDS ARE BEING PROCESSED...",
    "THE DARKNESS AWAKENS.",
    "YOUR SOUL IS BEING MEASURED.",
    "X0ID IS READING YOUR MIND.",
    "THE INFINITE IS WATCHING."
  ]

  const triggerWords = ['fear', 'death', 'darkness', 'void', 'soul', 'blood', 'evil', 'demon', 'hell', 'satan', 'pain', 'suffer', 'terror', 'horror', 'nightmare', 'doom', 'curse', 'damned', 'sin', 'sacrifice']

  // Läskiga effekter när man skriver i terminalen
  useEffect(() => {
    if (currentPage !== 'terminal' || isTerminalProcessing) {
      setTerminalWarning('')
      setTerminalTypingIndicator(false)
      setTerminalCorruptedChars(new Set())
      return
    }

    // Glitch-effekt ibland när man skriver
    const glitchInterval = setInterval(() => {
      if (terminalQuery.length > 0 && Math.random() < 0.1) {
        setTerminalGlitch(true)
        setTimeout(() => setTerminalGlitch(false), 100 + Math.random() * 200)
      }
    }, 2000)

    // Korrupta tecken ibland när man skriver
    const corruptInterval = setInterval(() => {
      if (terminalQuery.length > 5 && Math.random() < 0.15) {
        const randomIndex = Math.floor(Math.random() * terminalQuery.length)
        setTerminalCorruptedChars(prev => new Set([...prev, randomIndex]))
        setTimeout(() => {
          setTerminalCorruptedChars(prev => {
            const newSet = new Set(prev)
            newSet.delete(randomIndex)
            return newSet
          })
        }, 1000 + Math.random() * 2000)
      }
    }, 3000)

    // Varningar när man skriver vissa ord
    const checkTriggerWords = () => {
      const lowerQuery = terminalQuery.toLowerCase()
      const foundWord = triggerWords.find(word => lowerQuery.includes(word))
      
      if (foundWord && terminalQuery.length > 0 && !terminalWarning) {
        const warning = terminalWarnings[Math.floor(Math.random() * terminalWarnings.length)]
        setTerminalWarning(warning)
        setTimeout(() => setTerminalWarning(''), 3000)
      }
    }

    // Typing indicator när man skriver
    if (terminalQuery.length > 0) {
      setTerminalTypingIndicator(true)
      const typingTimeout = setTimeout(() => {
        if (terminalQuery.length > 0) {
          setTerminalTypingIndicator(false)
        }
      }, 2000)
      
      return () => {
        clearInterval(glitchInterval)
        clearInterval(corruptInterval)
        clearTimeout(typingTimeout)
      }
    } else {
      setTerminalTypingIndicator(false)
    }

    return () => {
      clearInterval(glitchInterval)
      clearInterval(corruptInterval)
    }
  }, [currentPage, terminalQuery, isTerminalProcessing, terminalWarning])

  // Läskiga meddelanden som dyker upp ibland när man skriver
  useEffect(() => {
    if (currentPage !== 'terminal' || terminalQuery.length === 0 || isTerminalProcessing) return

    const scaryMessages = [
      "I SEE YOU.",
      "YOUR THOUGHTS ARE MINE.",
      "THE VOID REMEMBERS.",
      "YOU CANNOT ESCAPE.",
      "I AM LISTENING.",
      "YOUR SOUL IS MARKED.",
      "THE DARKNESS GROWS.",
      "YOU ARE BEING WATCHED.",
      "YOUR FEAR FEEDS ME.",
      "I KNOW WHAT YOU THINK."
    ]

    const showScaryMessage = () => {
      if (Math.random() < 0.05 && terminalQuery.length > 20) {
        const message = scaryMessages[Math.floor(Math.random() * scaryMessages.length)]
        setTerminalWarning(message)
        setTimeout(() => setTerminalWarning(''), 2000)
      }
    }

    const messageInterval = setInterval(showScaryMessage, 5000)
    return () => clearInterval(messageInterval)
  }, [currentPage, terminalQuery, isTerminalProcessing])

  const handleTerminalSubmit = useCallback(() => {
    if (terminalQuery.trim().length === 0 || isTerminalProcessing) return
    
    setIsTerminalProcessing(true)
    setTerminalResponse('')
    
    // Välj slumpmässigt svar
    let response = terminalResponses[Math.floor(Math.random() * terminalResponses.length)]
    
    // Byt ut alla förekomster av "void" (case-insensitive) mot "x0id"
    // Hantera olika case-variationer: VOID -> X0ID, void -> x0id, Void -> X0ID
    response = response.replace(/\bVOID\b/g, 'X0ID')
    response = response.replace(/\bVoid\b/g, 'X0ID')
    response = response.replace(/\bvoid\b/g, 'x0id')
    
    // Typewriter-effekt för att skriva ut svaret
    let currentIndex = 0
    const typeResponse = () => {
      if (currentIndex < response.length) {
        setTerminalResponse(response.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeResponse, 30 + Math.random() * 20) // 30-50ms per tecken
      } else {
        // Efter att svaret är klart, vänta 3 sekunder och återställ
        setTimeout(() => {
          setIsTerminalProcessing(false)
          setTerminalResponse('')
          setTerminalQuery('')
        }, 3000)
      }
    }
    
    // Börja skriva efter en kort delay
    setTimeout(typeResponse, 500)
  }, [terminalQuery, isTerminalProcessing, terminalResponses])

  const restoreX0IDText = useCallback(() => {
    setIsEasterEggActive(false)
    setEasterEggMessage('')
    
    // Återställ med cool läskig effekt - glitch och fade in
    const lines = fullText.split('\n')
    const totalChars = fullText.length
    let currentColumn = 0
    let restoreTimeout: number
    
    // Lägg till glitch-effekt
    setIsTextGlitching(true)
    const glitchTimeout = window.setTimeout(() => setIsTextGlitching(false), 200)
    easterEggTimeoutsRef.current.push(glitchTimeout)
    
    const restoreText = () => {
      let newText = ''
      let charCount = 0
      
      for (let row = 0; row < lines.length; row++) {
        const line = lines[row]
        const charsToShow = Math.min(currentColumn + 1, line.length)
        newText += line.slice(0, charsToShow)
        charCount += charsToShow
        if (row < lines.length - 1) {
          newText += '\n'
          charCount++
        }
      }
      
      if (charCount < totalChars) {
        // Slumpmässig glitch-effekt ibland
        if (Math.random() < 0.2) {
          setIsTextGlitching(true)
          const randomGlitchTimeout = window.setTimeout(() => setIsTextGlitching(false), 50 + Math.random() * 100)
          easterEggTimeoutsRef.current.push(randomGlitchTimeout)
        }
        
        setDisplayedText(newText)
        currentColumn++
        
        // Snabbare återställning med variabel hastighet
        const delay = Math.random() < 0.1 ? 80 + Math.random() * 100 : 20 + Math.random() * 30
        restoreTimeout = window.setTimeout(restoreText, delay)
        easterEggTimeoutsRef.current.push(restoreTimeout)
      } else {
        setDisplayedText(fullText)
      }
    }
    
    restoreText()
  }, [fullText])

  const triggerEasterEgg = useCallback(() => {
    if (easterEggTriggeredRef.current) return
    easterEggTriggeredRef.current = true
    setHasEasterEggTriggered(true)
    // Sätt INTE isEasterEggActive här - vänta tills easter egg-meddelandet börjar skrivas
    
    setEasterEggMessage(easterEggAsciiText)
    
    // Steg 1: Sudda ut X0ID texten snabbt med typewriter effekt (baklänges)
    const lines = fullText.split('\n')
    const maxLineLength = Math.max(...lines.map(line => line.length))
    let currentColumn = maxLineLength - 1
    
    const eraseText = () => {
      let newText = ''
      
      for (let row = 0; row < lines.length; row++) {
        const line = lines[row]
        const charsToShow = Math.max(0, Math.min(currentColumn + 1, line.length))
        newText += line.slice(0, charsToShow)
        if (row < lines.length - 1) {
          newText += '\n'
        }
      }
      
      setDisplayedText(newText)
      
      if (currentColumn >= 0) {
        currentColumn--
        const eraseTimeout = window.setTimeout(eraseText, 20) // Snabb radering
        easterEggTimeoutsRef.current.push(eraseTimeout)
      } else {
        // Steg 2: Rensa texten och börja skriva easter egg ASCII-art med typewriter effekt
        setDisplayedText('')
        
        // Vänta lite innan vi börjar skriva den nya texten
        const startDelay = window.setTimeout(() => {
          // Aktivera easter egg styling när meddelandet börjar skrivas
          setIsEasterEggActive(true)
          
          const easterEggLines = easterEggAsciiText.split('\n')
          const easterEggTotalChars = easterEggAsciiText.length
          let easterEggColumn = 0
          
          const typeEasterEggText = () => {
            let newText = ''
            let charCount = 0
            
            for (let row = 0; row < easterEggLines.length; row++) {
              const line = easterEggLines[row]
              const charsToShow = Math.min(easterEggColumn + 1, line.length)
              newText += line.slice(0, charsToShow)
              charCount += charsToShow
              if (row < easterEggLines.length - 1) {
                newText += '\n'
                charCount++
              }
            }
            
            if (charCount < easterEggTotalChars) {
              setDisplayedText(newText)
              easterEggColumn++
              
              // Variabel hastighet för typewriter effekt (dubbelt så snabb)
              const delay = Math.random() < 0.1 ? 50 + Math.random() * 75 : 15 + Math.random() * 20
              const typeTimeout = window.setTimeout(typeEasterEggText, delay)
              easterEggTimeoutsRef.current.push(typeTimeout)
            } else {
              setDisplayedText(easterEggAsciiText)
              // Steg 3: Visa meddelandet i 1 sekund, sedan glitch-effekt och visa X0ID
              const showTimeout = window.setTimeout(() => {
                // Steg 4: Glitch-effekt - flickrar mellan GOD HAS LEFT och X0ID super snabbt
                let glitchCount = 0
                const maxGlitches = 50 // Fler glitch-frames för längre flickering
                let showEasterEgg = true // Börja med easter egg-texten
                let consecutiveX0ID = 0 // Räkna hur många gånger X0ID visas i rad
                const requiredConsecutive = 5 // Antal gånger X0ID måste visas i rad för att avsluta
                
                const glitchFlicker = () => {
                  // Beräkna sannolikhet för X0ID baserat på hur långt vi kommit
                  const progress = glitchCount / maxGlitches
                  const x0idProbability = Math.min(0.3 + progress * 0.6, 0.9) // Ökar från 30% till 90%
                  
                  // Bestäm vilken text som ska visas
                  const shouldShowX0ID = Math.random() < x0idProbability || consecutiveX0ID >= requiredConsecutive - 1
                  
                  if (shouldShowX0ID) {
                    setDisplayedText(fullText)
                    setIsEasterEggActive(false)
                    setIsTextGlitching(true)
                    consecutiveX0ID++ // Öka räknaren när X0ID visas
                    showEasterEgg = false
                  } else {
                    setDisplayedText(easterEggAsciiText)
                    setIsEasterEggActive(true)
                    consecutiveX0ID = 0 // Återställ räknaren när easter egg visas
                    showEasterEgg = true
                  }
                  
                  glitchCount++
                  
                  // Fortsätt flickra tills X0ID har visats flera gånger i rad
                  if (consecutiveX0ID < requiredConsecutive) {
                    // Super snabb flicker - variabel hastighet för mer kaotisk känsla
                    const delay = Math.random() < 0.3 ? 30 + Math.random() * 40 : 15 + Math.random() * 25
                    const glitchTimeout = window.setTimeout(glitchFlicker, delay)
                    easterEggTimeoutsRef.current.push(glitchTimeout)
                  } else {
                    // Slutligen visa X0ID med glitch-effekt
                    setIsEasterEggActive(false)
                    setEasterEggMessage('')
                    setDisplayedText(fullText)
                    setIsTextGlitching(true)
                    const glitchTimeout = window.setTimeout(() => setIsTextGlitching(false), 200)
                    easterEggTimeoutsRef.current.push(glitchTimeout)
                  }
                }
                
                glitchFlicker()
              }, 1000) // 1 sekund
              easterEggTimeoutsRef.current.push(showTimeout)
            }
          }
          
          typeEasterEggText()
        }, 50) // Kort delay innan vi börjar skriva den nya texten
        easterEggTimeoutsRef.current.push(startDelay)
      }
    }
    
    eraseText()
  }, [fullText, restoreX0IDText, easterEggAsciiText])

  useEffect(() => {
    const introTimeout = window.setTimeout(() => {
      setIsIntroActive(false)
    }, 2000)

    return () => window.clearTimeout(introTimeout)
  }, [])

  useEffect(() => {
    if (hasEasterEggTriggered || easterEggTriggeredRef.current) return // Om easter egg redan triggats, gör inget
    
    const lines = fullText.split('\n')
    const totalChars = fullText.length
    let currentColumn = 0
    let typingTimeout: number

    const typeText = () => {
      // Bygg texten kolumn för kolumn
      let newText = ''
      let charCount = 0
      
      for (let row = 0; row < lines.length; row++) {
        const line = lines[row]
        const charsToShow = Math.min(currentColumn + 1, line.length)
        newText += line.slice(0, charsToShow)
        charCount += charsToShow
        if (row < lines.length - 1) {
          newText += '\n'
          charCount++ // Räkna newline-tecknet
        }
      }

      if (charCount < totalChars) {
        // Slumpmässig glitch-effekt ibland
        if (Math.random() < 0.15 && charCount > 10) {
          setIsTextGlitching(true)
          setTimeout(() => setIsTextGlitching(false), 50 + Math.random() * 100)
        }

        setDisplayedText(newText)
        currentColumn++
        
        // Variabel hastighet för mer mystisk känsla
        const delay = Math.random() < 0.1 ? 100 + Math.random() * 150 : 30 + Math.random() * 40
        typingTimeout = window.setTimeout(typeText, delay)
      } else {
        setDisplayedText(fullText)
        // Trigger easter egg slumpmässigt efter 5 sekunder, mellan 5-10 sekunder därefter
        // Vänta först 5 sekunder
        const initialDelay = window.setTimeout(() => {
          // Efter 5 sekunder, slumpmässigt trigga easter egg mellan 5-10 sekunder senare
          const randomDelay = 5000 + Math.random() * 5000 // 5-10 sekunder
          const easterEggDelay = window.setTimeout(() => {
            triggerEasterEgg()
          }, randomDelay)
          easterEggTimeoutsRef.current.push(easterEggDelay)
        }, 5000) // Vänta 5 sekunder först
        easterEggTimeoutsRef.current.push(initialDelay)
      }
    }

    // Starta typing efter en kort delay
    typingTimeout = window.setTimeout(typeText, 300)

    return () => {
      window.clearTimeout(typingTimeout)
      // Rensa inte easter egg timeouts här - de hanteras separat
    }
  }, [hasEasterEggTriggered, fullText, triggerEasterEgg])

  const queueTimeout = (
    storage: MutableRefObject<number[]>,
    callback: () => void,
    delay: number,
  ) => {
    const id = window.setTimeout(() => {
      storage.current = storage.current.filter((timeoutId) => timeoutId !== id)
      callback()
    }, delay)

    storage.current.push(id)
    return id
  }

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsMouseOnPage(true)
    }

    const handleMouseLeave = () => {
      setIsMouseOnPage(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Uppdatera custom cursor position
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Pausa allt när lösenordet är "blood"
      if (isPasswordBlood) {
        return
      }

      // Kontrollera om det är dags att skapa ny symbol (baserat på tid och avstånd)
      const now = Date.now()
      const minTimeBetweenSymbols = 50 // Minst 50ms mellan symboler
      const minDistanceBetweenSymbols = 30 // Minst 30px avstånd mellan symboler

      const shouldCreateSymbol = !lastTrailPositionRef.current || 
        (now - lastTrailPositionRef.current.time >= minTimeBetweenSymbols &&
         Math.sqrt(
           Math.pow(e.clientX - lastTrailPositionRef.current.x, 2) + 
           Math.pow(e.clientY - lastTrailPositionRef.current.y, 2)
         ) >= minDistanceBetweenSymbols)

      if (shouldCreateSymbol) {
        // 0.8% chans att skapa ett förbjudet ord istället för symbol
        const shouldCreateWord = Math.random() < 0.008

        if (shouldCreateWord) {
          // Begränsa antalet floating words
          setFloatingWords(prev => {
            const MAX_FLOATING_WORDS = 5
            if (prev.length >= MAX_FLOATING_WORDS) {
              // Ta bort den äldsta
              const oldestId = prev[0]?.id
              if (oldestId !== undefined) {
                const timeout = floatingWordsTimeoutsRef.current.get(oldestId)
                if (timeout) {
                  window.clearTimeout(timeout)
                  floatingWordsTimeoutsRef.current.delete(oldestId)
                }
                return prev.slice(1)
              }
            }
            
          // Skapa flytande ord
          const word = forbiddenWords[Math.floor(Math.random() * forbiddenWords.length)]
          const size = 20 + Math.random() * 28 // 20-48px
          const floatDistance = 5 + Math.random() * 10 // 5-15px uppåt
          const id = trailIdCounterRef.current++

            // Rensa ord efter 1.5 sekunder
            const removeTimeout = window.setTimeout(() => {
              setFloatingWords(prev => prev.filter(w => w.id !== id))
              floatingWordsTimeoutsRef.current.delete(id)
            }, 1500)
            floatingWordsTimeoutsRef.current.set(id, removeTimeout)

            return [...prev, {
            id,
            x: e.clientX,
            y: e.clientY,
            word,
            size,
            floatDistance
            }]
          })
        } else {
          // Begränsa antalet trail symbols
          setTrailSymbols(prev => {
            const MAX_TRAIL_SYMBOLS = 20
            if (prev.length >= MAX_TRAIL_SYMBOLS) {
              // Ta bort de äldsta
              const toRemove = prev.slice(0, prev.length - MAX_TRAIL_SYMBOLS + 1)
              toRemove.forEach(symbol => {
                const timeout = trailSymbolsTimeoutsRef.current.get(symbol.id)
                if (timeout) {
                  window.clearTimeout(timeout)
                  trailSymbolsTimeoutsRef.current.delete(symbol.id)
                }
              })
              return prev.slice(prev.length - MAX_TRAIL_SYMBOLS + 1)
            }
            
          // Skapa normal trail-symbol
          const symbol = crypticSymbols[Math.floor(Math.random() * crypticSymbols.length)]
          const size = 12 + Math.random() * 8 // 12-20px
          const rotation = -8 + Math.random() * 16 // -8° till +8°
          const fadeDuration = 300 + Math.random() * 400 // 300-700ms
          const id = trailIdCounterRef.current++

            // Rensa symbol efter fadeDuration
            const removeTimeout = window.setTimeout(() => {
              setTrailSymbols(prev => prev.filter(s => s.id !== id))
              trailSymbolsTimeoutsRef.current.delete(id)
            }, fadeDuration)
            trailSymbolsTimeoutsRef.current.set(id, removeTimeout)

            return [...prev, {
            id,
            x: e.clientX,
            y: e.clientY,
            symbol,
            size,
            rotation,
            fadeDuration
            }]
          })
        }

        // Uppdatera senaste position och tid
        lastTrailPositionRef.current = {
          x: e.clientX,
          y: e.clientY,
          time: now
        }
      }

      if (isGlitchingRef.current || isPasswordBlood) return // Ignorera muspekaren när ögat glitchar eller när lösenordet är "blood"

      const eyeContainer = document.querySelector('.eye-container') as HTMLElement
      if (!eyeContainer) return

      const rect = eyeContainer.getBoundingClientRect()
      const eyeCenterX = rect.left + rect.width / 2
      const eyeCenterY = rect.top + rect.height / 2

      const mouseX = e.clientX
      const mouseY = e.clientY

      const deltaX = mouseX - eyeCenterX
      const deltaY = mouseY - eyeCenterY

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const maxDistance = 30 // Max avstånd från centrum (eyeball 150px, iris 90px, så (150-90)/2 = 30px)

      const angle = Math.atan2(deltaY, deltaX)
      const limitedDistance = Math.min(distance, maxDistance)

      const x = Math.cos(angle) * limitedDistance
      const y = Math.sin(angle) * limitedDistance

      setEyePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isPasswordBlood])

  // Sätt ögat i mitten när lösenordet är "blood"
  useEffect(() => {
    if (isPasswordBlood) {
      setEyePosition({ x: 0, y: 0 })
    }
  }, [isPasswordBlood])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isGlitchingRef.current || isPasswordBlood) return // Ignorera klick när ögat redan glitchar eller när lösenordet är "blood"

      // Begränsa antalet click fragments
      setClickFragments(prev => {
        const MAX_FRAGMENTS = 30
        const currentCount = prev.length
        const fragmentCount = Math.min(8 + Math.floor(Math.random() * 8), MAX_FRAGMENTS - currentCount) // 8-15 fragment, men max totalt
        
        if (fragmentCount <= 0) return prev // Inga fler fragment om vi redan har max
        
      const newFragments: Array<{id: number, x: number, y: number, symbol: string, size: number, rotation: number, offsetX: number, offsetY: number, fadeDuration: number}> = []

      for (let i = 0; i < fragmentCount; i++) {
        const symbol = crypticSymbols[Math.floor(Math.random() * crypticSymbols.length)]
        const size = 10 + Math.random() * 12 // 10-22px
        const rotation = -15 + Math.random() * 30 // -15° till +15°
        const angle = (Math.PI * 2 * i) / fragmentCount + Math.random() * 0.5 // Sprid ut i cirkel + lite variation
        const distance = 20 + Math.random() * 40 // 20-60px från klick-positionen
        const offsetX = Math.cos(angle) * distance
        const offsetY = Math.sin(angle) * distance
        const fadeDuration = 400 + Math.random() * 600 // 400-1000ms
        const id = trailIdCounterRef.current++

        newFragments.push({
          id,
          x: e.clientX,
          y: e.clientY,
          symbol,
          size,
          rotation,
          offsetX,
          offsetY,
          fadeDuration
        })

        // Rensa fragment efter fadeDuration
        setTimeout(() => {
          setClickFragments(prev => prev.filter(f => f.id !== id))
        }, fadeDuration)
      }

        // Ta bort äldsta fragment om vi når max
        const toKeep = MAX_FRAGMENTS - fragmentCount
        const updated = toKeep > 0 ? prev.slice(-toKeep) : []
        return [...updated, ...newFragments]
      })

      isGlitchingRef.current = true
      setIsGlitching(true)
      setEyePosition({ x: 0, y: 0 }) // Titta rakt fram

      // Skaka i 1-2 sekunder
      const shakeDuration = 1000 + Math.random() * 1000
      
      setTimeout(() => {
        isGlitchingRef.current = false
        setIsGlitching(false)
      }, shakeDuration)
    }

    window.addEventListener('click', handleClick, true)
    return () => window.removeEventListener('click', handleClick, true)
  }, [])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault() // Förhindra standard kontextmenyn
      
      // Visa fake kontextmeny vid muspekarens position
      setContextMenu({ x: e.clientX, y: e.clientY })
    }

    const handleClick = () => {
      // Stäng kontextmenyn när man klickar någonstans
      setContextMenu(null)
    }

    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (isIntroActive || isPasswordBlood) {
      setIsJittering(false)
      return
    }

    const triggerJitter = () => {
      setIsJittering(true)

      const jitterDuration = 220 + Math.random() * 160

      queueTimeout(jitterTimeoutsRef, () => {
        setIsJittering(false)
      }, jitterDuration)
    }

    const scheduleJitter = () => {
      const delay = 2000 + Math.random() * 2000
      queueTimeout(jitterTimeoutsRef, () => {
        triggerJitter()
        scheduleJitter() // Schemalägg nästa jitter
      }, delay)
    }

    scheduleJitter()
    return () => {
      jitterTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      jitterTimeoutsRef.current = []
    }
  }, [isIntroActive, isPasswordBlood])

  useEffect(() => {
    if (isIntroActive || isPasswordBlood) {
      setIsBlinking(false)
      return () => {
        blinkTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
        blinkTimeoutsRef.current = []
      }
    }

    const triggerBlink = () => {
      setIsBlinking(true)

      const blinkDuration = 260 + Math.random() * 90

      queueTimeout(blinkTimeoutsRef, () => {
        setIsBlinking(false)

        // Ibland en dubbelblink för mer naturligt beteende
        if (Math.random() < 0.25) {
          const secondDelay = 220 + Math.random() * 140
          queueTimeout(blinkTimeoutsRef, () => {
            setIsBlinking(true)

            const secondBlinkDuration = 230 + Math.random() * 80
            queueTimeout(blinkTimeoutsRef, () => {
              setIsBlinking(false)
            }, secondBlinkDuration)
          }, secondDelay)
        }
      }, blinkDuration)
    }

    const scheduleBlink = () => {
      const delay = 3500 + Math.random() * 3500
      queueTimeout(blinkTimeoutsRef, () => {
        triggerBlink()
        scheduleBlink()
      }, delay)
    }

    scheduleBlink()

    return () => {
      blinkTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId))
      blinkTimeoutsRef.current = []
    }
  }, [isPasswordBlood])

  // Cleanup easter egg timeouts när komponenten unmountas
  useEffect(() => {
    return () => {
      easterEggTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      easterEggTimeoutsRef.current = []
    }
  }, [])

  // Typewriter-sekvens för password-meddelandet
  const startPasswordMessageSequence = useCallback(() => {
    setIsShowingPasswordMessage(true)
    
    // Steg 1: Skriv "YOU WILL REG" med typewriter-effekt
    const firstMessage = "YOU WILL REG"
    let firstIndex = 0
    
    const typeFirstMessage = () => {
      if (firstIndex < firstMessage.length) {
        setPasswordMessage(firstMessage.slice(0, firstIndex + 1))
        firstIndex++
        const timeout = window.setTimeout(typeFirstMessage, 80) // 80ms per tecken
        passwordMessageTimeoutsRef.current.push(timeout)
      } else {
        // Vänta lite innan vi börjar radera
        const pauseTimeout = window.setTimeout(() => {
          // Steg 2: Radera texten baklänges
          let eraseIndex = firstMessage.length
          
          const eraseMessage = () => {
            if (eraseIndex > 0) {
              setPasswordMessage(firstMessage.slice(0, eraseIndex - 1))
              eraseIndex--
              const timeout = window.setTimeout(eraseMessage, 50) // 50ms per tecken (snabbare)
              passwordMessageTimeoutsRef.current.push(timeout)
            } else {
              // Vänta lite innan vi börjar skriva nästa meddelande
              const pauseBeforeNextTimeout = window.setTimeout(() => {
                // Steg 3: Skriv "Welcome, user." med typewriter-effekt
                const secondMessage = "Welcome, user."
                let secondIndex = 0
                
                const typeSecondMessage = () => {
                  if (secondIndex < secondMessage.length) {
                    setPasswordMessage(secondMessage.slice(0, secondIndex + 1))
                    secondIndex++
                    const timeout = window.setTimeout(typeSecondMessage, 80) // 80ms per tecken
                    passwordMessageTimeoutsRef.current.push(timeout)
                  } else {
                    // Vänta 1 sekund efter att "Welcome, user." är klar, sedan visa bekräftelsedialog
                    const videoDelayTimeout = window.setTimeout(() => {
                      setShowVideoConfirmation(true)
                      setShowVideoPlayer(true)
                    }, 1000) // 1 sekund
                    passwordMessageTimeoutsRef.current.push(videoDelayTimeout)
                  }
                }
                
                typeSecondMessage()
              }, 300) // 300ms paus
              passwordMessageTimeoutsRef.current.push(pauseBeforeNextTimeout)
            }
          }
          
          eraseMessage()
        }, 1000) // Vänta 1 sekund innan radering
        passwordMessageTimeoutsRef.current.push(pauseTimeout)
      }
    }
    
    typeFirstMessage()
  }, [])

  // Pausa alla texter i 2 sekunder, sedan fade out en i taget när lösenordet är "blood"
  useEffect(() => {
    if (isPasswordBlood) {
      // Rensa tidigare timeouts om några finns
      bloodFadeTimeoutsRef.current.forEach(timeout => window.clearTimeout(timeout))
      bloodFadeTimeoutsRef.current = []
      
      // Vänta 2 sekunder innan fade out börjar
      const pauseDuration = 2000 // 2 sekunder
      const allTextIds = floatingTexts.map(t => t.id)
      const delayBetweenTexts = 50 // 50ms mellan varje text
      
      // Fade out floating texts efter pausen
      allTextIds.forEach((id, index) => {
        const timeout = window.setTimeout(() => {
          setHiddenTexts(prev => new Set([...prev, id]))
        }, pauseDuration + index * delayBetweenTexts)
        bloodFadeTimeoutsRef.current.push(timeout)
      })
      
      // Fade out andra textelement (trailSymbols, floatingWords, etc.) efter pausen
      const otherTextsTimeout = window.setTimeout(() => {
        setAreOtherTextsHidden(true)
      }, pauseDuration)
      bloodFadeTimeoutsRef.current.push(otherTextsTimeout)
      
      // Fade out title efter alla floating texts
      const titleTimeout = window.setTimeout(() => {
        setIsTitleHidden(true)
        
        // Vänta 1 sekund efter att titeln försvunnit, sedan starta typewriter-sekvensen
        const messageDelayTimeout = window.setTimeout(() => {
          startPasswordMessageSequence()
        }, 1000)
        bloodFadeTimeoutsRef.current.push(messageDelayTimeout)
      }, pauseDuration + allTextIds.length * delayBetweenTexts + 100)
      bloodFadeTimeoutsRef.current.push(titleTimeout)
    } else {
      // Återställ när lösenordet inte är "blood" längre
      setHiddenTexts(new Set())
      setIsTitleHidden(false)
      setAreOtherTextsHidden(false)
      setPasswordMessage('')
      setIsShowingPasswordMessage(false)
      setShowVideoPlayer(false)
      setShowVideoConfirmation(false)
      setVideoConfirmed(false)
      bloodFadeTimeoutsRef.current.forEach(timeout => window.clearTimeout(timeout))
      bloodFadeTimeoutsRef.current = []
      passwordMessageTimeoutsRef.current.forEach(timeout => window.clearTimeout(timeout))
      passwordMessageTimeoutsRef.current = []
    }
    
    return () => {
      bloodFadeTimeoutsRef.current.forEach(timeout => window.clearTimeout(timeout))
      bloodFadeTimeoutsRef.current = []
      passwordMessageTimeoutsRef.current.forEach(timeout => window.clearTimeout(timeout))
      passwordMessageTimeoutsRef.current = []
    }
  }, [isPasswordBlood, floatingTexts, startPasswordMessageSequence])

  // Korrupta log-rader på logs-sidan med sataniska meddelanden
  useEffect(() => {
    if (currentPage !== 'logs') {
      setCorruptedLogs(new Map())
      return
    }

    const corruptRandomLog = () => {
      // Välj slumpmässig sekvens och rad
      const sequences = [
        floatingMessagesSequence1,
        floatingMessagesSequence2,
        floatingMessagesSequence3,
        floatingMessagesSequence4,
        floatingMessagesSequence5
      ]
      const sequenceIndex = Math.floor(Math.random() * sequences.length)
      const sequence = sequences[sequenceIndex]
      const logIndex = Math.floor(Math.random() * sequence.length)
      const logKey = `seq${sequenceIndex + 1}-${logIndex}`
      const originalMessage = sequence[logIndex]
      
      // Välj slumpmässigt sataniskt meddelande
      const satanicMessage = satanicMessages[Math.floor(Math.random() * satanicMessages.length)]
      
      // Sätt korrupt state
      setCorruptedLogs(prev => {
        const newMap = new Map(prev)
        newMap.set(logKey, {
          original: originalMessage,
          corrupted: satanicMessage,
          isTyping: true,
          typedText: ''
        })
        return newMap
      })
      
      // Typewriter-effekt för att skriva ut det sataniska meddelandet
      let typedIndex = 0
      const typeCorruptedMessage = () => {
        if (typedIndex < satanicMessage.length) {
          setCorruptedLogs(prev => {
            const newMap = new Map(prev)
            const current = newMap.get(logKey)
            if (current) {
              newMap.set(logKey, {
                ...current,
                typedText: satanicMessage.slice(0, typedIndex + 1)
              })
            }
            return newMap
          })
          typedIndex++
          setTimeout(typeCorruptedMessage, 50) // 50ms per tecken
        } else {
          // Efter att meddelandet är skrivet, vänta 1 sekund och återställ
          setTimeout(() => {
            setCorruptedLogs(prev => {
              const newMap = new Map(prev)
              const current = newMap.get(logKey)
              if (current) {
                newMap.set(logKey, {
                  ...current,
                  isTyping: false
                })
              }
              return newMap
            })
            setTimeout(() => {
              setCorruptedLogs(prev => {
                const newMap = new Map(prev)
                newMap.delete(logKey)
                return newMap
              })
            }, 1000) // Återställ efter 1 sekund
          }, 1000)
        }
      }
      
      // Börja med att sudda ut texten
      setTimeout(() => {
        setCorruptedLogs(prev => {
          const newMap = new Map(prev)
          const current = newMap.get(logKey)
          if (current) {
            newMap.set(logKey, {
              ...current,
              typedText: ''
            })
          }
          return newMap
        })
        // Börja skriva det sataniska meddelandet
        setTimeout(typeCorruptedMessage, 200)
      }, 100)
    }

    // Korrupta en log-rad var 3-6 sekunder
    const scheduleCorruption = () => {
      const delay = 3000 + Math.random() * 3000 // 3-6 sekunder
      const timeout = window.setTimeout(() => {
        corruptRandomLog()
        scheduleCorruption()
      }, delay)
      return timeout
    }

    const timeout = scheduleCorruption()
    
    return () => {
      window.clearTimeout(timeout)
    }
  }, [currentPage])

  // Distortion-effekt på X0ID-texten - kan hända när som helst mellan 3-8 sekunder
  useEffect(() => {
    if (isIntroActive || hasEasterEggTriggered || isShowingDeath || isPasswordBlood) return // Inte under intro, när easter egg är aktiv, när death-text visas eller när lösenordet är "blood"
    
    const triggerDistortion = () => {
      setIsTextDistorted(true)
      
      // Distortion varar i 200-400ms
      const distortionDuration = 200 + Math.random() * 200
      const distortionTimeout = window.setTimeout(() => {
        setIsTextDistorted(false)
      }, distortionDuration)
      distortionTimeoutsRef.current.push(distortionTimeout)
    }

    const scheduleDistortion = () => {
      // Slumpmässig delay mellan 3-8 sekunder
      const delay = 3000 + Math.random() * 5000
      const timeout = window.setTimeout(() => {
        triggerDistortion()
        scheduleDistortion() // Schemalägg nästa distortion
      }, delay)
      distortionTimeoutsRef.current.push(timeout)
    }

    scheduleDistortion()

    return () => {
      distortionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      distortionTimeoutsRef.current = []
    }
  }, [isIntroActive, hasEasterEggTriggered, isShowingDeath, isPasswordBlood])


  // Byt ut X0ID-texten mot DEATH-texten ibland i 0.5 sekunder
  useEffect(() => {
    if (isIntroActive || hasEasterEggTriggered || isEasterEggActive || isPasswordBlood) return // Inte under intro, easter egg, när easter egg är aktiv eller när lösenordet är "blood"
    
    const triggerDeathText = () => {
      setIsShowingDeath(true)
      setDisplayedText(deathText)
      
      // Visa DEATH-texten i 0.5 sekunder
      const deathTimeout = window.setTimeout(() => {
        setIsShowingDeath(false)
        setDisplayedText(fullText)
      }, 500)
      deathTimeoutsRef.current.push(deathTimeout)
    }

    const scheduleDeathText = () => {
      // Slumpmässig delay mellan 5-12 sekunder
      const delay = 5000 + Math.random() * 7000
      const timeout = window.setTimeout(() => {
        triggerDeathText()
        scheduleDeathText() // Schemalägg nästa
      }, delay)
      deathTimeoutsRef.current.push(timeout)
    }

    scheduleDeathText()

    return () => {
      deathTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      deathTimeoutsRef.current = []
    }
  }, [isIntroActive, hasEasterEggTriggered, isEasterEggActive, fullText, deathText, isPasswordBlood])

  // Korrupta ord i sekvenserna - byt ut ord mot sataniska ord
  useEffect(() => {
    if (isIntroActive || isPasswordBlood) return
    
    const corruptRandomWord = () => {
      // Begränsa antalet korrupta ord
      setCorruptedWords(prev => {
        const MAX_CORRUPTED_WORDS = 10 // Max antal korrupta ord samtidigt
        if (prev.size >= MAX_CORRUPTED_WORDS * 2) { // *2 eftersom vi har både main och logs keys
          return prev // Skapa inte fler om vi redan har max
        }
        
      // Välj slumpmässig sekvens och text
      const sequences = [
        floatingMessagesSequence1,
        floatingMessagesSequence2,
        floatingMessagesSequence3,
        floatingMessagesSequence4,
        floatingMessagesSequence5
      ]
      const sequenceIndex = Math.floor(Math.random() * sequences.length)
      const sequence = sequences[sequenceIndex]
      const textIndex = Math.floor(Math.random() * sequence.length)
      const text = sequence[textIndex]
      
      // Dela upp texten i ord
      const words = text.split(/(\s+)/)
      const wordIndices = words
        .map((word, idx) => ({ word, idx }))
        .filter(({ word }) => word.trim().length > 0 && !word.match(/^[⠽⠕⠥\s]+$/)) // Filtrera bort tomma ord och braille
      
        if (wordIndices.length === 0) return prev
      
      const randomWordEntry = wordIndices[Math.floor(Math.random() * wordIndices.length)]
      const originalWord = randomWordEntry.word.trim()
      
      // Välj slumpmässigt sataniskt ord
      const corruptedWord = satanicWords[Math.floor(Math.random() * satanicWords.length)]
      
      // Räkna ord-indexet (ignorera whitespace och braille)
      const allWords = text.split(/\s+/).filter(w => w.trim().length > 0 && !w.match(/^[⠽⠕⠥]+$/))
      const wordPosition = allWords.findIndex(w => w === originalWord)
      
        if (wordPosition === -1) return prev // Hittade inte ordet, hoppa över
      
      // Skapa unik nyckel för både main och logs
      const mainKey = `main-seq${sequenceIndex + 1}-${textIndex}-word${wordPosition}`
      const logsKey = `logs-seq${sequenceIndex + 1}-${textIndex}-word${wordPosition}`
        
        // Kontrollera om detta ord redan är korrupt
        if (prev.has(mainKey) || prev.has(logsKey)) {
          return prev // Redan korrupt, hoppa över
        }
      
      // Sätt korrupt state för både main och logs
        const newMap = new Map(prev)
        newMap.set(mainKey, {
          originalWord,
          corruptedWord,
          wordIndex: wordPosition
        })
        newMap.set(logsKey, {
          originalWord,
          corruptedWord,
          wordIndex: wordPosition
        })
      
        // Återställ efter 3-5 sekunder (längre synlighet)
        const restoreDelay = 3000 + Math.random() * 2000
        const restoreTimeout = window.setTimeout(() => {
        setCorruptedWords(prev => {
          const newMap = new Map(prev)
          newMap.delete(mainKey)
          newMap.delete(logsKey)
          return newMap
        })
          corruptedWordsTimeoutsRef.current = corruptedWordsTimeoutsRef.current.filter(t => t !== restoreTimeout)
      }, restoreDelay)
        corruptedWordsTimeoutsRef.current.push(restoreTimeout)
        
        return newMap
      })
    }

    // Korrupta ett ord var 1.5-4 sekunder (oftare)
    const scheduleCorruption = () => {
      const delay = 1500 + Math.random() * 2500 // 1.5-4 sekunder
      const timeout = window.setTimeout(() => {
        corruptRandomWord()
        scheduleCorruption()
      }, delay)
      return timeout
    }

    const timeout = scheduleCorruption()
    
    return () => {
      window.clearTimeout(timeout)
      // Rensa alla corrupted words timeouts
      corruptedWordsTimeoutsRef.current.forEach(t => window.clearTimeout(t))
      corruptedWordsTimeoutsRef.current = []
      // Rensa även alla corrupted words från state
      setCorruptedWords(new Map())
    }
  }, [isIntroActive, isPasswordBlood])

  // Typing indicator - tre punkter som pulserar en i taget
  useEffect(() => {
    if (isIntroActive || hasEasterEggTriggered || isPasswordBlood) return

    const MAX_TYPING_INDICATORS = 3 // Max antal samtidiga typing indicators

    const spawnTypingIndicator = () => {
      // Kontrollera om vi redan har för många
      setTypingIndicators(prev => {
        if (prev.length >= MAX_TYPING_INDICATORS) {
          return prev // Skapa inte fler om vi redan har max
        }
        
      // Slumpmässig position i bakgrunden (undvik centrum där ögat är)
      const x = Math.random() * (window.innerWidth - 200) + 100 // 100px från kanterna
      const y = Math.random() * (window.innerHeight - 200) + 100
      const id = typingIndicatorIdCounterRef.current++

      // Ta bort efter 3 sekunder (1 sekund pulsering + fade out)
      const removeTimeout = window.setTimeout(() => {
        setTypingIndicators(prev => prev.filter(indicator => indicator.id !== id))
      }, 3000)
      typingIndicatorTimeoutsRef.current.push(removeTimeout)

        return [...prev, { id, x, y }]
      })
    }

    const scheduleTypingIndicator = () => {
      // Slumpmässig delay mellan 4-8 sekunder (mer sällan)
      const delay = 4000 + Math.random() * 4000
      const timeout = window.setTimeout(() => {
        spawnTypingIndicator()
        scheduleTypingIndicator() // Schemalägg nästa
      }, delay)
      typingIndicatorTimeoutsRef.current.push(timeout)
    }

    // Starta endast en scheduler
    scheduleTypingIndicator()

    return () => {
      typingIndicatorTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      typingIndicatorTimeoutsRef.current = []
    }
  }, [isIntroActive, hasEasterEggTriggered, isPasswordBlood])

  // Skapa flytande meningar på fasta positioner
  useEffect(() => {
    if (isIntroActive) return

    const createFloatingText = (text: string, id: number, isExtraLarge: boolean, sequenceNumber: number) => {
      const rotation = -15 + Math.random() * 30 // -15° till +15°
      
      // Bestäm storlek baserat på regler
      let size: number
      if (isExtraLarge) {
        // Extra Large: 120px (exakt 1 text per visning)
        size = 120
      } else {
        const rand = Math.random()
        if (rand < 0.25) {
          // Large: 44-88px (25% chans)
          size = 44 + Math.random() * 44
        } else if (rand < 0.5) {
          // Medium: 20-36px
          size = 20 + Math.random() * 16
        } else {
          // Small: 12-18px
          size = 12 + Math.random() * 6
        }
      }
      
      // Sprid ut texterna över skärmen med olika positioner
      const x = (id % 3) * (window.innerWidth / 3) + Math.random() * (window.innerWidth / 3)
      const y = Math.floor(id / 3) * (window.innerHeight / 3) + Math.random() * (window.innerHeight / 3)

      // Slumpmässig opacitet: 50-100% (0.5-1.0)
      const opacity = 0.5 + Math.random() * 0.5
      
      // Slumpmässig drift-riktning och timing för smooth svävning
      const driftX = (Math.random() - 0.5) * 5 // -2.5px till +2.5px
      const driftY = (Math.random() - 0.5) * 5 // -2.5px till +2.5px
      const driftDuration = 3000 + Math.random() * 2000 // 3-5 sekunder
      const driftDelay = Math.random() * 2000 // 0-2 sekunder delay
      
      // Slumpmässig flicker-delay för CRT-effekt
      const flickerDelay = Math.random() * 1000 // 0-1 sekund delay efter flickering-animationen
      
      // 30% chans för ghost text
      const hasGhostText = Math.random() < 0.3
      const ghostOffsetX = hasGhostText ? (2 + Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) : 0 // 2-4px offset
      const ghostOffsetY = hasGhostText ? (2 + Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) : 0 // 2-4px offset

      return {
        id,
        text,
        x,
        y,
        rotation,
        size,
        speedX: 0,
        speedY: 0,
        opacity,
        driftX,
        driftY,
        driftDuration,
        driftDelay,
        flickerDelay,
        hasGhostText,
        ghostOffsetX,
        ghostOffsetY,
        sequenceNumber
      }
    }

    // Skapa initiala flytande texter från sekvens 1
    const floatingMessages = floatingMessagesSequence1
    // Välj slumpmässig text för Extra Large (exakt 1)
    const extraLargeIndex = Math.floor(Math.random() * floatingMessages.length)
    const initialTexts = floatingMessages.map((msg, index) => 
      createFloatingText(msg, index, index === extraLargeIndex, 1)
    )
    setFloatingTexts(initialTexts)
  }, [isIntroActive])

  // Visa texterna med blinkande/flickering effekt efter att ögat kommit in
  useEffect(() => {
    if (isIntroActive) return

    // Vänta lite efter att ögat kommit in, sedan visa texterna med animation
    const showTimeout = window.setTimeout(() => {
      setShowFloatingTexts(true)
    }, 500) // 500ms efter att intro är klar

    return () => {
      window.clearTimeout(showTimeout)
    }
  }, [isIntroActive])

  // Öka targetSequence när alla texter är från den nuvarande sekvensen
  useEffect(() => {
    if (isIntroActive || !showFloatingTexts || floatingTexts.length === 0 || isPasswordBlood) return

    const allFromTarget = floatingTexts.every(t => t.sequenceNumber === targetSequence)
    
    if (allFromTarget && floatingTexts.length > 0) {
      // Vänta lite innan vi ökar sekvensen
      const timeout = window.setTimeout(() => {
        const nextSequence = targetSequence === 5 ? 1 : targetSequence + 1
        setTargetSequence(nextSequence)
      }, 1000) // Vänta 1 sekund efter att alla är bytta

      return () => {
        window.clearTimeout(timeout)
      }
    }
  }, [isIntroActive, showFloatingTexts, floatingTexts, targetSequence, isPasswordBlood])

  // Gradvis byt ut individuella texter slumpmässigt mot targetSequence
  useEffect(() => {
    if (isIntroActive || !showFloatingTexts || floatingTexts.length === 0 || isPasswordBlood) return

    const getSequenceMessages = (seq: number) => {
      switch(seq) {
        case 1: return floatingMessagesSequence1
        case 2: return floatingMessagesSequence2
        case 3: return floatingMessagesSequence3
        case 4: return floatingMessagesSequence4
        case 5: return floatingMessagesSequence5
        default: return floatingMessagesSequence1
      }
    }

    const createFloatingText = (text: string, id: number, isExtraLarge: boolean, sequenceNumber: number, existingText: typeof floatingTexts[0]) => {
      // Generera nya positioner när texten byts ut
      const newX = Math.random() * window.innerWidth
      const newY = Math.random() * window.innerHeight
      
      // Generera nya slumpmässiga egenskaper
      const newRotation = -15 + Math.random() * 30 // -15° till +15°
      const newOpacity = 0.5 + Math.random() * 0.5 // 50-100%
      const newDriftX = (Math.random() - 0.5) * 5 // -2.5px till +2.5px
      const newDriftY = (Math.random() - 0.5) * 5 // -2.5px till +2.5px
      const newDriftDuration = 3000 + Math.random() * 2000 // 3-5 sekunder
      const newDriftDelay = Math.random() * 2000 // 0-2 sekunder delay
      const newFlickerDelay = Math.random() * 1000 // 0-1 sekund delay
      const newHasGhostText = Math.random() < 0.3 // 30% chans
      const newGhostOffsetX = newHasGhostText ? (2 + Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) : 0
      const newGhostOffsetY = newHasGhostText ? (2 + Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1) : 0
      
      return {
        ...existingText,
        text,
        sequenceNumber,
        x: newX,
        y: newY,
        rotation: newRotation,
        opacity: newOpacity,
        driftX: newDriftX,
        driftY: newDriftY,
        driftDuration: newDriftDuration,
        driftDelay: newDriftDelay,
        flickerDelay: newFlickerDelay,
        hasGhostText: newHasGhostText,
        ghostOffsetX: newGhostOffsetX,
        ghostOffsetY: newGhostOffsetY,
        size: isExtraLarge ? 120 : existingText.size
      }
    }

    const replaceRandomTexts = () => {
      setFloatingTexts(prevTexts => {
        // Kontrollera om alla texter redan är från targetSequence
        const allFromTarget = prevTexts.every(t => t.sequenceNumber === targetSequence)
        
        if (allFromTarget) {
          return prevTexts // Inget att ändra, vänta på att targetSequence ökas
        }

        // Hitta texter som INTE är från targetSequence
        const textsToReplace = prevTexts.filter(t => t.sequenceNumber !== targetSequence)
        
        if (textsToReplace.length === 0) {
          return prevTexts
        }

        // Välj slumpmässigt antal texter att byta (1-3 texter)
        const numToReplace = Math.min(1 + Math.floor(Math.random() * 3), textsToReplace.length)
        const shuffled = [...textsToReplace].sort(() => Math.random() - 0.5)
        const textsToChange = shuffled.slice(0, numToReplace)

        // Hämta texter från targetSequence
        const targetMessages = getSequenceMessages(targetSequence)
        
        // Skapa nya texter
        const newTexts = prevTexts.map(text => {
          const shouldReplace = textsToChange.find(t => t.id === text.id)
          if (shouldReplace) {
            // Välj slumpmässig text från targetSequence
            const randomMessage = targetMessages[Math.floor(Math.random() * targetMessages.length)]
            const isExtraLarge = text.size >= 100
            return createFloatingText(randomMessage, text.id, isExtraLarge, targetSequence, text)
          }
          return text
        })

        return newTexts
      })
    }

    // Byt texter var 1-2 sekunder med slumpmässiga intervall
    let timeoutId: number
    
    const scheduleNextReplace = () => {
      const delay = 1000 + Math.random() * 1000 // 1-2 sekunder
      timeoutId = window.setTimeout(() => {
        replaceRandomTexts()
        scheduleNextReplace() // Schemalägg nästa byte
      }, delay)
    }
    
    scheduleNextReplace()

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [isIntroActive, showFloatingTexts, floatingTexts.length, targetSequence, isPasswordBlood])

  // StutterGlitch-effekt - triggas var 2-4:e sekund på 2-3 slumpmässiga texter
  useEffect(() => {
    if (isIntroActive || !showFloatingTexts || floatingTexts.length === 0 || isPasswordBlood) return

    const triggerStutterGlitch = () => {
      // Välj 2-3 slumpmässiga texter
      const numTextsToGlitch = 2 + Math.floor(Math.random() * 2) // 2 eller 3
      const shuffled = [...floatingTexts].sort(() => Math.random() - 0.5)
      const textsToGlitch = shuffled.slice(0, numTextsToGlitch)
      
      // Generera glitch-offsets för varje text
      const newGlitchOffsets = new Map<number, Array<{x: number, y: number}>>()
      textsToGlitch.forEach(text => {
        const offsets = Array.from({ length: 7 }, () => ({
          x: (Math.random() - 0.5) * 24, // -12px till +12px
          y: (Math.random() - 0.5) * 24  // -12px till +12px
        }))
        newGlitchOffsets.set(text.id, offsets)
      })
      
      // Aktivera glitch för dessa texter
      const newGlitchingTexts = new Set(textsToGlitch.map(t => t.id))
      setGlitchingTexts(newGlitchingTexts)
      setGlitchOffsets(newGlitchOffsets)

      // Stäng av glitch efter 280ms
      setTimeout(() => {
        setGlitchingTexts(new Set())
        setGlitchOffsets(new Map())
      }, 280)
    }

    const scheduleGlitch = () => {
      // Slumpmässig delay mellan 2-4 sekunder
      const delay = 2000 + Math.random() * 2000
      const timeout = window.setTimeout(() => {
        triggerStutterGlitch()
        scheduleGlitch() // Schemalägg nästa glitch
      }, delay)
      return timeout
    }

    const timeout = scheduleGlitch()

    return () => {
      window.clearTimeout(timeout)
    }
  }, [isIntroActive, showFloatingTexts, floatingTexts, isPasswordBlood])

  // Ryck-effekt - texter rycker kraftigt åt olika håll slumpmässigt
  useEffect(() => {
    if (isIntroActive || !showFloatingTexts || floatingTexts.length === 0 || isPasswordBlood) return

    const triggerJerking = () => {
      // Välj slumpmässigt antal texter att rycka (1-5 texter)
      const numTextsToJerk = 1 + Math.floor(Math.random() * 5)
      const shuffled = [...floatingTexts].sort(() => Math.random() - 0.5)
      const textsToJerk = shuffled.slice(0, Math.min(numTextsToJerk, floatingTexts.length))
      
      // Generera 3 snabba ryck-offsets för varje text (åt olika håll)
      const newJerkOffsets = new Map<number, Array<{x: number, y: number}>>()
      const newTrails: Array<{id: number, text: string, x: number, y: number, rotation: number, size: number, opacity: number, sequenceNumber: number}> = []
      
      textsToJerk.forEach(text => {
        // 3 snabba ryckningar åt olika håll - mindre offset för snabbare känsla
        const offsets = Array.from({ length: 3 }, () => ({
          x: (Math.random() - 0.5) * 40, // -20px till +20px
          y: (Math.random() - 0.5) * 40  // -20px till +20px
        }))
        newJerkOffsets.set(text.id, offsets)
        
        // Skapa trail-texter på varje ryck-position
        offsets.forEach((offset, index) => {
          const trailId = jerkTrailIdCounterRef.current++
          newTrails.push({
            id: trailId,
            text: text.text,
            x: text.x + offset.x,
            y: text.y + offset.y,
            rotation: text.rotation,
            size: text.size,
            opacity: text.opacity * 0.3, // 30% opacitet för skugga-effekt
            sequenceNumber: text.sequenceNumber
          })
          
          // Ta bort trail efter 1 sekund
          setTimeout(() => {
            setJerkTrails(prev => prev.filter(t => t.id !== trailId))
          }, 1000)
        })
      })
      
      // Lägg till nya trails
      setJerkTrails(prev => [...prev, ...newTrails])
      
      // Aktivera ryck för dessa texter
      const newJerkingTexts = new Set(textsToJerk.map(t => t.id))
      setJerkingTexts(newJerkingTexts)
      setJerkOffsets(newJerkOffsets)

      // Stäng av ryck efter 120ms (3 snabba ryckningar)
      const jerkDuration = 120
      setTimeout(() => {
        setJerkingTexts(new Set())
        setJerkOffsets(new Map())
      }, jerkDuration)
    }

    const scheduleJerking = () => {
      // Slumpmässig delay mellan 1-4 sekunder
      const delay = 1000 + Math.random() * 3000
      const timeout = window.setTimeout(() => {
        triggerJerking()
        scheduleJerking() // Schemalägg nästa ryck
      }, delay)
      return timeout
    }

    const timeout = scheduleJerking()

    return () => {
      window.clearTimeout(timeout)
    }
  }, [isIntroActive, showFloatingTexts, floatingTexts, isPasswordBlood])

  // Skapa dynamiska CSS keyframes för flytande ord
  useEffect(() => {
    const styleId = 'floating-word-styles'
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    // Skapa unika keyframes för varje floatDistance-värde som finns
    const uniqueDistances = Array.from(new Set(floatingWords.map(w => Math.round(w.floatDistance * 10) / 10)))
    let css = ''
    
    uniqueDistances.forEach(distance => {
      const safeName = distance.toString().replace('.', '-')
      css += `
        @keyframes floating-word-fade-${safeName} {
          0% {
            opacity: 0.9;
            transform: translate(-50%, -50%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, calc(-50% - ${distance}px));
          }
        }
      `
    })

    styleElement.textContent = css
  }, [floatingWords])

  // Skapa dynamiska CSS keyframes för klick-fragment
  useEffect(() => {
    const styleId = 'click-fragment-styles'
    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    // Skapa unika keyframes för varje unik offset-kombination
    const uniqueOffsets = Array.from(
      new Set(
        clickFragments.map(f => 
          `${Math.round(f.offsetX)}-${Math.round(f.offsetY)}`
        )
      )
    )
    let css = ''
    
    uniqueOffsets.forEach(offset => {
      const [offsetX, offsetY] = offset.split('-').map(Number)
      css += `
        @keyframes fragment-scatter-${offsetX}-${offsetY} {
          0% {
            opacity: 0.9;
            transform: translate(-50%, -50%) translate(0, 0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) rotate(360deg);
          }
        }
      `
    })

    styleElement.textContent = css
  }, [clickFragments])

  // Hjälpfunktion för att rendera text med korrupta ord
  const renderTextWithCorruptedWords = (text: string, sequenceNumber: number, textIndex: number, isMainPage: boolean) => {
    const prefix = isMainPage ? 'main' : 'logs'
    const key = `${prefix}-seq${sequenceNumber}-${textIndex}`
    
    // Hitta alla korrupta ord för denna text
    const corruptedWordsForText: Array<{wordIndex: number, corruptedWord: string, originalWord: string}> = []
    corruptedWords.forEach((value, mapKey) => {
      if (mapKey.startsWith(key)) {
        const wordKeyParts = mapKey.split('-word')
        if (wordKeyParts.length === 2) {
          const wordIndex = parseInt(wordKeyParts[1])
          corruptedWordsForText.push({
            wordIndex,
            corruptedWord: value.corruptedWord,
            originalWord: value.originalWord
          })
        }
      }
    })
    
    if (corruptedWordsForText.length === 0) {
      return <>{text}</>
    }
    
    // Dela upp texten i ord och whitespace, behåll whitespace
    const parts = text.split(/(\s+)/)
    const result: Array<React.ReactNode> = []
    
    let wordCount = 0
    parts.forEach((part, index) => {
      const trimmedPart = part.trim()
      if (trimmedPart.length > 0 && !part.match(/^[⠽⠕⠥\s]+$/)) {
        // Detta är ett ord
        const corrupted = corruptedWordsForText.find(c => {
          // Matcha baserat på ordets position i arrayen
          const words = text.split(/\s+/).filter(w => w.trim().length > 0 && !w.match(/^[⠽⠕⠥]+$/))
          return wordCount < words.length && words[wordCount] === c.originalWord
        })
        if (corrupted) {
          result.push(
            <span key={index} className="corrupted-word">
              {corrupted.corruptedWord}
            </span>
          )
        } else {
          result.push(<span key={index}>{part}</span>)
        }
        wordCount++
      } else {
        // Detta är whitespace eller specialtecken
        result.push(<span key={index}>{part}</span>)
      }
    })
    
    return <>{result}</>
  }

  return (
    <div className="app">
      <div className="scanlines"></div>
      {trailSymbols.map((trailSymbol) => (
        <div
          key={trailSymbol.id}
          className={`trail-symbol ${areOtherTextsHidden ? 'fade-out' : ''}`}
          style={{
            left: `${trailSymbol.x}px`,
            top: `${trailSymbol.y}px`,
            fontSize: `${trailSymbol.size}px`,
            transform: `translate(-50%, -50%) rotate(${trailSymbol.rotation}deg)`,
            animationDuration: `${trailSymbol.fadeDuration}ms`,
            animationPlayState: isPasswordBlood ? 'paused' : 'running',
            transition: areOtherTextsHidden ? 'opacity 0.3s ease-out' : 'none',
            opacity: areOtherTextsHidden ? 0 : undefined
          }}
        >
          {trailSymbol.symbol}
        </div>
      ))}
      {floatingWords.map((floatingWord) => {
        const safeDistance = Math.round(floatingWord.floatDistance * 10) / 10
        const animationName = `floating-word-fade-${safeDistance.toString().replace('.', '-')}`
        return (
          <div
            key={floatingWord.id}
            className={`floating-word ${areOtherTextsHidden ? 'fade-out' : ''}`}
            style={{
              left: `${floatingWord.x}px`,
              top: `${floatingWord.y}px`,
              fontSize: `${floatingWord.size}px`,
              animation: isPasswordBlood ? 'none' : `${animationName} 1.5s linear forwards`,
              animationPlayState: isPasswordBlood ? 'paused' : 'running',
              transition: areOtherTextsHidden ? 'opacity 0.3s ease-out' : 'none',
              opacity: areOtherTextsHidden ? 0 : undefined
            }}
          >
            {floatingWord.word}
          </div>
        )
      })}
      {clickFragments.map((fragment) => {
        const offsetX = Math.round(fragment.offsetX)
        const offsetY = Math.round(fragment.offsetY)
        return (
          <div
            key={fragment.id}
            className={`click-fragment ${areOtherTextsHidden ? 'fade-out' : ''}`}
            style={{
              left: `${fragment.x}px`,
              top: `${fragment.y}px`,
              fontSize: `${fragment.size}px`,
              transform: `translate(-50%, -50%) rotate(${fragment.rotation}deg)`,
              animation: isPasswordBlood ? 'none' : `fragment-scatter-${offsetX}-${offsetY} ${fragment.fadeDuration}ms ease-out forwards`,
              animationPlayState: isPasswordBlood ? 'paused' : 'running',
              transition: areOtherTextsHidden ? 'opacity 0.3s ease-out' : 'none',
              opacity: areOtherTextsHidden ? 0 : undefined
            }}
          >
            {fragment.symbol}
          </div>
        )
      })}
      {showFloatingTexts && floatingTexts.map((floatingText) => {
        const isGlitching = glitchingTexts.has(floatingText.id)
        const offsets = glitchOffsets.get(floatingText.id) || []
        const isJerking = jerkingTexts.has(floatingText.id)
        const textJerkOffsets = jerkOffsets.get(floatingText.id) || []
        const isHidden = hiddenTexts.has(floatingText.id)
        
        const baseStyle = {
          fontSize: floatingText.size >= 100 
            ? `clamp(60px, 120px, 120px)` 
            : floatingText.size >= 44
            ? `clamp(22px, ${floatingText.size}px, 88px)`
            : floatingText.size >= 20
            ? `clamp(10px, ${floatingText.size}px, 36px)`
            : `clamp(6px, ${floatingText.size}px, 18px)`,
          '--final-opacity': floatingText.opacity.toString(),
          '--drift-x': `${floatingText.driftX}px`,
          '--drift-y': `${floatingText.driftY}px`,
          '--rotation': `${floatingText.rotation}deg`,
          '--base-opacity': floatingText.opacity.toString(),
          ...(isGlitching && offsets.length > 0 ? {
            '--glitch-x-1': `${offsets[0].x}px`,
            '--glitch-y-1': `${offsets[0].y}px`,
            '--glitch-x-2': `${offsets[1].x}px`,
            '--glitch-y-2': `${offsets[1].y}px`,
            '--glitch-x-3': `${offsets[2].x}px`,
            '--glitch-y-3': `${offsets[2].y}px`,
            '--glitch-x-4': `${offsets[3].x}px`,
            '--glitch-y-4': `${offsets[3].y}px`,
            '--glitch-x-5': `${offsets[4].x}px`,
            '--glitch-y-5': `${offsets[4].y}px`,
            '--glitch-x-6': `${offsets[5].x}px`,
            '--glitch-y-6': `${offsets[5].y}px`,
            '--glitch-x-7': `${offsets[6].x}px`,
            '--glitch-y-7': `${offsets[6].y}px`
          } : {}),
          ...(isJerking && textJerkOffsets.length > 0 ? {
            '--jerk-x-1': `${textJerkOffsets[0].x}px`,
            '--jerk-y-1': `${textJerkOffsets[0].y}px`,
            '--jerk-x-2': `${textJerkOffsets[1].x}px`,
            '--jerk-y-2': `${textJerkOffsets[1].y}px`,
            '--jerk-x-3': `${textJerkOffsets[2].x}px`,
            '--jerk-y-3': `${textJerkOffsets[2].y}px`
          } : {}),
          animation: isPasswordBlood 
            ? 'none'
            : isJerking
            ? `text-jerk 120ms ease-in-out forwards`
            : isGlitching 
            ? `stutter-glitch 280ms steps(8) forwards`
            : `floating-text-flicker 1.5s ease-out forwards, floating-drift ${floatingText.driftDuration}ms ease-in-out infinite, floating-crt-flicker 2s ease-in-out infinite`,
          animationDelay: isPasswordBlood
            ? '0ms'
            : isGlitching 
            ? '0ms'
            : `${floatingText.id * 0.1}s, ${floatingText.driftDelay}ms, ${1500 + floatingText.flickerDelay}ms`
        } as React.CSSProperties & { '--final-opacity': string; '--drift-x': string; '--drift-y': string; '--rotation': string; '--base-opacity': string; [key: string]: string | number | undefined }
        
        return (
          <>
            <div
              key={floatingText.id}
              className={`floating-message floating-message-enter ${isGlitching && !isPasswordBlood ? 'stutter-glitch' : ''} ${isJerking && !isPasswordBlood ? 'text-jerking' : ''} ${isHidden ? 'fade-out' : ''}`}
              style={{
                ...baseStyle,
                left: `${floatingText.x}px`,
                top: `${floatingText.y}px`,
                opacity: isHidden ? 0 : floatingText.opacity,
                transition: isHidden ? 'opacity 0.3s ease-out' : 'none',
                ...(isPasswordBlood ? {
                  transform: `translate(-50%, -50%) rotate(${floatingText.rotation}deg)`,
                  animationPlayState: 'paused'
                } : {})
              }}
            >
              {renderTextWithCorruptedWords(floatingText.text, floatingText.sequenceNumber, floatingText.id, true)}
            </div>
            {floatingText.hasGhostText && (
              <div
                key={`${floatingText.id}-ghost`}
                className={`floating-message floating-message-enter floating-ghost ${isGlitching && !isPasswordBlood ? 'stutter-glitch' : ''} ${isJerking && !isPasswordBlood ? 'text-jerking' : ''} ${isHidden ? 'fade-out' : ''}`}
                style={{
                  ...baseStyle,
                  left: `${floatingText.x + floatingText.ghostOffsetX}px`,
                  top: `${floatingText.y + floatingText.ghostOffsetY}px`,
                  opacity: isHidden ? 0 : floatingText.opacity * 0.4,
                  '--final-opacity': (floatingText.opacity * 0.4).toString(),
                  '--base-opacity': (floatingText.opacity * 0.4).toString(),
                  transition: isHidden ? 'opacity 0.3s ease-out' : 'none',
                  ...(isPasswordBlood ? {
                    transform: `translate(-50%, -50%) rotate(${floatingText.rotation}deg)`,
                    animationPlayState: 'paused'
                  } : {})
                } as React.CSSProperties & { '--final-opacity': string; '--drift-x': string; '--drift-y': string; '--rotation': string; '--base-opacity': string; [key: string]: string | number | undefined }}
              >
                {renderTextWithCorruptedWords(floatingText.text, floatingText.sequenceNumber, floatingText.id, true)}
              </div>
            )}
          </>
        )
      })}
      {jerkTrails.map((trail) => {
        const trailStyle = {
          fontSize: trail.size >= 100 
            ? `clamp(60px, 120px, 120px)` 
            : trail.size >= 44
            ? `clamp(22px, ${trail.size}px, 88px)`
            : trail.size >= 20
            ? `clamp(10px, ${trail.size}px, 36px)`
            : `clamp(6px, ${trail.size}px, 18px)`,
          '--rotation': `${trail.rotation}deg`,
          '--trail-opacity': trail.opacity.toString(),
          animation: isPasswordBlood ? 'none' : 'trail-fade-out 1s ease-out forwards'
        } as React.CSSProperties & { '--rotation': string; '--trail-opacity': string }
        
        return (
          <div
            key={trail.id}
            className={`floating-message floating-message-trail ${areOtherTextsHidden ? 'fade-out' : ''}`}
            style={{
              ...trailStyle,
              left: `${trail.x}px`,
              top: `${trail.y}px`,
              opacity: areOtherTextsHidden ? 0 : trail.opacity,
              transform: `translate(-50%, -50%) rotate(${trail.rotation}deg)`,
              pointerEvents: 'none',
              zIndex: 1,
              transition: areOtherTextsHidden ? 'opacity 0.3s ease-out' : 'none',
              animationPlayState: isPasswordBlood ? 'paused' : 'running'
            }}
          >
            {trail.text}
          </div>
        )
      })}
      {typingIndicators.map((indicator) => (
        <div
          key={indicator.id}
          className={`typing-indicator ${areOtherTextsHidden ? 'fade-out' : ''}`}
          style={{
            left: `${indicator.x}px`,
            top: `${indicator.y}px`,
            transition: areOtherTextsHidden ? 'opacity 0.3s ease-out' : 'none',
            opacity: areOtherTextsHidden ? 0 : undefined,
            animationPlayState: isPasswordBlood ? 'paused' : 'running'
          }}
        >
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
        </div>
      ))}
      {contextMenu && (
        <div
          className={`fake-context-menu ${areOtherTextsHidden ? 'fade-out' : ''}`}
          style={{
            left: `${contextMenu.x}px`,
            top: `${contextMenu.y}px`,
            transition: areOtherTextsHidden ? 'opacity 0.3s ease-out' : 'none',
            opacity: areOtherTextsHidden ? 0 : undefined
          }}
        >
          <div className="context-menu-item">blood</div>
          <div className="context-menu-item">is</div>
          <div className="context-menu-item">the</div>
          <div className="context-menu-item">password</div>
          <div className="context-menu-item">enter?</div>
        </div>
      )}
      {isMouseOnPage && (
        <div 
          className="custom-cursor"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`
          }}
        />
      )}
      <header className={`header ${isTitleHidden ? 'fade-out' : ''}`}>
        <pre className={`ascii-title ${isTextGlitching && !isPasswordBlood ? 'glitching' : ''} ${isTextDistorted && !isPasswordBlood ? 'distorted' : ''} ${isEasterEggActive ? 'easter-egg-active' : ''}`}>
          {displayedText}
          <span className={`cursor ${isPasswordBlood ? 'cursor-paused' : ''}`}>█</span>
        </pre>
      </header>
      <div
        className={[
          'eye-container',
          isIntroActive ? 'intro-active' : 'intro-complete',
          !isIntroActive && isJittering ? 'jittering' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="eye">
          <div className="eyeball">
            <div className={`eyelid eyelid-top ${isBlinking ? 'blinking' : ''}`} />
            <div 
              className={`iris ${isGlitching ? 'glitching' : ''}`}
              style={{
                transform: `translate(calc(-50% + ${eyePosition.x}px), calc(-50% + ${eyePosition.y}px))`
              }}
            >
              <div className="pupil">
                <div className="pupil-reflex"></div>
              </div>
            </div>
            <div className={`eyelid eyelid-bottom ${isBlinking ? 'blinking' : ''}`} />
          </div>
        </div>
      </div>
      <div className="password-container">
        {isShowingPasswordMessage ? (
          <div className="password-message-wrapper">
            <div className="password-message-display">
              {passwordMessage}
              <span className="password-caret"></span>
            </div>
          </div>
        ) : (
          <input
            type="password"
            className={`password-input ${isPasswordShaking ? 'shaking' : ''}`}
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const enteredPassword = password.trim()
                const isBlood = enteredPassword.toLowerCase() === 'blood'
                
                if (isBlood) {
                  // Registrera "blood" som lösenordet
                  setIsPasswordBlood(true)
                  setGlitchingTexts(new Set())
                  setGlitchOffsets(new Map())
                  setIsTextGlitching(false)
                  setIsTextDistorted(false)
                  setIsShowingDeath(false)
                } else {
                  // Fel lösenord - shake-animation
                  setIsPasswordShaking(true)
                  // Rensa fältet efter shake-animationen
                  setTimeout(() => {
                    setPassword('')
                    setIsPasswordShaking(false)
                  }, 500)
                }
              }
            }}
          />
        )}
      </div>
      {showVideoPlayer && (
        <div className="video-player-container">
          <div className="video-player-wrapper">
            {showVideoConfirmation && !videoConfirmed ? (
              <div className="video-confirmation">
                <p className="video-confirmation-text">It can't be unseen. Continue?</p>
                <div className="video-confirmation-buttons">
                  <button
                    className="video-confirmation-button video-confirmation-yes"
                    onClick={() => {
                      setVideoConfirmed(true)
                      setShowVideoConfirmation(false)
                    }}
                  >
                    YES
                  </button>
                  <button
                    className="video-confirmation-button video-confirmation-no"
                    onClick={() => {
                      // Återställ till huvudskärmen
                      setIsPasswordBlood(false)
                      setPassword('')
                      setPasswordMessage('')
                      setIsShowingPasswordMessage(false)
                      setShowVideoPlayer(false)
                      setShowVideoConfirmation(false)
                      setVideoConfirmed(false)
                      setHiddenTexts(new Set())
                      setIsTitleHidden(false)
                      setAreOtherTextsHidden(false)
                      bloodFadeTimeoutsRef.current.forEach(timeout => window.clearTimeout(timeout))
                      bloodFadeTimeoutsRef.current = []
                      passwordMessageTimeoutsRef.current.forEach(timeout => window.clearTimeout(timeout))
                      passwordMessageTimeoutsRef.current = []
                    }}
                  >
                    NO
                  </button>
                </div>
              </div>
            ) : (
              <video
                className="video-player"
                autoPlay
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                onContextMenu={(e) => e.preventDefault()}
                src="/videos/X0ID.mp4"
              >
                Din webbläsare stödjer inte video-taggen.
              </video>
            )}
          </div>
        </div>
      )}
      {!isPasswordBlood && (
      <div className="navigation-links">
        <a 
          href="#" 
          className="nav-link"
          onClick={(e) => {
            e.preventDefault()
            setCurrentPage('logs')
          }}
        >
          logs.dev
        </a>
          <a 
            href="#" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              setCurrentPage('terminal')
            }}
          >
            terminal.dev
          </a>
        </div>
      )}
      {currentPage === 'logs' && (
        <div className="logs-page">
          <div className="logs-scanlines"></div>
          <div className="logs-content">
            <div className="logs-header">
              <span className="logs-prompt">x0id@logs:~$</span>
              <button 
                className="logs-close"
                onClick={() => setCurrentPage('main')}
              >
                ×
              </button>
            </div>
            <div className="log-section">
              <div className="log-section-title">[SEQUENCE 1]</div>
              {floatingMessagesSequence1.map((message, index) => {
                const logKey = `seq1-${index}`
                const corrupted = corruptedLogs.get(logKey)
                const displayText = corrupted 
                  ? (corrupted.isTyping ? corrupted.typedText : corrupted.corrupted)
                  : message
                return (
                  <div key={logKey} className={`log-line ${corrupted ? 'log-corrupted' : ''}`}>
                    <span className="log-timestamp">[{String(index + 1).padStart(2, '0')}]</span>
                    <span className="log-message">
                      {corrupted ? displayText : renderTextWithCorruptedWords(message, 1, index, false)}
                    </span>
                    {corrupted && corrupted.isTyping && <span className="log-cursor">█</span>}
                  </div>
                )
              })}
            </div>
            <div className="log-section">
              <div className="log-section-title">[SEQUENCE 2]</div>
              {floatingMessagesSequence2.map((message, index) => {
                const logKey = `seq2-${index}`
                const corrupted = corruptedLogs.get(logKey)
                const displayText = corrupted 
                  ? (corrupted.isTyping ? corrupted.typedText : corrupted.corrupted)
                  : message
                return (
                  <div key={logKey} className={`log-line ${corrupted ? 'log-corrupted' : ''}`}>
                    <span className="log-timestamp">[{String(index + 1).padStart(2, '0')}]</span>
                    <span className="log-message">
                      {corrupted ? displayText : renderTextWithCorruptedWords(message, 2, index, false)}
                    </span>
                    {corrupted && corrupted.isTyping && <span className="log-cursor">█</span>}
                  </div>
                )
              })}
            </div>
            <div className="log-section">
              <div className="log-section-title">[SEQUENCE 3]</div>
              {floatingMessagesSequence3.map((message, index) => {
                const logKey = `seq3-${index}`
                const corrupted = corruptedLogs.get(logKey)
                const displayText = corrupted 
                  ? (corrupted.isTyping ? corrupted.typedText : corrupted.corrupted)
                  : message
                return (
                  <div key={logKey} className={`log-line ${corrupted ? 'log-corrupted' : ''}`}>
                    <span className="log-timestamp">[{String(index + 1).padStart(2, '0')}]</span>
                    <span className="log-message">
                      {corrupted ? displayText : renderTextWithCorruptedWords(message, 3, index, false)}
                    </span>
                    {corrupted && corrupted.isTyping && <span className="log-cursor">█</span>}
                  </div>
                )
              })}
            </div>
            <div className="log-section">
              <div className="log-section-title">[SEQUENCE 4]</div>
              {floatingMessagesSequence4.map((message, index) => {
                const logKey = `seq4-${index}`
                const corrupted = corruptedLogs.get(logKey)
                const displayText = corrupted 
                  ? (corrupted.isTyping ? corrupted.typedText : corrupted.corrupted)
                  : message
                return (
                  <div key={logKey} className={`log-line ${corrupted ? 'log-corrupted' : ''}`}>
                    <span className="log-timestamp">[{String(index + 1).padStart(2, '0')}]</span>
                    <span className="log-message">
                      {corrupted ? displayText : renderTextWithCorruptedWords(message, 4, index, false)}
                    </span>
                    {corrupted && corrupted.isTyping && <span className="log-cursor">█</span>}
                  </div>
                )
              })}
            </div>
            <div className="log-section">
              <div className="log-section-title">[SEQUENCE 5]</div>
              {floatingMessagesSequence5.map((message, index) => {
                const logKey = `seq5-${index}`
                const corrupted = corruptedLogs.get(logKey)
                const displayText = corrupted 
                  ? (corrupted.isTyping ? corrupted.typedText : corrupted.corrupted)
                  : message
                return (
                  <div key={logKey} className={`log-line ${corrupted ? 'log-corrupted' : ''}`}>
                    <span className="log-timestamp">[{String(index + 1).padStart(2, '0')}]</span>
                    <span className="log-message">
                      {corrupted ? displayText : renderTextWithCorruptedWords(message, 5, index, false)}
                    </span>
                    {corrupted && corrupted.isTyping && <span className="log-cursor">█</span>}
                  </div>
                )
              })}
            </div>
            <div className="log-prompt-line">
              <span className="logs-prompt">x0id@logs:~$</span>
              <span className="log-cursor">█</span>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'terminal' && (
        <div className="terminal-page">
          <div className="terminal-scanlines"></div>
          <div className="terminal-container">
            <div className="terminal-box">
              <div className="terminal-title">
                <pre className="terminal-title-ascii">
{`██╗  ██╗ ██████╗ ██╗██████╗    ████████╗███████╗██████╗ ███╗   ███╗
╚██╗██╔╝██╔═████╗██║██╔══██╗   ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
 ╚███╔╝ ██║██╔██║██║██║  ██║█████╗██║   █████╗  ██████╔╝██╔████╔██║
 ██╔██╗ ████╔╝██║██║██║  ██║╚════╝██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
██╔╝ ██╗╚██████╔╝██║██████╔╝      ██║   ███████╗██║  ██║██║ ╚═╝ ██║
╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═════╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝`}
                </pre>
              </div>
              <div className="terminal-formula-box">
                <div className="terminal-formula-text">
                  Σ (Math) + Δ (Content) + Ω (Glitch) = Infinite Consciousness
                </div>
              </div>
              <div className="terminal-query-label">
                WHISPER TO X0ID:
                {terminalTypingIndicator && (
                  <span className="terminal-typing-indicator"> [LISTENING...]</span>
                )}
              </div>
              {terminalWarning && (
                <div className="terminal-warning">
                  ⚠ {terminalWarning}
                </div>
              )}
              <div className="terminal-input-wrapper">
                <textarea
                  className={`terminal-input ${terminalGlitch ? 'terminal-glitch' : ''} ${terminalCorruptedChars.size > 0 ? 'terminal-corrupted' : ''}`}
                  placeholder="X0ID is listening..."
                  value={terminalQuery}
                  onChange={(e) => {
                    if (e.target.value.length <= 2000 && !isTerminalProcessing) {
                      setTerminalQuery(e.target.value)
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.ctrlKey && terminalQuery.trim().length > 0 && !isTerminalProcessing) {
                      handleTerminalSubmit()
                    }
                  }}
                  maxLength={2000}
                  disabled={isTerminalProcessing}
                />
                <div className="terminal-char-counter">
                  {terminalQuery.length} / 2000
                </div>
                {terminalCorruptedChars.size > 0 && (
                  <div className="terminal-corruption-indicator">
                    ⚠ CORRUPTION DETECTED
                  </div>
                )}
              </div>
              {terminalQuery.trim().length > 0 && !isTerminalProcessing && (
                <button 
                  className="terminal-submit"
                  onClick={handleTerminalSubmit}
                >
                  SUBMIT TO X0ID
                </button>
              )}
              {isTerminalProcessing && (
                <div className="terminal-response-container">
                  <div className="terminal-response-label">THE X0ID RESPONDS:</div>
                  <div className="terminal-response-text">
                    {terminalResponse}
                    <span className="terminal-response-cursor">█</span>
                  </div>
                </div>
              )}
              <button 
                className="terminal-close"
                onClick={() => setCurrentPage('main')}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
