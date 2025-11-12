/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        customPurple1: '#A165BA',
        customPurple2: '#CEBADB',
        customPurple3: '#A17CAE',
        customBlue1: '#A8CED8',
        customBlue2: '#E7F0F6',
        customBlue3: '#98CDF9',
        customBlue4: '#2692AA',
        customBlue5: '#5C93F5',
        customGray1: '#DBDFE2',
        customGray2: '#D9D9D9',
        customGray3: '#C5C3C3',
        customGray4: '#737272',
        customWhite: '#FFFFFF',
      }
    },
  },
  plugins: [],
}

