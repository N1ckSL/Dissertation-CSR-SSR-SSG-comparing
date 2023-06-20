/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      backgroundImage: {
        glass: "url('https://picsum.photos/1920/1080?grayscale')",
        plus: "url('/public/plus.svg')",
      },
      animation: {
        rainbow: "rainbow-border 5s linear infinite",
        "rainbow-thin": "rainbow-border-thin 5s linear infinite",
        "rainbow-bottom": "rainbow-border-bottom 5s linear infinite",
      },
      keyframes: {
        "rainbow-border": {
          "0%": { border: "2px solid red;" },
          "16.7%": { border: "2px solid orange;" },
          "33.3%": { border: "2px solid yellow;" },
          "50%": { border: "2px solid green;" },
          "66.7%": { border: "2px solid blue;" },
          "83.3%": { border: "2px solid indigo;" },
          "100%": { border: "2px solid violet;" },
        },
        "rainbow-border-thin": {
          "0%": { border: "1px solid red;" },
          "16.7%": { border: "1px solid orange;" },
          "33.3%": { border: "1px solid yellow;" },
          "50%": { border: "1px solid green;" },
          "66.7%": { border: "1px solid blue;" },
          "83.3%": { border: "1px solid indigo;" },
          "100%": { border: "1px solid violet;" },
        },
        "rainbow-border-bottom": {
          "0%": { "border-bottom": "2px solid red;" },
          "16.7%": { "border-bottom": "2px solid orange;" },
          "33.3%": { "border-bottom": "2px solid yellow;" },
          "50%": { "border-bottom": "2px solid green;" },
          "66.7%": { "border-bottom": "2px solid blue;" },
          "83.3%": { "border-bottom": "2px solid indigo;" },
          "100%": { "border-bottom": "2px solid violet;" },
        },
      },
    },
  },
  plugins: [],
};
