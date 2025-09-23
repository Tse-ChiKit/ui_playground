/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../ui-core/src/**/*.{ts,tsx}", // 👈 Scan your component library too
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
