module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}' , 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    colors : {
      themeWhite : "#e5e5f7",
      themeShadow : "#9d9db3",
      themeBlue : "#3b69dd",
      themeBlueLight : "#3b69ddab"
    },
    extend: {},
  },
  plugins: [ require('flowbite/plugin') ],
};