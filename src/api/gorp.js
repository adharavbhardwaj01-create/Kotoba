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
