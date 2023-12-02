/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        'tab-sp': 'calc(100vh - 146px)', // h-tab-sp
        'tab-pc': 'calc(100vh - 90px)', // h-tab-pc
        'fill-available': '-webkit-fill-available',
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
          "primary": "#570df8", // 暫定
          // "primary": "#4ade80", // お試し
          "secondary": "#f000b8", // 暫定
          "accent": "#4ade80",
          // "accent": "#ff6100", // お試し
          "neutral": "#2b3440", // 暫定
          // 'base-100': '#e5e7eb',// 暫定（グレー）
          'base-100': '#e7eef3',// 青っぽい1
          // 'base-100': '#d8e0ef',// 青っぽい2
          "info": "#00a7ff", // 暫定
          // "success": "#36d399", // 暫定
          "success": "#00af86", // お試し
          "warning": "#fbbd23", // 暫定        
          "error": "#f87272", // 暫定
        },
        mytheme: {          
          "primary": "#c600ff",                   
          "secondary": "#8d6d00",
          "accent": "#0048ff",
          "neutral": "#120c05",
          "base-100": "#e5e7eb",
          "info": "#0085fe",
          "success": "#9ccb1a",
          "warning": "#ff7400",
          "error": "#ff0946",
         },
          mytheme2: {            
            "primary": "#00a7ff",
            "secondary": "#0074c8",
            "accent": "#ff6100",
            "neutral": "#281f34",
            "base-100": "#e5e7eb",
            "info": "#25aeff",
            "success": "#00af86",
            "warning": "#a37300",
            "error": "#ff3c7c",
          },
      },
    ],
  },
}
