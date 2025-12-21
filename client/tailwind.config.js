/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                glass: "rgba(10, 15, 25, 0.7)", // Glass Layer - dark and sleek
                glassBorder: "rgba(255, 255, 255, 0.08)", // Glass Border - subtle
                primary: "#6EE7B7", // Mint Neon
                secondary: "#7DD3FC", // Accent 1: Ice Blue
                accent: "#A78BFA", // Accent 2: Soft Purple
                bgDark: "#0A0D12", // Background Dark
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
