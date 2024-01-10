/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blink: 'blinks 2s linear infinite',
      },
      keyframes: {
        blinks: {
          '0%, 100%': { color: '#2c88cc' }, // Use custom color here
          '50%': { color: 'white' },
        },
      },
    },
  },
  plugins: [],
};
