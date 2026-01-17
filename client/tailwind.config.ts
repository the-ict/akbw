/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",    // agar Next 13 app dir ishlatayotgan bo'lsang
    "./pages/**/*.{js,ts,jsx,tsx}",  // pages dir ishlatilsa
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kenao: ["var(--font-kenao)", "sans-serif"],
        golos: ["var(--font-golos)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
