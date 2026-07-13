const API_KEY = import.meta.env.VITE_GORP_API_KEY || ""

export async function askGorp(system, messages) {
  if (!API_KEY) {
    throw new Error("API key not configured. Please set VITE_GORP_API_KEY in your .env file.")
  }

  const res = await fetch("https://api.gorp.dev/v1/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gorp-1",
      max_tokens: 1000,
      system,
      messages,
    }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error?.message || `API error: ${res.status}`)
  }

  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
  return text
}

export function parseJSONLoose(text) {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim()
  const start = cleaned.indexOf("{")
  const startArr = cleaned.indexOf("[")
  let s = start
  if (startArr !== -1 && (start === -1 || startArr < start)) s = startArr
  const candidate = s >= 0 ? cleaned.slice(s) : cleaned
  try {
    return JSON.parse(candidate)
  } catch (e) {
    try {
      return JSON.parse(cleaned)
    } catch (e2) {
      return null
    }
  }
}

// Free translation using MyMemory API (no key required, 5000 chars/day)
export async function translateFree(text, sourceLang, targetLang) {
  const langPair = `${sourceLang}|${targetLang}`
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`
  )
  const data = await res.json()

  if (data.responseStatus === 200 && data.responseData?.translatedText) {
    return data.responseData.translatedText
  }
  throw new Error(data.responseDetails || "Translation failed")
}

// Detect if text is Japanese
export function isJapanese(text) {
  const jaRegex = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uF900-\uFAFF]/
  return jaRegex.test(text)
}
