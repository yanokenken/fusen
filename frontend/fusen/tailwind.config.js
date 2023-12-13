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
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: ["dark","light","dracula","business","night",
      {
        light: { // 既存の `light` テーマを指定して、オーバーライドする
          "primary": "#570df8", // 暫定
          "secondary": "#f000b8", // 暫定
          "accent": "#00e96c",
          "neutral": "#353E4B", // 暫定
          'base-100': '#e7eef3',// 青っぽい1
          // 'base-100': '#e5e7eb',// 暫定（グレー） 
          "info": "#00a7ff", // 暫定
          "success": "#00af86", // お試し
          "warning": "#fbbd23", // 暫定 
          "error": "#f87272", // 暫定
        },
        light2: {          
          "primary": "#475bd1",                   
          "secondary": "#718fe2",                   
          "accent": "#9dfc05",                   
          "neutral": "#49525F",                   
          "base-100": "#ecedf3",                   
          "info": "#397cdb",                   
          "success": "#29d680",                   
          "warning": "#e8be26",                   
          "error": "#f52e4f",
        },
        light3: {
          "primary": "#e08a84",                   
          "secondary": "#e527db",                   
          "accent": "#ff8050",                   
          "neutral": "#717171",                   
          "base-100": "#f7f7f8",                   
          "info": "#8ed8e6",                   
          "success": "#76eae0",                   
          "warning": "#f2c626",                   
          "error": "#f15641",
        },
        light4: {
          "primary": "#47d192",                   
          "secondary": "#f7a52a",
          "accent": "#9dfc05",
          "neutral": "#ededee",                   
          "base-100": "#ededee",                   
          "info": "#81caef",                   
          "success": "#15a870",                   
          "warning": "#fb8209",                   
          "error": "#db3e33",
        },

        dark2: {
          "primary": "#714db5",
          "secondary": "#29f470",
          "accent": "#9cfc02",
          "neutral": "#353E4B",
          "base-100": "#33435b",
          "info": "#5d95ea",
          "success": "#18dc81",
          "warning": "#f9cd1a",
          "error": "#f33974",
        },
        dark3: {
          "primary": "#f8c4fc",
          "secondary": "#d143d3",
          "accent": "#ff60a8",                   
          "neutral": "#201f37",
          "base-100": "#323b67",                   
          "info": "#438af4",                   
          "success": "#1fe07f",                   
          "warning": "#f9cd1a",                   
          "error": "#e36959",
        },
      },
    ],
  },
}
