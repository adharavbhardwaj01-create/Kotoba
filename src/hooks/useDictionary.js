import { useState, useCallback } from "react"

const JISHO_API = "https://jisho.org/api/v1/search/words"

export function useDictionary() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState("")

  const search = useCallback(async (query) => {
    const q = query.trim()
    if (!q) return

    setLoading(true)
    setError("")
    setSearched(q)

    try {
      const res = await fetch(`${JISHO_API}?keyword=${encodeURIComponent(q)}`)
      const data = await res.json()

      if (data.data && data.data.length > 0) {
        setResults(data.data)
      } else {
        setResults([])
        setError(`No results found for "${q}"`)
      }
    } catch (e) {
      setError("Failed to search dictionary. Please try again.")
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const clear = useCallback(() => {
    setResults([])
    setError("")
    setSearched("")
  }, [])

  return {
    results,
    loading,
    error,
    searched,
    search,
    clear,
  }
}

export function formatEntry(entry) {
  const word = entry.japanese?.[0]?.word || entry.japanese?.[0]?.reading || ""
  const reading = entry.japanese?.[0]?.reading || ""
  const jlpt = entry.jlpt?.[0] || null

  const senses = (entry.senses || []).map((sense) => ({
    partsOfSpeech: sense.parts_of_speech || [],
    definitions: sense.english_definitions || [],
    tags: sense.tags || [],
  }))

  return {
    word,
    reading,
    jlpt,
    senses,
    isCommon: entry.is_common || false,
  }
}
