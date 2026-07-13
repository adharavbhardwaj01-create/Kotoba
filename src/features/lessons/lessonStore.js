import { create } from "zustand"

const LESSONS_KEY = "kotoba-lessons"

function loadLessonProgress() {
  try {
    const stored = localStorage.getItem(LESSONS_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {}
  return {}
}

function saveLessonProgress(progress) {
  try {
    localStorage.setItem(LESSONS_KEY, JSON.stringify(progress))
  } catch (e) {}
}

export const useLessonStore = create((set, get) => ({
  // Current lesson state
  currentLesson: null,
  currentStep: 0,
  lessonComplete: false,

  // Lesson progress (which lessons are completed)
  completedLessons: {},

  // Match game state
  matchSelected: null,
  matchPairs: [],
  matchedPairs: [],

  // Init
  initLessons: () => {
    const progress = loadLessonProgress()
    set({ completedLessons: progress })
  },

  // Start a lesson
  startLesson: (lesson) => {
    set({
      currentLesson: lesson,
      currentStep: 0,
      lessonComplete: false,
      matchSelected: null,
      matchPairs: lesson.steps.find((s) => s.type === "match")?.pairs || [],
      matchedPairs: [],
    })
  },

  // Go to next step
  nextStep: () => {
    const { currentLesson, currentStep } = get()
    if (!currentLesson) return

    if (currentStep < currentLesson.steps.length - 1) {
      set({ currentStep: currentStep + 1 })
    } else {
      // Lesson complete
      const { completedLessons } = get()
      const updated = { ...completedLessons, [currentLesson.id]: true }
      saveLessonProgress(updated)
      set({ lessonComplete: true, completedLessons: updated })
    }
  },

  // Go to previous step
  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 })
    }
  },

  // Select match pair
  selectMatchPair: (pair) => {
    const { matchSelected, matchedPairs } = get()

    if (!matchSelected) {
      set({ matchSelected: pair })
    } else {
      // Check if match
      if (
        (matchSelected.jp === pair.en && matchSelected.en === pair.jp) ||
        (matchSelected.en === pair.en && matchSelected.jp === pair.jp)
      ) {
        set({
          matchedPairs: [...matchedPairs, matchSelected.jp],
          matchSelected: null,
        })
      } else {
        set({ matchSelected: null })
      }
    }
  },

  // Reset lesson
  resetLesson: () => {
    set({
      currentLesson: null,
      currentStep: 0,
      lessonComplete: false,
      matchSelected: null,
      matchedPairs: [],
    })
  },

  // Exit lesson
  exitLesson: () => {
    set({
      currentLesson: null,
      currentStep: 0,
      lessonComplete: false,
      matchSelected: null,
      matchedPairs: [],
    })
  },
}))
