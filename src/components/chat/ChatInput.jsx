import { useCallback } from "react"
import { useSpeechRecognition } from "../../hooks/useSpeech"
import { useChat } from "../../hooks/useChat"

export default function ChatInput() {
  const { send, input, setInput, loading } = useChat()
  const handleTranscript = useCallback((t) => setInput((prev) => (prev ? prev + " " + t : t)), [setInput])
  const { start, stop, listening, supported } = useSpeechRecognition(handleTranscript)

  return (
    <div style={{ display: "flex", gap: 8, padding: 12, borderTop: "1px solid var(--paper-dim)" }}>
      {supported && (
        <button
          onClick={listening ? stop : start}
          aria-label="Speak in Japanese"
          style={{
            border: "none",
            borderRadius: "50%",
            width: 44,
            height: 44,
            flexShrink: 0,
            cursor: "pointer",
            background: listening ? "var(--vermillion)" : "var(--indigo)",
            color: "#fff",
            fontSize: 18,
          }}
        >
          {listening ? "●" : "🎤"}
        </button>
      )}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="日本語で書いてね… (write in Japanese)"
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: 22,
          border: "1px solid var(--ink-soft)",
          fontSize: 14,
          background: "#fff",
        }}
      />
      <button
        onClick={() => send()}
        disabled={loading}
        style={{
          border: "none",
          borderRadius: 22,
          padding: "0 20px",
          background: "var(--vermillion)",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        送る
      </button>
    </div>
  )
}
