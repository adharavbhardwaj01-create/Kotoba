import { useAppStore } from "../../store/appStore"
import { SCENARIOS } from "../../constants/decks"
import MessageList from "./MessageList"
import ChatInput from "./ChatInput"

export default function ChatTab() {
  const { scenario, setScenario } = useAppStore()

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          padding: "12px 16px",
          borderBottom: "1px solid var(--paper-dim)",
        }}
      >
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenario(s.id)}
            style={{
              padding: "6px 12px",
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 13,
              border: scenario === s.id ? "2px solid var(--vermillion)" : "1px solid var(--ink-soft)",
              background: scenario === s.id ? "rgba(193,67,42,0.08)" : "transparent",
              color: "var(--ink)",
              fontWeight: scenario === s.id ? 700 : 400,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <MessageList />
      <ChatInput />
    </div>
  )
}
