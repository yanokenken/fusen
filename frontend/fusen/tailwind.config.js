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
    themes: ["dark","light","dracula","business","night","winter",
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
          "primary": "#ffd3d3",
          "secondary": "#ffdd60",
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
          "accent": "#008fa8",
          "neutral": "#515c82",
          "base-100": "#f5f6fa",
          "info": "#81caef",
          "success": "#15a870",
          "warning": "#fb8209",
          "error": "#db3e33",
        },
        dark: {
          "primary": "#641ae6",
          "secondary": "#c441a1",
          "accent": "#1fb2a6",
          "neutral": "#202328",
          // "base-100": "#1d232a",
          "base-100": "#3f454f",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
        dark2: {
          "primary": "#714db5",
          "secondary": "#7ECA9C",
          "accent": "#b7ff43",
          "neutral": "#1a222e",
          "base-100": "#33435b",
          "info": "#5d95ea",
          "success": "#18dc81",
          "warning": "#f9cd1a",
          "error": "#f33974",
        },
        dark3: {
          "primary": "#119876",
          "secondary": "#FFE227",
          "accent": "#ff712f",
          "neutral": "#1c333f",
          "base-100": "#335a71",
          "info": "#a5dae9",
          "success": "#13aa70",
          "warning": "#ddbb00",
          "error": "#e76e6e",
        },
        dark4: {
          "primary": "#570df8",
          "secondary": "#7ECA9C",
          "accent": "#ffbd09",
          "neutral": "#1a222e",
          "base-100": "#353E4B",
          "info": "#5d95ea",
          "success": "#18dc81",
          "warning": "#f9cd1a",
          "error": "#f33974",
        },

      },
    ],
  },
}
