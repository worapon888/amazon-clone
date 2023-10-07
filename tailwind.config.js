/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      colors: {
        amazon_blue: "#131921",
        amazon_light: "#232F3E",
        amazon_yellow: "#febd69",
        lightText: "#ccc",
        quantity_box: "#F0F2F2",
        footerBottom: "#131A22",
      },
      boxShadow: {
        textShadow: "0px 0px 3px 2px rgb(228 121 17 / 50%)",
        amazonInput: "0 0 3px 2px rgb(228 121 17 / 50%)",
      },
      fontFamily: {
        titleFont: "Roboto",
        bodyFont: "Poppins",
      },
    },
  },
  plugins: [],
};
