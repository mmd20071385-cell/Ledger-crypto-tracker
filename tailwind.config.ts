import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0E1116",
          soft: "#151923",
          surface: "#1B202B",
          raised: "#222836",
          line: "#2A3140",
        },
        paper: {
          DEFAULT: "#EDEAE2",
          dim: "#9DA3B0",
          faint: "#6B7180",
        },
        brass: {
          DEFAULT: "#D4A24E",
          soft: "#8F7237",
          glow: "#F0C878",
        },
        signal: {
          DEFAULT: "#4E8FD4",
          soft: "#2F5A87",
        },
        gain: {
          DEFAULT: "#3FBE83",
          soft: "#1F3A2C",
        },
        loss: {
          DEFAULT: "#E0596B",
          soft: "#3E2229",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(237,234,226,0.035) 1px, transparent 0)",
      },
      backgroundSize: {
        grain: "22px 22px",
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "fade-up": "fade-up 0.4s ease-out both",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
