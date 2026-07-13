function speakJapanese(text) {
  if (!("speechSynthesis" in window) || !text) return
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = "ja-JP"
  utter.rate = 0.92
  const voices = window.speechSynthesis.getVoices()
  const jpVoice = voices.find((v) => v.lang && v.lang.startsWith("ja"))
  if (jpVoice) utter.voice = jpVoice
  window.speechSynthesis.speak(utter)
}

export default function SpeakerBtn({ text, size = 15 }) {
  return (
    <button
      onClick={() => speakJapanese(text)}
      aria-label="Play pronunciation"
      style={{
        border: "none",
        background: "var(--indigo)",
        color: "#fff",
        borderRadius: "50%",
        width: size + 20,
        height: size + 20,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size,
        flexShrink: 0,
      }}
    >
      🔊
    </button>
  )
}

export { speakJapanese }
