/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      padding: {
        192: "48rem", // Add your custom padding value here
        100: "41rem",
      },
      margin: {
        192: "80rem",
        180: "60rem",
        74: "20.3rem",
      },
      width: {
        128: "91rem",
      },
    },
  },
  plugins: [],
};
