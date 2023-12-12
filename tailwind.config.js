const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["CircularXX", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        title: ["40px", "49px"],
        heading: ["28px", "34px"],
        subheading: ["24px", "32px"],
        paragraph: ["16px", "20px"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
