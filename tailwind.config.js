/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				dark: "#1a1c23",
				main: "#4f63ab",
				primary: "#2c88cc",
				lighter: "#5799cb",
				focus: "#53688d",
				hover: "#323f56",
				lighthover: "#282b37",
			},
			animation: {
				blink: "blinks 2s linear infinite",
			},
			keyframes: {
				blinks: {
					"0%, 100%": { color: "#2c88cc" }, // Use custom color here
					"50%": { color: "white" },
				},
			},
		},
	},
	plugins: [],
};
