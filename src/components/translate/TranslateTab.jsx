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

  return (
    <div style={{ padding: 16 }}>
      <textarea
        value={translateInput}
        onChange={(e) => setTranslateInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), translate())}
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
          </div>
        </div>
      )}
    </div>
  )
}
