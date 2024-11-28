import { mainColor } from './src/constants/colors'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                main: mainColor,
            },
            boxShadow: {
                'darkmode-switch-s': '0px 1.5px 2px 1px rgba(0, 0, 0, 0.2)',
                'button-round': '0px 1.5px 2px 1px rgba(0, 0, 0, 0.2)',
                'inverted': 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
            },
            animation : {
                'loading-spin': 'spin 1s infinite ease-in-out',
            }
        },
    },
    plugins: [],
}
