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
          className="input"
          style={{ flex: 1 }}
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="btn-secondary"
          style={{ borderRadius: 20, padding: "0 18px" }}
        >
          {loading ? "検索中…" : "検索"}
        </button>
        {searched && (
          <button
            onClick={() => { clear(); setQuery("") }}
            className="btn-outline"
            style={{ borderRadius: 20, padding: "0 14px" }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "rgba(193,67,42,0.06)",
            border: "1px solid rgba(193,67,42,0.15)",
            color: "var(--vermillion)",
            fontSize: 13,
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      {/* Results */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {results.map((entry, i) => (
          <DictionaryEntry key={entry.id || i} entry={formatEntry(entry)} index={i} />
        ))}
      </div>

      {/* Empty state */}
      {!loading && !error && results.length === 0 && searched && (
        <div style={{ textAlign: "center", padding: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
          <div style={{ fontSize: 14, color: "var(--ink-soft)" }}>
            No results found for "{searched}"
          </div>
        </div>
      )}

      {/* Initial state */}
      {!searched && !loading && (
        <div style={{ textAlign: "center", padding: 48 }}>
          <div
            className="disp"
            style={{
              fontSize: 56,
              color: "var(--indigo)",
              marginBottom: 12,
              opacity: 0.15,
            }}
          >
            辞
          </div>
          <div className="disp" style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
            Japanese Dictionary
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-faint)", marginBottom: 16 }}>
            Powered by Jisho.org
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {["漢字", "sushi", "こんにちは", "to eat"].map((term) => (
              <button
                key={term}
                onClick={() => { setQuery(term); search(term) }}
                className="btn-outline"
                style={{ borderRadius: 16, padding: "6px 12px", fontSize: 12 }}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function DictionaryEntry({ entry, index }) {
  const [expanded, setExpanded] = useState(false)
  const { word, reading, jlpt, senses, isCommon } = entry

  return (
    <div
      className="fade-in"
      style={{
        background: "#fff",
        border: "1px solid var(--paper-dim)",
        borderRadius: 14,
        padding: 16,
        cursor: "pointer",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        animationDelay: `${index * 0.05}s`,
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <span className="disp" style={{ fontSize: 22, fontWeight: 700, color: "var(--indigo)" }}>
          {word}
        </span>
        {word !== reading && (
          <span className="mono" style={{ fontSize: 13, color: "var(--gold)" }}>
            {reading}
          </span>
        )}
        <SpeakerBtn text={word} size={11} />
        <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
          {isCommon && <span className="badge badge-common">COMMON</span>}
          {jlpt && <span className="badge badge-jlpt">{jlpt}</span>}
        </div>
      </div>

      {/* First definition (always visible) */}
      {senses.length > 0 && (
        <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.5 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 10,
              color: "var(--ink-faint)",
              background: "var(--paper-light)",
              padding: "2px 6px",
              borderRadius: 4,
              marginRight: 6,
            }}
          >
            {senses[0].partsOfSpeech[0]}
          </span>
          {senses[0].definitions.slice(0, 3).join(", ")}
          {senses[0].definitions.length > 3 && "…"}
        </div>
      )}

      {/* Expanded definitions */}
      {expanded && senses.length > 1 && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--paper-dim)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {senses.slice(1).map((sense, i) => (
              <div key={i} style={{ fontSize: 13 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--ink-faint)",
                      background: "var(--paper-light)",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    {sense.partsOfSpeech[0]}
                  </span>
                </div>
                <div style={{ color: "var(--ink)", lineHeight: 1.5 }}>
                  {sense.definitions.join("; ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expand indicator */}
      {senses.length > 1 && (
        <div
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 11,
            color: "var(--ink-faint)",
          }}
        >
          {expanded ? "▲ Less" : `▼ ${senses.length - 1} more`}
        </div>
      )}
    </div>
  )
}
