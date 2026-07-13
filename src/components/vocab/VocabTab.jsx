import { useAppStore } from "../../store/appStore"
import { PRESET_DECKS } from "../../constants/decks"
import { askGorp, parseJSONLoose } from "../../api/gorp"
import WordCard from "./WordCard"

export default function VocabTab() {
  const {
    progress,
    toggleLearned,
    deckKey,
    setDeckKey,
    customTopic,
    setCustomTopic,
    customDeck,
    setCustomDeck,
    loadingDeck,
    setLoadingDeck,
    customError,
    setCustomError,
  } = useAppStore()

  const deck = deckKey === "custom" ? customDeck : PRESET_DECKS[deckKey]

  const generateDeck = async () => {
    if (!customTopic.trim() || loadingDeck) return
    setLoadingDeck(true)
    setCustomError("")

    const system = `You generate Japanese vocabulary flashcards for a language learner.
Respond ONLY with raw JSON (no markdown fences), an array of exactly 10 items, each shaped:
{"word":"Japanese word or short phrase","romaji":"romanized reading","meaning":"short English meaning"}`

    try {
      const raw = await askGorp(system, [{ role: "user", content: `Topic: ${customTopic}` }])
      const parsed = parseJSONLoose(raw)
      if (Array.isArray(parsed) && parsed.length) {
        setCustomDeck({
          label: customTopic,
          icon: "話",
          cards: parsed.map((c) => [c.word, c.romaji, c.meaning]),
        })
        setDeckKey("custom")
      } else {
        setCustomError("Could not generate a deck — try a different topic.")
      }
    } catch (e) {
      setCustomError("Something went wrong generating the deck.")
    } finally {
      setLoadingDeck(false)
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        {Object.entries(PRESET_DECKS).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setDeckKey(k)}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              border: deckKey === k ? "2px solid var(--vermillion)" : "1px solid var(--ink-soft)",
              background: deckKey === k ? "rgba(193,67,42,0.08)" : "transparent",
            }}
          >
            {v.icon} {v.label}
          </button>
        ))}
        {customDeck && (
          <button
            onClick={() => setDeckKey("custom")}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              border: deckKey === "custom" ? "2px solid var(--vermillion)" : "1px solid var(--ink-soft)",
              background: deckKey === "custom" ? "rgba(193,67,42,0.08)" : "transparent",
            }}
          >
            話 {customDeck.label}
          </button>
        )}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={customTopic}
          onChange={(e) => setCustomTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateDeck()}
          placeholder="Type any topic — e.g. weather, at the gym…"
          style={{
            flex: 1,
            padding: "9px 14px",
            borderRadius: 20,
            border: "1px solid var(--ink-soft)",
            fontSize: 13,
            background: "#fff",
          }}
        />
        <button
          onClick={generateDeck}
          disabled={loadingDeck}
          style={{
            border: "none",
            borderRadius: 20,
            padding: "0 18px",
            background: "var(--indigo)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loadingDeck ? "作成中…" : "Generate"}
        </button>
      </div>
      {customError && (
        <div style={{ color: "var(--vermillion)", fontSize: 13, marginBottom: 12 }}>
          {customError}
        </div>
      )}
      {deck && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: 12,
          }}
        >
          {deck.cards.map((card, i) => {
            const id = `${deckKey === "custom" ? "custom-" + customTopic : deckKey}-${i}`
            return (
              <WordCard
                key={id}
                id={id}
                card={card}
                learned={progress.learnedWords.includes(id)}
                onToggleLearned={toggleLearned}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
