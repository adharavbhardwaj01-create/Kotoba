export default function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

      * { box-sizing: border-box; }

      .kotoba-root {
        --paper: #efe7d8;
        --paper-dim: #e4dac5;
        --ink: #22252b;
        --ink-soft: #55564f;
        --indigo: #2c4770;
        --indigo-deep: #1c2f4d;
        --vermillion: #c1432a;
        --bamboo: #5e7a3c;
        --gold: #ab8636;
        font-family: 'Zen Kaku Gothic New', sans-serif;
        background: var(--paper);
        color: var(--ink);
        min-height: 100vh;
        background-image:
          radial-gradient(circle at 1px 1px, rgba(34,37,43,0.06) 1px, transparent 0);
        background-size: 18px 18px;
      }

      .kotoba-root *:focus-visible {
        outline: 2px solid var(--vermillion);
        outline-offset: 2px;
      }

      .disp { font-family: 'Shippori Mincho', serif; }
      .mono { font-family: 'JetBrains Mono', monospace; }

      @media (prefers-reduced-motion: reduce) {
        .kotoba-root * { animation: none !important; transition: none !important; }
      }

      .kotoba-root ::-webkit-scrollbar { width: 8px; height: 8px; }
      .kotoba-root ::-webkit-scrollbar-thumb { background: #c8bea6; border-radius: 4px; }

      @keyframes stampIn {
        0% { transform: scale(2.2) rotate(-14deg); opacity: 0; }
        60% { transform: scale(0.9) rotate(-6deg); opacity: 1; }
        100% { transform: scale(1) rotate(-6deg); opacity: 1; }
      }
      .stamp-anim { animation: stampIn 0.4s ease-out; }
    `}</style>
  )
}
