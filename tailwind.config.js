/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"kinoko-black": "#0B021F",
				"kinoko-purple": "#8662F9",
			},
		},
	},
	plugins: [],
};
