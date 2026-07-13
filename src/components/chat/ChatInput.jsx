import { useCallback } from "react"
import { useSpeechRecognition } from "../../hooks/useSpeech"
import { useChat } from "../../hooks/useChat"

export default function ChatInput() {
  const { send, input, setInput, loading } = useChat()
  const handleTranscript = useCallback((t) => setInput((prev) => (prev ? prev + " " + t : t)), [setInput])
  const { start, stop, listening, supported } = useSpeechRecognition(handleTranscript)

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "12px 16px",
        borderTop: "1px solid var(--paper-dim)",
        background: "rgba(255,255,255,0.5)",
      }}
    >
      {supported && (
        <button
          onClick={listening ? stop : start}
          aria-label="Speak in Japanese"
          style={{
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            flexShrink: 0,
            cursor: "pointer",
            background: listening ? "var(--vermillion)" : "var(--indigo)",
            color: "#fff",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          {listening ? "●" : "🎤"}
        </button>
      )}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="日本語で書いてね…"
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: 20,
          border: "1px solid var(--paper-dim)",
          fontSize: 14,
          background: "#fff",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--indigo)"
          e.target.style.boxShadow = "0 0 0 3px rgba(44,71,112,0.1)"
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--paper-dim)"
          e.target.style.boxShadow = "none"
        }}
      />
      <button
        onClick={() => send()}
        disabled={loading || !input.trim()}
        className="btn-primary"
        style={{
          borderRadius: 20,
          padding: "0 18px",
          opacity: loading || !input.trim() ? 0.5 : 1,
        }}
      >
        送る
      </button>
    </div>
  )
}
