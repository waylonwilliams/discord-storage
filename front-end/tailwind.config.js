/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-1": "#1e2124",
        "gray-2": "#282b30",
        "gray-3": "#36393e",
        "gray-4": "#424549",
        "purple-1": "#7289da",
      },
    },
  },

  plugins: [],
};
