import { useAppStore } from "../../store/appStore"
import { HIRAGANA, KATAKANA } from "../../constants/kana"
import { speakJapanese } from "../ui/SpeakerBtn"
import SpeakerBtn from "../ui/SpeakerBtn"
import KanaCard from "./KanaCard"

export default function KanaGrid() {
  const { kanaSet, selectedKana, setSelectedKana } = useAppStore()
  const data = kanaSet === "hiragana" ? HIRAGANA : KATAKANA

  const pick = (entry) => {
    setSelectedKana(entry)
    speakJapanese(entry[0])
  }

  return (
    <div style={{ padding: 16 }}>
      {selectedKana && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            background: "#fff",
            border: "1px solid var(--paper-dim)",
            borderRadius: 14,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <span className="disp" style={{ fontSize: 48, fontWeight: 800, color: "var(--indigo)" }}>
            {selectedKana[0]}
          </span>
          <div>
            <div className="mono" style={{ fontSize: 14, color: "var(--gold)" }}>{selectedKana[1]}</div>
            <div style={{ fontSize: 14, marginTop: 2 }}>{selectedKana[2]}</div>
          </div>
          <SpeakerBtn text={selectedKana[0]} />
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))",
          gap: 8,
        }}
      >
        {data.map((entry) => (
          <KanaCard
            key={entry[0]}
            entry={entry}
            isSelected={selectedKana && selectedKana[0] === entry[0]}
            onSelect={pick}
          />
        ))}
      </div>
    </div>
  )
}
