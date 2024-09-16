import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          orange: "#F27C22",
          LiOrange: "#F3A756", // light orange
          Bg: "#f5f8ff",
          Green: "#719140",
          blue: "#1976d2", // light blue
        },
      },
      backgroundImage: {
        gradientRadial: "radial-gradient(var(--tw-gradient-stops))",
        gradientConic: "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  animation: {
    fadeIn: "fade-in 0.5s ease-in-out",
    fadeOut: "fade-out 0.5s ease-in-out",
    slideIn: "slide-in 0.5s ease-in-out",
    slideOut: "slide-out 0.5s ease-in-out",
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
    fadeOut: {
      "0%": { opacity: 1 },
      "100%": { opacity: 0 },
    },
    slideIn: {
      "0%": { transform: "translateX(-100%)" },
      "100%": { transform: "translateX(0)" },
    },
    slideOut: {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-100%)" },
    },
  },
  plugins: [],
};

export default config;