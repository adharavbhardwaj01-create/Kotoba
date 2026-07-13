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

  return (
    <div style={{ padding: 16 }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div className="disp" style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
          レッスン · Lessons
        </div>
        <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
          Learn Japanese step by step
        </div>
      </div>

      {/* Level selector */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "inline-flex",
            padding: "6px 14px",
            borderRadius: 20,
            background: "var(--indigo)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          JLPT N5 · Beginner
        </div>
      </div>

      {/* Lesson list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {N5_LESSONS.map((lesson, idx) => {
          const isCompleted = completedLessons[lesson.id]
          return (
            <button
              key={lesson.id}
              onClick={() => startLesson(lesson)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: 16,
                borderRadius: 14,
                border: isCompleted ? "2px solid var(--bamboo)" : "1px solid var(--paper-dim)",
                background: "#fff",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: isCompleted ? "var(--bamboo)" : "var(--indigo)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {isCompleted ? "✓" : idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div className="disp" style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
                  {lesson.titleJp} · {lesson.title}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                  {lesson.description}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>
                  {lesson.steps.length} steps
                </div>
              </div>
              <div style={{ fontSize: 18, color: "var(--ink-soft)" }}>→</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
