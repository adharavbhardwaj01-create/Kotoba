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
      className="card card-interactive"
      style={{
        padding: 32,
        textAlign: "center",
        minHeight: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "linear-gradient(180deg, #fff 0%, var(--paper-light) 100%)",
      }}
      onClick={() => setFlipped(!flipped)}
    >
      {!flipped ? (
        <>
          <span className="disp" style={{ fontSize: 52, fontWeight: 800, color: "var(--indigo)", lineHeight: 1.2 }}>
            {step.word}
          </span>
          <div className="mono" style={{ fontSize: 15, color: "var(--gold)", marginTop: 12, letterSpacing: "0.03em" }}>
            {step.reading}
          </div>
          <div style={{ marginTop: 16 }}>
            <SpeakerBtn text={step.audio || step.word} size={16} />
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: "var(--ink-faint)" }}>
            Tap to reveal meaning
          </div>
        </>
      ) : (
        <>
          <span className="disp" style={{ fontSize: 36, fontWeight: 800, color: "var(--indigo)", lineHeight: 1.2 }}>
            {step.word}
          </span>
          <div className="mono" style={{ fontSize: 13, color: "var(--gold)", marginTop: 8 }}>
            {step.reading}
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 16, color: "var(--ink)" }}>
            {step.meaning}
          </div>
          <div style={{ marginTop: 12 }}>
            <SpeakerBtn text={step.audio || step.word} size={16} />
          </div>
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
    <div className="card" style={{ padding: 24 }}>
      <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 20, textAlign: "center", lineHeight: 1.5 }}>
        {step.question}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {step.options.map((opt, idx) => {
          let bg = "#fff"
          let border = "1px solid var(--paper-dim)"
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
            bg = "rgba(44, 71, 112, 0.08)"
            border = "2px solid var(--indigo)"
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                padding: "14px 16px",
                borderRadius: 12,
                border,
                background: bg,
                color,
                fontSize: 15,
                cursor: answered ? "default" : "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
                boxShadow: answered && idx === step.correct ? "0 2px 8px rgba(94,122,60,0.2)" : "none",
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
    <div className="card" style={{ padding: 24 }}>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, textAlign: "center", color: "var(--ink-soft)" }}>
        Match Japanese to English
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
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
                  padding: "14px 12px",
                  borderRadius: 10,
                  border: isMatched
                    ? "2px solid var(--bamboo)"
                    : isSelected
                    ? "2px solid var(--indigo)"
                    : "1px solid var(--paper-dim)",
                  background: isMatched
                    ? "var(--bamboo)"
                    : isSelected
                    ? "rgba(44, 71, 112, 0.08)"
                    : "#fff",
                  color: isMatched ? "#fff" : "var(--ink)",
                  fontSize: 18,
                  fontWeight: 700,
                  cursor: isMatched ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isMatched ? "0 2px 6px rgba(94,122,60,0.2)" : "none",
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
                  padding: "14px 12px",
                  borderRadius: 10,
                  border: isMatched
                    ? "2px solid var(--bamboo)"
                    : isSelected
                    ? "2px solid var(--indigo)"
                    : "1px solid var(--paper-dim)",
                  background: isMatched
                    ? "var(--bamboo)"
                    : isSelected
                    ? "rgba(44, 71, 112, 0.08)"
                    : "#fff",
                  color: isMatched ? "#fff" : "var(--ink)",
                  fontSize: 14,
                  cursor: isMatched ? "default" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isMatched ? "0 2px 6px rgba(94,122,60,0.2)" : "none",
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
