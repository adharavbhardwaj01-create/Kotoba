import { useState } from "react"
import SpeakerBtn from "../ui/SpeakerBtn"

export default function WordCard({ card, id, learned, onToggleLearned }) {
  const [flipped, setFlipped] = useState(false)
  const [word, romaji, meaning] = card

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      style={{
        border: learned ? "2px solid var(--bamboo)" : "1px solid var(--paper-dim)",
        borderRadius: 14,
        background: "#fff",
        padding: 18,
        cursor: "pointer",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {learned && (
        <span style={{ position: "absolute", top: 8, right: 10, fontSize: 12, color: "var(--bamboo)", fontWeight: 700 }}>
          ✓ 覚えた
        </span>
      )}
      {!flipped ? (
        <div style={{ textAlign: "center" }}>
          <div className="disp" style={{ fontSize: 24, fontWeight: 700 }}>{word}</div>
          <div className="mono" style={{ fontSize: 12, color: "var(--gold)", marginTop: 6 }}>{romaji}</div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 600 }}>{meaning}</div>
        </div>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 12 }}
        onClick={(e) => e.stopPropagation()}
      >
        <SpeakerBtn text={word} size={12} />
        <button
          onClick={() => onToggleLearned(id)}
          style={{
            fontSize: 11,
            border: "1px solid var(--bamboo)",
            color: learned ? "#fff" : "var(--bamboo)",
            background: learned ? "var(--bamboo)" : "transparent",
            borderRadius: 14,
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          {learned ? "覚えた" : "覚える"}
        </button>
      </div>
    </div>
  )
}
