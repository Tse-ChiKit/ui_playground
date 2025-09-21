/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui-core/src/**/*.{ts,tsx}", // 👈 Scan your component library too
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
