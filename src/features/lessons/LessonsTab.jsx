import { useEffect } from "react"
import { useLessonStore } from "./lessonStore"
import { N5_LESSONS } from "./data/n5-lessons"
import LessonPage from "./LessonPage"

export default function LessonsTab() {
  const { currentLesson, completedLessons, initLessons, startLesson } = useLessonStore()

  useEffect(() => {
    initLessons()
  }, [initLessons])

  // If in a lesson, show lesson page
  if (currentLesson) return <LessonPage />

  const completedCount = Object.keys(completedLessons).length

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div className="disp" style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
          レッスン · Lessons
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-faint)" }}>
          Learn Japanese step by step
        </div>
      </div>

      {/* Level selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 12,
            background: "var(--indigo)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          <span>JLPT N5</span>
          <span style={{ opacity: 0.6, fontWeight: 400 }}>·</span>
          <span style={{ opacity: 0.8, fontWeight: 400 }}>Beginner</span>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 12,
            background: "var(--paper-light)",
            border: "1px solid var(--paper-dim)",
            fontSize: 12,
            color: "var(--ink-soft)",
          }}
        >
          <span style={{ fontWeight: 700, color: "var(--bamboo)" }}>{completedCount}</span>
          <span>/</span>
          <span>{N5_LESSONS.length}</span>
          <span>completed</span>
        </div>
      </div>

      {/* Progress indicator */}
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
            width: `${(completedCount / N5_LESSONS.length) * 100}%`,
            background: "linear-gradient(90deg, var(--bamboo) 0%, var(--bamboo-light) 100%)",
            borderRadius: 2,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Lesson list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {N5_LESSONS.map((lesson, idx) => {
          const isCompleted = completedLessons[lesson.id]
          return (
            <button
              key={lesson.id}
              onClick={() => startLesson(lesson)}
              className="card card-interactive fade-in"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: 16,
                border: isCompleted ? "1.5px solid var(--bamboo)" : "1px solid var(--paper-dim)",
                textAlign: "left",
                animationDelay: `${idx * 0.05}s`,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: isCompleted
                    ? "linear-gradient(135deg, var(--bamboo) 0%, var(--bamboo-light) 100%)"
                    : "linear-gradient(135deg, var(--indigo) 0%, var(--indigo-light) 100%)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 15,
                  flexShrink: 0,
                  boxShadow: isCompleted
                    ? "0 2px 6px rgba(94,122,60,0.25)"
                    : "0 2px 6px rgba(44,71,112,0.2)",
                }}
              >
                {isCompleted ? "✓" : idx + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="disp" style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>
                  {lesson.titleJp} · {lesson.title}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-faint)", marginTop: 3, lineHeight: 1.4 }}>
                  {lesson.description}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: "var(--ink-faint)", background: "var(--paper-light)", padding: "2px 6px", borderRadius: 4 }}>
                    {lesson.steps.length} steps
                  </span>
                  {isCompleted && (
                    <span style={{ fontSize: 10, color: "var(--bamboo)", fontWeight: 600 }}>
                      ✓ Complete
                    </span>
                  )}
                </div>
              </div>
              <div style={{ fontSize: 16, color: "var(--ink-faint)", flexShrink: 0 }}>→</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
