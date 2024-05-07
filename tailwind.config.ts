import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bnw-art": "url('https://res.cloudinary.com/p-seelam/image/upload/v1714844559/1.2_rzmtz9.jpg')",
      },
      screens: {
        lg: { max: '80rem' },
        md: { max: '48rem' },
        sm: { max: '30rem' },
      },
    }
  },
}

export default config;
