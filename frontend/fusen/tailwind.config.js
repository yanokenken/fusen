/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        'tab-sp': 'calc(100vh - 158px)', // h-tab-sp
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
          "secondary": "#ffbd09", // 暫定
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
          "secondary": "#ffbd09",                   
          "accent": "#9dfc05",                   
          "neutral": "#49525F",                   
          "base-100": "#ecedf3",                   
          "info": "#397cdb",                   
          "success": "#29d680",                   
          "warning": "#e8be26",                   
          "error": "#f52e4f",
        },
        light3: {
          "primary": "#e28c85",
          "secondary": "#ebc437",
          "accent": "#f7968d",
          "neutral": "#c4babf",
          "base-100": "#f3f5f7",
          "info": "#478ce1",
          "success": "#3de1ad",
          "warning": "#c5a60d",
          "error": "#df2a2d",
        },
        light4: {
          "primary": "#f7a52a",
          "secondary": "#47d192",
          "accent": "#9dfc05",
          "neutral": "#c0c0c1",
          "base-100": "#ededee",
          "info": "#81caef",
          "success": "#15a870",
          "warning": "#fb8209",
          "error": "#db3e33",
        },
        dark: {
          "primary": "#641ae6",
          "secondary": "#c441a1",
          "accent": "#1fb2a6",
          "neutral": "#2a323c",
          // "base-100": "#1d232a",
          "base-100": "#2e343e",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
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
          "secondary": "#1fb2a6",
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
