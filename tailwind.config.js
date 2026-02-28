/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                charcoal: {
                    900: '#0d0d0d',
                    800: '#141414',
                    700: '#1a1a1a',
                    600: '#222222',
                    500: '#2a2a2a',
                },
                cyan: {
                    400: '#22d3ee',
                    500: '#06b6d4',
                    glow: '#00f5ff',
                },
                purple: {
                    deep: '#4B0082',
                    600: '#7c3aed',
                    700: '#6d28d9',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 10s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 245, 255, 0.7)' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
