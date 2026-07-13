import { useState } from "react"
import { useDictionary, formatEntry } from "../../hooks/useDictionary"
import SpeakerBtn from "../ui/SpeakerBtn"

export default function DictionaryTab() {
  const [query, setQuery] = useState("")
  const { results, loading, error, searched, search, clear } = useDictionary()

  const handleSearch = () => {
    if (query.trim()) search(query)
  }

  return (
    <div style={{ padding: 16 }}>
      {/* Search bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search in Japanese or English…"
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 20,
            border: "1px solid var(--ink-soft)",
            fontSize: 14,
            background: "#fff",
          }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{
            border: "none",
            borderRadius: 20,
            padding: "0 20px",
            background: "var(--indigo)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {loading ? "検索中…" : "Search"}
        </button>
        {searched && (
          <button
            onClick={() => { clear(); setQuery("") }}
            style={{
              border: "1px solid var(--ink-soft)",
              borderRadius: 20,
              padding: "0 14px",
              background: "transparent",
              color: "var(--ink)",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{ color: "var(--vermillion)", fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}

      {/* Results */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {results.map((entry, i) => (
          <DictionaryEntry key={entry.id || i} entry={formatEntry(entry)} />
        ))}
      </div>

      {/* Empty state */}
      {!loading && !error && results.length === 0 && searched && (
        <div style={{ textAlign: "center", color: "var(--ink-soft)", padding: 40 }}>
          <div className="disp" style={{ fontSize: 18, marginBottom: 8 }}>辞書</div>
          <div style={{ fontSize: 13 }}>Search for a Japanese word or English meaning</div>
        </div>
      )}

      {/* Initial state */}
      {!searched && !loading && (
        <div style={{ textAlign: "center", color: "var(--ink-soft)", padding: 40 }}>
          <div className="disp" style={{ fontSize: 48, color: "var(--indigo)", marginBottom: 12 }}>辞</div>
          <div className="disp" style={{ fontSize: 18, marginBottom: 8 }}>Japanese Dictionary</div>
          <div style={{ fontSize: 13 }}>Powered by Jisho.org</div>
          <div style={{ fontSize: 12, marginTop: 8, color: "var(--ink-soft)" }}>
            Try: 漢字, sushi, こんにちは, to eat
          </div>
        </div>
      )}
    </div>
  )
}

function DictionaryEntry({ entry }) {
  const [expanded, setExpanded] = useState(false)
  const { word, reading, jlpt, senses, isCommon } = entry

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--paper-dim)",
        borderRadius: 14,
        padding: 16,
        cursor: "pointer",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span className="disp" style={{ fontSize: 24, fontWeight: 700, color: "var(--indigo)" }}>
          {word}
        </span>
        {word !== reading && (
          <span className="mono" style={{ fontSize: 14, color: "var(--gold)" }}>
            {reading}
          </span>
        )}
        <SpeakerBtn text={word} size={12} />
        {isCommon && (
          <span style={{
            fontSize: 10,
            padding: "2px 6px",
            borderRadius: 8,
            background: "var(--bamboo)",
            color: "#fff",
            fontWeight: 700,
          }}>
            COMMON
          </span>
        )}
        {jlpt && (
          <span style={{
            fontSize: 10,
            padding: "2px 6px",
            borderRadius: 8,
            background: "var(--indigo)",
            color: "#fff",
            fontWeight: 700,
          }}>
            {jlpt}
          </span>
        )}
      </div>

      {/* First definition (always visible) */}
      {senses.length > 0 && (
        <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>
          <span style={{ fontSize: 11, color: "var(--ink-soft)", marginRight: 6 }}>
            {senses[0].partsOfSpeech.join(", ")}
          </span>
          {senses[0].definitions.slice(0, 3).join(", ")}
          {senses[0].definitions.length > 3 && "…"}
        </div>
      )}

      {/* Expanded definitions */}
      {expanded && senses.length > 1 && (
        <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          {senses.slice(1).map((sense, i) => (
            <div key={i} style={{ fontSize: 13 }}>
              <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 2 }}>
                {sense.partsOfSpeech.join(", ")}
              </div>
              <div style={{ color: "var(--ink)" }}>
                {sense.definitions.join("; ")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Expand indicator */}
      {senses.length > 1 && (
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "var(--ink-soft)" }}>
          {expanded ? "▲ Less" : `▼ ${senses.length - 1} more`}
        </div>
      )}
    </div>
  )
}
