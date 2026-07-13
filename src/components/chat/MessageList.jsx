import { useRef, useEffect } from "react"
import { useAppStore } from "../../store/appStore"
import SpeakerBtn from "../ui/SpeakerBtn"

export default function MessageList() {
  const { messages, chatLoading } = useAppStore()
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, chatLoading])

  return (
    <div
      ref={scrollRef}
      style={{
        flex: 1,
        overflowY: "auto",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {messages.map((m, i) => (
        <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
          {m.role === "user" ? (
            <div
              style={{
                maxWidth: "78%",
                background: "var(--indigo)",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: "14px 14px 2px 14px",
              }}
            >
              {m.text}
            </div>
          ) : (
            <div style={{ maxWidth: "85%", display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--paper-dim)",
                  borderRadius: "2px 14px 14px 14px",
                  padding: "12px 14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="disp" style={{ fontSize: 19, fontWeight: 700 }}>{m.jp}</span>
                  {m.jp && <SpeakerBtn text={m.jp} size={13} />}
                </div>
                {m.romaji && (
                  <div className="mono" style={{ fontSize: 12.5, color: "var(--gold)", marginTop: 4 }}>
                    {m.romaji}
                  </div>
                )}
                {m.en && (
                  <div style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 2 }}>
                    {m.en}
                  </div>
                )}
              </div>
              {m.correction && (
                <div
                  style={{
                    border: "1.5px dashed var(--vermillion)",
                    borderRadius: 10,
                    padding: "8px 12px",
                    fontSize: 13,
                    background: "rgba(193,67,42,0.05)",
                  }}
                >
                  <div style={{ fontWeight: 700, color: "var(--vermillion)", marginBottom: 4 }}>
                    訂正 · Correction
                  </div>
                  <div><s style={{ color: "var(--ink-soft)" }}>{m.correction.original}</s></div>
                  <div style={{ color: "var(--bamboo)", fontWeight: 600 }}>{m.correction.corrected}</div>
                  <div style={{ color: "var(--ink-soft)", marginTop: 3 }}>{m.correction.note}</div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {chatLoading && (
        <div style={{ color: "var(--ink-soft)", fontSize: 13 }}>
          アダラブが 入力中… (Adharav is typing…)
        </div>
      )}
    </div>
  )
}
