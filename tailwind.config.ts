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
        primary: "#8A7968",
        linen: "#E6E2D8",
        limestone: "#DDD8CD",
        umber: "#1C1A18",
        bark: "#635E56",
        hemp: "#CBC4B5",
        loam: "#8A7968",
        laurel: "#767E6B",
        pastel: {
          sage: "#767E6B",
          rose: "#DDD8CD",
          sky: "#CBC4B5",
          lavender: "#DDD8CD",
          butter: "#E6E2D8",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        'marquee-slow': 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
