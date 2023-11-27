/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        'tab-sp': 'calc(100vh - 146px)', // h-tab-sp
        'tab-pc': 'calc(100vh - 90px)' // h-tab-pc
      },
      dropShadow: {
        'center': '0 0px 35px rgba(0, 0, 30, 0.20)'
      }
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: [
      {
        light: { // 既存の `light` テーマを指定して、オーバーライドする
          "primary": "#570df8",
          // "primary": "#4ade80",
          "secondary": "#f000b8",
          // "accent": "#1dcdbc",
          // "accent": "#10de70",
          "accent": "#4ade80",
          "neutral": "#2b3440",                   
          // 'base-100': '#e7eef3',// custom
          'base-100': '#e5e7eb',// custom
          "info": "#3abff8",                   
          "success": "#36d399",                   
          "warning": "#fbbd23",                   
          "error": "#f87272",
        },
      },
    ],
  },
}
