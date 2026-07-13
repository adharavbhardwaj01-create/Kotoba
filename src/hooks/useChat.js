import { useCallback } from "react"
import { askGorp, parseJSONLoose } from "../api/gorp"
import { SCENARIOS } from "../constants/decks"
import { useAppStore } from "../store/appStore"

export function useChat() {
  const {
    scenario,
    messages,
    addMessage,
    input,
    setInput,
    chatLoading,
    setChatLoading,
    level,
    markWordsExposure,
  } = useAppStore()

  const send = useCallback(async (overrideText) => {
    const text = (overrideText ?? input).trim()
    if (!text || chatLoading) return

    const scenarioObj = SCENARIOS.find((s) => s.id === scenario)
    const userMsg = { role: "user", text }
    addMessage(userMsg)
    setInput("")
    setChatLoading(true)

    const system = `You are Adharav, a warm, encouraging Japanese language tutor speaking with a ${level} level student.
Scenario context: ${scenarioObj.label} (${scenarioObj.jp}). Stay in character for this scenario unless it is "Free chat".
Rules:
- Reply mostly in Japanese, at ${level} difficulty (very short, simple sentences and common words if Beginner).
- If the student's Japanese has a mistake, gently correct it.
- Respond ONLY with raw JSON, no markdown fences, no preamble, in exactly this shape:
{"reply_jp":"...","reply_romaji":"...","reply_en":"...","correction":null}
If there is a mistake to correct, instead of null use:
{"original":"what the student wrote","corrected":"the fixed version","note":"one short English sentence explaining why"}
Keep reply_jp to 1-2 short sentences and always end it with a simple question to keep the conversation going.`

    const history = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) =>
        m.role === "user"
          ? { role: "user", content: m.text }
          : { role: "assistant", content: m.jp }
      )

    try {
      const raw = await askGorp(system, [...history, { role: "user", content: text }])
      const parsed = parseJSONLoose(raw)
      if (parsed && parsed.reply_jp) {
        addMessage({ role: "assistant", ...parsed })
        markWordsExposure()
      } else {
        addMessage({ role: "assistant", jp: raw, romaji: "", en: "", correction: null })
      }
    } catch (e) {
      addMessage({
        role: "assistant",
        jp: "エラーが おきました。",
        romaji: "Erā ga okimashita.",
        en: "An error occurred — please try again.",
        correction: null,
      })
    } finally {
      setChatLoading(false)
    }
  }, [input, chatLoading, scenario, messages, level, addMessage, setInput, setChatLoading, markWordsExposure])

  return {
    send,
    input,
    setInput,
    loading: chatLoading,
  }
}
