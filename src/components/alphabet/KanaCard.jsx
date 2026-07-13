import { speakJapanese } from "../ui/SpeakerBtn"

export default function KanaCard({ entry, isSelected, onSelect }) {
  const [char, romaji, meaning] = entry

  return (
    <button
      onClick={() => onSelect(entry)}
      className="disp"
      style={{
        aspectRatio: "1",
        fontSize: 22,
        fontWeight: 700,
        borderRadius: 10,
        cursor: "pointer",
        border: isSelected ? "2px solid var(--vermillion)" : "1px solid var(--paper-dim)",
        background: "#fff",
        color: "var(--ink)",
      }}
    >
      {char}
    </button>
  )
}
