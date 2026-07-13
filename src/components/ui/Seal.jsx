export default function Seal({ n }) {
  return (
    <div
      className="stamp-anim"
      style={{
        width: 46,
        height: 46,
        borderRadius: 8,
        border: "2.5px solid var(--vermillion)",
        color: "var(--vermillion)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Shippori Mincho', serif",
        fontWeight: 800,
        fontSize: 15,
        transform: "rotate(-6deg)",
        flexShrink: 0,
        background: "rgba(193,67,42,0.06)",
      }}
      title={`${n} day streak`}
    >
      {n}
    </div>
  )
}
