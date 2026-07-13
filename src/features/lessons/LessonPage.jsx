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
          className="card slide-up"
          style={{ padding: 40 }}
        >
          <div className="stamp-anim" style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <div className="disp" style={{ fontSize: 28, fontWeight: 800, color: "var(--indigo)", marginBottom: 8 }}>
            おめでとう！
          </div>
          <div style={{ fontSize: 15, color: "var(--ink-soft)", marginBottom: 28 }}>
            Lesson Complete!
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={() => { resetLesson(); exitLesson() }}
              className="btn-outline"
              style={{ padding: "12px 24px" }}
            >
              Back to Lessons
            </button>
            <button
              onClick={() => { resetLesson(); exitLesson() }}
              className="btn-primary"
              style={{ padding: "12px 24px" }}
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
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid var(--paper-dim)",
            background: "#fff",
            fontSize: 16,
            cursor: "pointer",
            color: "var(--ink-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <div className="disp" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>
            {currentLesson.titleJp} · {currentLesson.title}
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>
            Step {currentStep + 1} of {currentLesson.steps.length}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
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
            background: "linear-gradient(90deg, var(--vermillion) 0%, var(--vermillion-light) 100%)",
            borderRadius: 2,
            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
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
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="btn-outline"
          style={{
            flex: 1,
            padding: "12px",
            opacity: currentStep === 0 ? 0.4 : 1,
            cursor: currentStep === 0 ? "default" : "pointer",
          }}
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          className="btn-primary"
          style={{
            flex: 2,
            padding: "12px",
          }}
        >
          {currentStep === currentLesson.steps.length - 1 ? "Complete ✓" : "Next →"}
        </button>
      </div>
    </div>
  )
}
