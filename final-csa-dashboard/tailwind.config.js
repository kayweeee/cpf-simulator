/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-green": "#0A6160",
        "light-green": "#E6EDED",
        "sage-green": "#0A6160",
        "light-gray": "#F0F0F0",
      },
    },
  },
  plugins: [],
};
