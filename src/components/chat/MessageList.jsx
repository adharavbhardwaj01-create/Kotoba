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
        padding: "16px 16px 8px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {messages.map((m, i) => (
        <div
          key={i}
          className="fade-in"
          style={{
            display: "flex",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start",
          }}
        >
          {m.role === "user" ? (
            <div
              style={{
                maxWidth: "78%",
                background: "linear-gradient(135deg, var(--indigo) 0%, var(--indigo-deep) 100%)",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: "14px 14px 2px 14px",
                boxShadow: "0 2px 8px rgba(44,71,112,0.2)",
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
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="disp" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.4 }}>
                    {m.jp}
                  </span>
                  {m.jp && <SpeakerBtn text={m.jp} size={12} />}
                </div>
                {m.romaji && (
                  <div className="mono" style={{ fontSize: 11, color: "var(--gold)", marginTop: 4, letterSpacing: "0.02em" }}>
                    {m.romaji}
                  </div>
                )}
                {m.en && (
                  <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.4 }}>
                    {m.en}
                  </div>
                )}
              </div>
              {m.correction && (
                <div
                  style={{
                    border: "1px dashed var(--vermillion)",
                    borderRadius: 10,
                    padding: "10px 12px",
                    fontSize: 12,
                    background: "rgba(193,67,42,0.04)",
                  }}
                >
                  <div style={{ fontWeight: 700, color: "var(--vermillion)", marginBottom: 4, fontSize: 11 }}>
                    訂正 · Correction
                  </div>
                  <div style={{ color: "var(--ink-faint)", textDecoration: "line-through" }}>{m.correction.original}</div>
                  <div style={{ color: "var(--bamboo)", fontWeight: 600, marginTop: 2 }}>{m.correction.corrected}</div>
                  <div style={{ color: "var(--ink-faint)", marginTop: 4, fontStyle: "italic" }}>{m.correction.note}</div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {chatLoading && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
          <div style={{ display: "flex", gap: 4 }}>
            <span className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-faint)" }} />
            <span className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-faint)", animationDelay: "0.2s" }} />
            <span className="pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-faint)", animationDelay: "0.4s" }} />
          </div>
          <span style={{ color: "var(--ink-faint)", fontSize: 12 }}>入力中…</span>
        </div>
      )}
    </div>
  )
}
