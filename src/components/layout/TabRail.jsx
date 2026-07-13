import { NavLink } from "react-router-dom"
import { TABS } from "../../constants/decks"

export default function TabRail() {
  return (
    <div
      style={{
        width: 76,
        background: "linear-gradient(180deg, var(--indigo-deep) 0%, #162240 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
        flexShrink: 0,
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        className="disp"
        style={{
          color: "rgba(255,255,255,0.9)",
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 28,
          writingMode: "vertical-rl",
          letterSpacing: "0.1em",
        }}
      >
        コトバ
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", padding: "0 8px" }}>
        {TABS.map((t) => (
          <NavLink
            key={t.id}
            to={`/${t.id}`}
            style={({ isActive }) => ({
              padding: "10px 0",
              borderRadius: 10,
              cursor: "pointer",
              border: "none",
              background: isActive ? "var(--vermillion)" : "transparent",
              color: isActive ? "#fff" : "rgba(200,210,224,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              textDecoration: "none",
              transition: "all 0.2s ease",
            })}
          >
            <span className="disp" style={{ fontSize: 16, fontWeight: 700 }}>{t.jp}</span>
            <span style={{ fontSize: 9, opacity: 0.8 }}>{t.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
