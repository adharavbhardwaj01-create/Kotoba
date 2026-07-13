import { useAppStore } from "../../store/appStore"
import Seal from "../ui/Seal"

export default function Header() {
  const { progress, level, setLevel } = useAppStore()

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        borderBottom: "1px solid var(--paper-dim)",
      }}
    >
      <div>
        <div className="disp" style={{ fontSize: 20, fontWeight: 800 }}>
          Kotoba — 日本語の先生
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Your Japanese tutor</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>覚えた単語 · learned</div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{progress.learnedWords.length}</div>
        </div>
        <Seal n={progress.streak} />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid var(--ink-soft)",
            background: "#fff",
            fontSize: 13,
          }}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>
    </div>
  )
}
