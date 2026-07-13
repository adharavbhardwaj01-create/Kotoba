import { useLessonStore } from "./lessonStore"
import LessonCard from "./LessonCard"

export default function LessonPage() {
  const {
    currentLesson,
    currentStep,
    lessonComplete,
    nextStep,
    prevStep,
    exitLesson,
    resetLesson,
  } = useLessonStore()

  if (!currentLesson) return null

  const step = currentLesson.steps[currentStep]
  const progress = ((currentStep + 1) / currentLesson.steps.length) * 100

  if (lessonComplete) {
    return (
      <div style={{ padding: 16, textAlign: "center" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--paper-dim)",
            borderRadius: 16,
            padding: 32,
          }}
        >
          <div className="stamp-anim" style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <div className="disp" style={{ fontSize: 24, fontWeight: 800, color: "var(--indigo)", marginBottom: 8 }}>
            おめでとう！
          </div>
          <div style={{ fontSize: 16, color: "var(--ink-soft)", marginBottom: 24 }}>
            Lesson Complete!
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={() => { resetLesson(); exitLesson() }}
              style={{
                padding: "10px 20px",
                borderRadius: 20,
                border: "1px solid var(--ink-soft)",
                background: "transparent",
                color: "var(--ink)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Back to Lessons
            </button>
            <button
              onClick={() => { resetLesson(); exitLesson() }}
              style={{
                padding: "10px 20px",
                borderRadius: 20,
                border: "none",
                background: "var(--vermillion)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Next Lesson
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <button
          onClick={exitLesson}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 20,
            cursor: "pointer",
            color: "var(--ink-soft)",
          }}
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <div className="disp" style={{ fontSize: 18, fontWeight: 700 }}>
            {currentLesson.titleJp} · {currentLesson.title}
          </div>
          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>
            Step {currentStep + 1} of {currentLesson.steps.length}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 4,
          background: "var(--paper-dim)",
          borderRadius: 2,
          marginBottom: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--vermillion)",
            borderRadius: 2,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Card */}
      <LessonCard
        key={`${currentLesson.id}-${currentStep}`}
        step={step}
        onComplete={(correct) => {
          if (correct !== false) nextStep()
        }}
      />

      {/* Navigation */}
      <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: 12,
            border: "1px solid var(--ink-soft)",
            background: "transparent",
            color: currentStep === 0 ? "var(--ink-soft)" : "var(--ink)",
            cursor: currentStep === 0 ? "default" : "pointer",
            fontWeight: 600,
          }}
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          style={{
            flex: 2,
            padding: "12px",
            borderRadius: 12,
            border: "none",
            background: "var(--vermillion)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {currentStep === currentLesson.steps.length - 1 ? "Complete" : "Next →"}
        </button>
      </div>
    </div>
  )
}
