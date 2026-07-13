import { useEffect } from "react"
import { useAppStore } from "../store/appStore"

export function useProgress() {
  const { progress, initProgress, toggleLearned, markWordsExposure } = useAppStore()

  useEffect(() => {
    initProgress()
  }, [initProgress])

  return {
    progress,
    toggleLearned,
    markWordsExposure,
  }
}
