import { NavLink } from "react-router-dom"
import { TABS } from "../../constants/decks"

export default function TabRail() {
  return (
    <div
      style={{
        width: 84,
        background: "var(--indigo-deep)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
        flexShrink: 0,
      }}
    >
      <div
        className="disp"
        style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: 22,
          marginBottom: 28,
          writingMode: "vertical-rl",
        }}
      >
        コトバ
      </div>
      {TABS.map((t) => (
        <NavLink
          key={t.id}
          to={`/${t.id}`}
          style={({ isActive }) => ({
            width: 60,
            marginBottom: 10,
            padding: "10px 0",
            borderRadius: 10,
            cursor: "pointer",
            border: "none",
            background: isActive ? "var(--vermillion)" : "transparent",
            color: isActive ? "#fff" : "#c8d2e0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            textDecoration: "none",
          })}
        >
          <span className="disp" style={{ fontSize: 18, fontWeight: 700 }}>{t.jp}</span>
          <span style={{ fontSize: 9.5 }}>{t.label}</span>
        </NavLink>
      ))}
    </div>
  )
}
