/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto"],
      },
      colors: {
        // Anda dapat menggunakan warna Tailwind CSS bawaan seperti ini
        blue: {
          500: "#0D6EFD",
        },
        white: {
          255: "#FFFFFF",
        },
        black: {
          33: "#212529",
        },
        gray: {
          55: "#37517E",
        },
        lightGray: {
          243: "#F3F5FA",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
