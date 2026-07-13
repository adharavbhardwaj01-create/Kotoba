import { useAppStore } from "../../store/appStore"
import { askGorp, parseJSONLoose } from "../../api/gorp"
import SpeakerBtn from "../ui/SpeakerBtn"

export default function TranslateTab() {
  const {
    level,
    translateInput,
    setTranslateInput,
    translateResult,
    setTranslateResult,
    translateLoading,
    setTranslateLoading,
    translateError,
    setTranslateError,
  } = useAppStore()

  const translate = async () => {
    if (!translateInput.trim() || translateLoading) return
    setTranslateLoading(true)
    setTranslateError("")
    setTranslateResult(null)

    const system = `You are a Japanese-English translator and grammar teacher for a ${level} level student.
Detect if the input is English or Japanese. Translate it to the other language.
Respond ONLY with raw JSON (no markdown fences), shaped exactly:
{"input_lang":"en" or "ja","translation":"the translation","romaji":"romanized reading of the Japanese (input or output, whichever is Japanese)","breakdown":[{"word":"...","reading":"...","meaning":"...","grammar":"short grammar note, e.g. particle, past tense, verb"}]}
The breakdown must cover the Japanese sentence word by word, in order.`

    try {
      const raw = await askGorp(system, [{ role: "user", content: translateInput }])
      const parsed = parseJSONLoose(raw)
      if (parsed && parsed.translation) {
        setTranslateResult(parsed)
      } else {
        setTranslateError("Could not parse a translation — try rephrasing.")
      }
    } catch (e) {
      setTranslateError("Something went wrong translating that.")
    } finally {
      setTranslateLoading(false)
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <textarea
        value={translateInput}
        onChange={(e) => setTranslateInput(e.target.value)}
        placeholder="Type in English or Japanese…"
        rows={3}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: "1px solid var(--ink-soft)",
          fontSize: 15,
          resize: "vertical",
          background: "#fff",
        }}
      />
      <button
        onClick={translate}
        disabled={translateLoading}
        style={{
          marginTop: 10,
          border: "none",
          borderRadius: 20,
          padding: "9px 22px",
          background: "var(--vermillion)",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {translateLoading ? "翻訳中…" : "Translate"}
      </button>
      {translateError && (
        <div style={{ color: "var(--vermillion)", fontSize: 13, marginTop: 10 }}>
          {translateError}
        </div>
      )}
      {translateResult && (
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--paper-dim)",
              borderRadius: 14,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="disp" style={{ fontSize: 21, fontWeight: 700 }}>
                {translateResult.translation}
              </span>
              {translateResult.input_lang === "en" && (
                <SpeakerBtn text={translateResult.translation} size={13} />
              )}
            </div>
            {translateResult.romaji && (
              <div className="mono" style={{ fontSize: 13, color: "var(--gold)", marginTop: 6 }}>
                {translateResult.romaji}
              </div>
            )}
          </div>
          {Array.isArray(translateResult.breakdown) && translateResult.breakdown.length > 0 && (
            <div>
              <div className="disp" style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>
                分解 · Word by word
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {translateResult.breakdown.map((w, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1.4fr 1.4fr",
                      gap: 10,
                      background: "#fff",
                      border: "1px solid var(--paper-dim)",
                      borderRadius: 10,
                      padding: "8px 12px",
                      fontSize: 13,
                      alignItems: "center",
                    }}
                  >
                    <span className="disp" style={{ fontWeight: 700 }}>{w.word}</span>
                    <span className="mono" style={{ color: "var(--gold)" }}>{w.reading}</span>
                    <span>{w.meaning}</span>
                    <span style={{ color: "var(--ink-soft)", fontSize: 12 }}>{w.grammar}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
