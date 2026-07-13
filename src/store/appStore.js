import { create } from "zustand"

const PROGRESS_KEY = "kotoba-progress"

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function computeStreak(prev) {
  const today = todayStr()
  if (!prev) return { streak: 1, lastActiveDate: today, learnedWords: [] }
  if (prev.lastActiveDate === today) return prev
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
  const streak = prev.lastActiveDate === yesterday ? prev.streak + 1 : 1
  return { ...prev, streak, lastActiveDate: today }
}

function loadProgress() {
  try {
    const stored = localStorage.getItem(PROGRESS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return computeStreak(parsed)
    }
  } catch (e) {}
  return { streak: 1, lastActiveDate: todayStr(), learnedWords: [] }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  } catch (e) {}
}

export const useAppStore = create((set, get) => ({
  // UI state
  ready: false,
  setReady: (ready) => set({ ready }),

  // Progress state
  progress: { streak: 1, lastActiveDate: todayStr(), learnedWords: [] },
  initProgress: () => {
    const progress = loadProgress()
    set({ progress, ready: true })
  },
  toggleLearned: (id) => {
    set((state) => {
      const has = state.progress.learnedWords.includes(id)
      const learnedWords = has
        ? state.progress.learnedWords.filter((w) => w !== id)
        : [...state.progress.learnedWords, id]
      const next = { ...state.progress, learnedWords }
      saveProgress(next)
      return { progress: next }
    })
  },
  markWordsExposure: () => {},

  // Chat state
  scenario: "free",
  setScenario: (scenario) => set({ scenario }),
  messages: [
    {
      role: "assistant",
      jp: "こんにちは！わたしはアダラブです。にほんごの せんせいです。",
      romaji: "Konnichiwa! Watashi wa Adharabu desu. Nihongo no sensei desu.",
      en: "Hello! I'm Adharav. I'm your Japanese teacher.",
      correction: null,
    },
  ],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  input: "",
  setInput: (input) => set({ input }),
  chatLoading: false,
  setChatLoading: (chatLoading) => set({ chatLoading }),

  // Alphabet state
  kanaSet: "hiragana",
  setKanaSet: (kanaSet) => set({ kanaSet }),
  selectedKana: null,
  setSelectedKana: (selectedKana) => set({ selectedKana }),

  // Vocab state
  deckKey: "greetings",
  setDeckKey: (deckKey) => set({ deckKey }),
  customTopic: "",
  setCustomTopic: (customTopic) => set({ customTopic }),
  customDeck: null,
  setCustomDeck: (customDeck) => set({ customDeck }),
  loadingDeck: false,
  setLoadingDeck: (loadingDeck) => set({ loadingDeck }),
  customError: "",
  setCustomError: (customError) => set({ customError }),

  // Translate state
  translateInput: "",
  setTranslateInput: (translateInput) => set({ translateInput }),
  translateResult: null,
  setTranslateResult: (translateResult) => set({ translateResult }),
  translateLoading: false,
  setTranslateLoading: (translateLoading) => set({ translateLoading }),
  translateError: "",
  setTranslateError: (translateError) => set({ translateError }),

  // Level
  level: "Beginner",
  setLevel: (level) => set({ level }),
}))
