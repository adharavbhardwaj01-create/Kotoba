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
        padding: "12px 20px",
        borderBottom: "1px solid var(--paper-dim)",
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div>
        <div className="disp" style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Kotoba
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 1 }}>日本語の先生</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            borderRadius: 8,
            background: "var(--paper-light)",
          }}
        >
          <span style={{ fontSize: 11, color: "var(--ink-faint)" }}>覚えた</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--indigo)" }}>
            {progress.learnedWords.length}
          </span>
        </div>
        <Seal n={progress.streak} />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid var(--paper-dim)",
            background: "#fff",
            fontSize: 12,
            color: "var(--ink)",
            cursor: "pointer",
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
