import { useState, useEffect, useRef, useCallback } from "react"

export function useSpeechRecognition(onResult) {
  const recRef = useRef(null)
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setSupported(false)
      return
    }
    const rec = new SR()
    rec.lang = "ja-JP"
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      onResult(transcript)
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    recRef.current = rec
  }, [onResult])

  const start = useCallback(() => {
    if (!recRef.current) return
    try {
      recRef.current.start()
      setListening(true)
    } catch (e) {
      /* already started */
    }
  }, [])

  const stop = useCallback(() => {
    if (recRef.current) recRef.current.stop()
    setListening(false)
  }, [])

  return { start, stop, listening, supported }
}
