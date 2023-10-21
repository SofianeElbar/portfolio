module.exports = {
  theme: {
    extend: {
      keyframes: {
        animage: {
          "0%": {
            "background-position": "0% 100%",
            "background-size": "200%",
          },
          "20%": {
            "background-position": "30% 35%",
            "background-size": "200%",
          },
          "20.0001%": {
            /* -- View 2 -- */
            "background-position": "60% 85%",
            "background-size": "200%",
          },
          "40%": {
            "background-position": "49% 81%",
            "background-size": "100%",
          },
          "40.0001%": {
            /* -- View 3 -- */
            "background-position": "80% 42%",
            "background-size": "150%",
          },
          "60%": {
            "background-position": "84% 33%",
            "background-size": "100%",
          },
          "60.0001%": {
            /* -- View 4 -- */
            "background-position": "42% 80%",
            "background-size": "150%",
          },
          "80%": {
            "background-position": "33% 84%",
            "background-size": "100%",
          },
          "80.0001%": {
            /* -- View 5 -- */
            "background-position": "0% 0%",
            "background-size": "300%",
          },
          "100%": {
            "background-position": "100% 0%",
            "background-size": "200%",
          },
        },
      },
      animation: {
        "anim-image": "animage 22s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
