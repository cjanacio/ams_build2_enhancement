/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'no-bg': "url('')",
        'rob-mall': "url('https://webappservice-stg.robinsonsland.com/src/img/graphics-building-01@3x-wlogo.png')",
        'rob-mall-2': "url('https://webappservice-stg.robinsonsland.com/src/img/graphics-building-02@3x-wlogo.png')",
        'rob-mall-3': "url('https://webappservice-stg.robinsonsland.com/src/img/graphics-building-03@3x-wlogo.png')",
        'rob-mall-4': "url('https://webappservice-stg.robinsonsland.com/src/img/Robinsons Malls.png')",
        'rob-mall-5': "url('https://webappservice-stg.robinsonsland.com/src/img/graphics-building-04@3x-wlogo.png')",
        'rob-land-corp-white': "url('https://webappservice-stg.robinsonsland.com/src/img/logo-rlc-white.png')",
        'loading-gif': "url('https://webappservice-stg.robinsonsland.com/src/img/tenor.gif')"
      },
      
    },
    
  },
  plugins: [],
}