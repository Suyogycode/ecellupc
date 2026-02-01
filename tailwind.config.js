/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0f172a', // Deep Royal Blue
          light: '#1e293b',   // Lighter shade for cards
          dark: '#020617',    // Darker shade for backgrounds
        },
        accent: {
          DEFAULT: '#fbbf24', // Gold
          hover: '#d97706',   // Darker Gold for hover states
        },
        electric: {
          blue: '#3b82f6',    // Electric blue for glows/gradients
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'], // For Headings
      },
      animation: {
        'blob': 'blob 7s infinite',
        'ping-slow': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-out': 'fadeOut 1s ease-out forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0)' },
        },
      }
    },
  },
  plugins: [
    ('@tailwindcss/typography'),
  ],
}