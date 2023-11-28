import type { Config } from "tailwindcss";

const config: Config = {
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
          "linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), radial-gradient(145.33% 81.28% at 106.91% 112.02%, rgba(228, 85, 46, 0.20) 0%, rgba(0, 0, 0, 0.09) 100%), radial-gradient(98.39% 75.53% at 10.52% -34.67%, #E4552E 13.91%, rgba(30, 30, 31, 0.78) 100%)",
      },
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        Helius: {
          primary: "#E4552E",

          secondary: "#a03b20",

          accent: "#ffaf99",

          neutral: "#4C4C4E",

          "neutral-2": "#5F5F5F",

          "base-100": "#272729",

          info: "#008ce5",

          success: "#84cc16",

          warning: "#fb923c",

          error: "#dc2626",
        },
      },
    ],
  },
};
export default config;
