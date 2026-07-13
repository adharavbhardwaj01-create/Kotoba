export default function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

      * { box-sizing: border-box; }

      .kotoba-root {
        --paper: #efe7d8;
        --paper-dim: #e4dac5;
        --paper-light: #f5f0e8;
        --ink: #22252b;
        --ink-soft: #55564f;
        --ink-faint: #8a8880;
        --indigo: #2c4770;
        --indigo-deep: #1c2f4d;
        --indigo-light: #3d5a8a;
        --vermillion: #c1432a;
        --vermillion-light: #d4563e;
        --bamboo: #5e7a3c;
        --bamboo-light: #7a9a52;
        --gold: #ab8636;
        --gold-light: #c49d4a;
        --shadow-sm: 0 1px 2px rgba(34,37,43,0.06);
        --shadow-md: 0 2px 8px rgba(34,37,43,0.08);
        --shadow-lg: 0 4px 16px rgba(34,37,43,0.1);
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-xl: 20px;
        font-family: 'Zen Kaku Gothic New', sans-serif;
        background: var(--paper);
        color: var(--ink);
        min-height: 100vh;
        background-image:
          radial-gradient(circle at 1px 1px, rgba(34,37,43,0.04) 1px, transparent 0);
        background-size: 20px 20px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
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

      .kotoba-root ::-webkit-scrollbar { width: 6px; height: 6px; }
      .kotoba-root ::-webkit-scrollbar-track { background: transparent; }
      .kotoba-root ::-webkit-scrollbar-thumb { background: var(--paper-dim); border-radius: 3px; }
      .kotoba-root ::-webkit-scrollbar-thumb:hover { background: var(--ink-faint); }

      @keyframes stampIn {
        0% { transform: scale(2.2) rotate(-14deg); opacity: 0; }
        60% { transform: scale(0.9) rotate(-6deg); opacity: 1; }
        100% { transform: scale(1) rotate(-6deg); opacity: 1; }
      }
      .stamp-anim { animation: stampIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in { animation: fadeIn 0.3s ease-out; }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .slide-up { animation: slideUp 0.3s ease-out; }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .pulse { animation: pulse 1.5s ease-in-out infinite; }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      .skeleton {
        background: linear-gradient(90deg, var(--paper-dim) 25%, var(--paper-light) 50%, var(--paper-dim) 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s ease-in-out infinite;
        border-radius: var(--radius-sm);
      }

      .btn-primary {
        background: var(--vermillion);
        color: #fff;
        border: none;
        border-radius: var(--radius-xl);
        padding: 10px 20px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .btn-primary:hover { background: var(--vermillion-light); transform: translateY(-1px); box-shadow: var(--shadow-md); }
      .btn-primary:active { transform: translateY(0); }
      .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }

      .btn-secondary {
        background: var(--indigo);
        color: #fff;
        border: none;
        border-radius: var(--radius-xl);
        padding: 10px 20px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .btn-secondary:hover { background: var(--indigo-light); transform: translateY(-1px); box-shadow: var(--shadow-md); }
      .btn-secondary:active { transform: translateY(0); }

      .btn-outline {
        background: transparent;
        color: var(--ink);
        border: 1px solid var(--paper-dim);
        border-radius: var(--radius-xl);
        padding: 10px 20px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .btn-outline:hover { border-color: var(--ink-soft); background: var(--paper-light); }

      .card {
        background: #fff;
        border: 1px solid var(--paper-dim);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-sm);
        transition: box-shadow 0.2s ease, transform 0.2s ease;
      }
      .card:hover { box-shadow: var(--shadow-md); }
      .card-interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }

      .input {
        width: 100%;
        padding: 12px 16px;
        border-radius: var(--radius-xl);
        border: 1px solid var(--paper-dim);
        background: #fff;
        font-size: 14px;
        color: var(--ink);
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      .input:focus { outline: none; border-color: var(--indigo); box-shadow: 0 0 0 3px rgba(44,71,112,0.1); }
      .input::placeholder { color: var(--ink-faint); }

      .badge {
        display: inline-flex;
        align-items: center;
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      .badge-common { background: var(--bamboo); color: #fff; }
      .badge-jlpt { background: var(--indigo); color: #fff; }
      .badge-new { background: var(--vermillion); color: #fff; }
    `}</style>
  )
}
