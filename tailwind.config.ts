import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(73.15% 70.06% at 50% -10.9%, rgba(228, 85, 46, 0.70) 0%, #222 100%)",
      },
      boxShadow: {
        glow: "0 0 5px 2px rgba(238, 199, 188, 0.6)", // This is a blue glow
      },
    },
  },

  plugins: [
    require("daisyui"),
    require('@tailwindcss/forms'),
  ],
  daisyui: {
    themes: [
      {
        Helius: {
          primary: "#E4552E",

          secondary: "#a03b20",

          accent: "#ffaf99",

          neutral: "#454549",

          "neutral-2": "#5F5F5F",

          "base-100": "#222222",

          info: "#008ce5",

          success: "#84cc16",

          warning: "#fb923c",

          error: "#dc2626",
        },
      },
    ],
    darkTheme: false,
  },
};
export default config;
