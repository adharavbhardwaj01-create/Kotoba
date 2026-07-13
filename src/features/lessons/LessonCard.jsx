import { useState } from "react"
import SpeakerBtn from "../../components/ui/SpeakerBtn"

export default function LessonCard({ step, onComplete }) {
  if (step.type === "vocab") return <VocabCard step={step} onComplete={onComplete} />
  if (step.type === "quiz") return <QuizCard step={step} onComplete={onComplete} />
  if (step.type === "match") return <MatchCard step={step} onComplete={onComplete} />
  return null
}

function VocabCard({ step, onComplete }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--paper-dim)",
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => setFlipped(!flipped)}
    >
      {!flipped ? (
        <>
          <span className="disp" style={{ fontSize: 48, fontWeight: 800, color: "var(--indigo)" }}>
            {step.word}
          </span>
          <div className="mono" style={{ fontSize: 16, color: "var(--gold)", marginTop: 12 }}>
            {step.reading}
          </div>
          <SpeakerBtn text={step.audio || step.word} size={18} />
          <div style={{ marginTop: 16, fontSize: 12, color: "var(--ink-soft)" }}>
            Tap to reveal meaning
          </div>
        </>
      ) : (
        <>
          <span className="disp" style={{ fontSize: 36, fontWeight: 800, color: "var(--indigo)" }}>
            {step.word}
          </span>
          <div className="mono" style={{ fontSize: 14, color: "var(--gold)", marginTop: 8 }}>
            {step.reading}
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, marginTop: 12 }}>
            {step.meaning}
          </div>
          <SpeakerBtn text={step.audio || step.word} size={18} />
        </>
      )}
    </div>
  )
}

function QuizCard({ step, onComplete }) {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (idx) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    setTimeout(() => onComplete(idx === step.correct), 1000)
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--paper-dim)",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, textAlign: "center" }}>
        {step.question}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {step.options.map((opt, idx) => {
          let bg = "transparent"
          let border = "1px solid var(--ink-soft)"
          let color = "var(--ink)"

          if (answered) {
            if (idx === step.correct) {
              bg = "var(--bamboo)"
              border = "2px solid var(--bamboo)"
              color = "#fff"
            } else if (idx === selected) {
              bg = "var(--vermillion)"
              border = "2px solid var(--vermillion)"
              color = "#fff"
            }
          } else if (idx === selected) {
            bg = "rgba(44, 71, 112, 0.1)"
            border = "2px solid var(--indigo)"
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                border,
                background: bg,
                color,
                fontSize: 15,
                cursor: answered ? "default" : "pointer",
                textAlign: "left",
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MatchCard({ step, onComplete }) {
  const [selectedJp, setSelectedJp] = useState(null)
  const [selectedEn, setSelectedEn] = useState(null)
  const [matched, setMatched] = useState([])
  const [shuffledEn] = useState(() => [...step.pairs].sort(() => Math.random() - 0.5))

  const handleSelectJp = (pair) => {
    if (matched.includes(pair.jp)) return
    setSelectedJp(pair)
    if (selectedEn) {
      if (pair.en === selectedEn.en) {
        const newMatched = [...matched, pair.jp]
        setMatched(newMatched)
        setSelectedJp(null)
        setSelectedEn(null)
        if (newMatched.length === step.pairs.length) {
          setTimeout(() => onComplete(true), 500)
        }
      } else {
        setSelectedJp(null)
        setSelectedEn(null)
      }
    }
  }

  const handleSelectEn = (pair) => {
    if (matched.includes(pair.jp)) return
    setSelectedEn(pair)
    if (selectedJp) {
      if (selectedJp.en === pair.en) {
        const newMatched = [...matched, selectedJp.jp]
        setMatched(newMatched)
        setSelectedJp(null)
        setSelectedEn(null)
        if (newMatched.length === step.pairs.length) {
          setTimeout(() => onComplete(true), 500)
        }
      } else {
        setSelectedJp(null)
        setSelectedEn(null)
      }
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--paper-dim)",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, textAlign: "center" }}>
        Match Japanese to English
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {step.pairs.map((pair) => {
            const isMatched = matched.includes(pair.jp)
            const isSelected = selectedJp?.jp === pair.jp
            return (
              <button
                key={pair.jp}
                onClick={() => handleSelectJp(pair)}
                className="disp"
                style={{
                  padding: "12px",
                  borderRadius: 10,
                  border: isMatched
                    ? "2px solid var(--bamboo)"
                    : isSelected
                    ? "2px solid var(--indigo)"
                    : "1px solid var(--paper-dim)",
                  background: isMatched
                    ? "var(--bamboo)"
                    : isSelected
                    ? "rgba(44, 71, 112, 0.1)"
                    : "#fff",
                  color: isMatched ? "#fff" : "var(--ink)",
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: isMatched ? "default" : "pointer",
                }}
              >
                {pair.jp}
              </button>
            )
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {shuffledEn.map((pair) => {
            const isMatched = matched.includes(pair.jp)
            const isSelected = selectedEn?.jp === pair.jp
            return (
              <button
                key={pair.jp}
                onClick={() => handleSelectEn(pair)}
                style={{
                  padding: "12px",
                  borderRadius: 10,
                  border: isMatched
                    ? "2px solid var(--bamboo)"
                    : isSelected
                    ? "2px solid var(--indigo)"
                    : "1px solid var(--paper-dim)",
                  background: isMatched
                    ? "var(--bamboo)"
                    : isSelected
                    ? "rgba(44, 71, 112, 0.1)"
                    : "#fff",
                  color: isMatched ? "#fff" : "var(--ink)",
                  fontSize: 15,
                  cursor: isMatched ? "default" : "pointer",
                }}
              >
                {pair.en}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
