export default function Button({ children, onClick, disabled, variant = "primary", style = {}, ...props }) {
  const base = {
    border: "none",
    borderRadius: 20,
    padding: "9px 22px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
    ...style,
  }

  const variants = {
    primary: { background: "var(--vermillion)", color: "#fff" },
    secondary: { background: "var(--indigo)", color: "#fff" },
    outline: { background: "transparent", border: "1px solid var(--ink-soft)", color: "var(--ink)" },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant] }}
      {...props}
    >
      {children}
    </button>
  )
}
