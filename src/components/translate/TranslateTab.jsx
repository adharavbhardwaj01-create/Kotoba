import { useAppStore } from "../../store/appStore"
import { translateFree, isJapanese } from "../../api/gorp"
import SpeakerBtn from "../ui/SpeakerBtn"

export default function TranslateTab() {
  const {
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

    const inputIsJa = isJapanese(translateInput)
    const sourceLang = inputIsJa ? "ja" : "en"
    const targetLang = inputIsJa ? "en" : "ja"

    try {
      const translation = await translateFree(translateInput, sourceLang, targetLang)
      setTranslateResult({
        input_lang: sourceLang,
        translation,
      })
    } catch (e) {
      setTranslateError("Translation failed. Please try again.")
    } finally {
      setTranslateLoading(false)
    }
  }

  const inputIsJa = isJapanese(translateInput)

  return (
    <div style={{ padding: 16 }}>
      {/* Input area */}
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span
            style={{
              fontSize: 10,
              color: "var(--ink-faint)",
              background: "var(--paper-light)",
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            {inputIsJa ? "日本語" : "English"}
          </span>
          <span style={{ fontSize: 10, color: "var(--ink-faint)" }}>→</span>
          <span
            style={{
              fontSize: 10,
              color: "var(--ink-faint)",
              background: "var(--paper-light)",
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            {inputIsJa ? "English" : "日本語"}
          </span>
        </div>
        <textarea
          value={translateInput}
          onChange={(e) => setTranslateInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), translate())}
          placeholder="Type in English or Japanese…"
          rows={3}
          className="input"
          style={{ resize: "none", fontSize: 16, lineHeight: 1.5 }}
        />
      </div>

      {/* Translate button */}
      <button
        onClick={translate}
        disabled={translateLoading || !translateInput.trim()}
        className="btn-primary"
        style={{
          width: "100%",
          padding: "12px",
          opacity: translateLoading || !translateInput.trim() ? 0.5 : 1,
        }}
      >
        {translateLoading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span className="pulse">翻訳中…</span>
          </span>
        ) : (
          "Translate"
        )}
      </button>

      {/* Error */}
      {translateError && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 10,
            background: "rgba(193,67,42,0.06)",
            border: "1px solid rgba(193,67,42,0.15)",
            color: "var(--vermillion)",
            fontSize: 13,
          }}
        >
          {translateError}
        </div>
      )}

      {/* Result */}
      {translateResult && (
        <div className="fade-in" style={{ marginTop: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <span className="disp" style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.4 }}>
                  {translateResult.translation}
                </span>
              </div>
              {translateResult.input_lang === "en" && (
                <SpeakerBtn text={translateResult.translation} size={14} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
