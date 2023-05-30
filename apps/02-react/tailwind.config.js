/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        glass: "url('https://picsum.photos/1920/1080?grayscale')",
        plus: "url('/public/plus.svg')",
      },
      animation: {
        rainbow: "rainbow-border 5s linear infinite",
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
      },
    },
  },
  plugins: [],
};
