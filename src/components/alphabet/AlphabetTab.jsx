import { useAppStore } from "../../store/appStore"
import KanaGrid from "./KanaGrid"

export default function AlphabetTab() {
  const { kanaSet, setKanaSet, setSelectedKana } = useAppStore()

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["hiragana", "katakana"].map((k) => (
          <button
            key={k}
            onClick={() => {
              setKanaSet(k)
              setSelectedKana(null)
            }}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 13,
              border: kanaSet === k ? "2px solid var(--vermillion)" : "1px solid var(--ink-soft)",
              background: kanaSet === k ? "rgba(193,67,42,0.08)" : "transparent",
              textTransform: "capitalize",
            }}
          >
            {k === "hiragana" ? "ひらがな Hiragana" : "カタカナ Katakana"}
          </button>
        ))}
      </div>
      <KanaGrid />
    </div>
  )
}
