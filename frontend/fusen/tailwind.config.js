/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],
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
          "secondary": "#570df8", // 暫定
          "accent": "#00e96c",
          "neutral": "#464f5b", // 暫定
          'base-100': '#e7eef3',// 青っぽい
          "info": "#00a7ff", // 暫定
          "success": "#00af86", // お試し
          "warning": "#fbbd23", // 暫定 
          "error": "#f87272", // 暫定
        },
        light2: {
          "primary": "#475bd1",
          "secondary": "#475bd1",
          "accent": "#9dfc05",
          "neutral": "#49525F",
          "base-100": "#ecedf3",
          "info": "#397cdb",
          "success": "#29d680",
          "warning": "#e8be26",
          "error": "#f87272",
        },
        light3: {
          "primary": "#ffffff",
          "secondary": "#707070",
          "accent": "#2d6bf8",
          "neutral": "#cecece",
          "base-100": "#f1f1f1",
          "base-200": "#f4f4f4",
          "base-300": "#e2e2e2",
          "base-content": "#707070",
          "info": "#478ce1",
          "success": "#3de1ad",
          "warning": "#ffdd60",
          "error": "#f87272",
        },
        light4: {
          "primary": "#00e68e",
          "secondary": "#00e68e",
          "accent": "#00e68e",
          "neutral": "#36c0bd",
          "base-100": "#36c0bd",
          "base-200": "#f8fd47",
          "base-300": "#8e8cc2",
          // "base-content": "#00e68e",
          "info": "#00e68e",
          "success": "#00e68e",
          "warning": "#00e68e",
          "error": "#00e68e",
        },
        // light4: {
        //   "primary": "#4910b4",
        //   "secondary": "#e6ff8b",
        //   "accent": "#4910b4",
        //   "neutral": "#a9a9a9",
        //   "base-100": "#ffae3e",
        //   "base-200": "#fda529",
        //   "base-300": "#fb9201",
        //   "base-content": "#3a00a6",
        //   "info": "#b4ccff",
        //   "success": "#15a870",
        //   "warning": "#ffca37",
        //   "error": "#f87272",
        // },
        dark: {
          "primary": "#641ae6",
          "secondary": "#c441a1",
          "accent": "#1fb2a6",
          "neutral": "#2b2d31",
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
          "neutral": "#212831",
          "base-100": "#33435b",
          "info": "#5d95ea",
          "success": "#18dc81",
          "warning": "#f9cd1a",
          "error": "#f87272",
        },
        dark3: {
          "primary": "#5509f9",
          "secondary": "#7ECA9C",
          "accent": "#ffbd09",
          "neutral": "#30353b",
          "base-100": "#3e4857",
          "info": "#5d95ea",
          "success": "#18dc81",
          "warning": "#f9cd1a",
          "error": "#f87272",
        },
        dark4: {
          "primary": "#406be8",
          "secondary": "#ffe855",
          "accent": "#ff7867",
          "neutral": "#f0f0f0",
          "base-100": "#dcdcdc",
          "base-200": "#c6c3c3",
          "base-300": "#c2c2c2",
          "info": "#a5dae9",
          "success": "#406be8",
          "warning": "#ffd904",
          "error": "#e76e6e",
        },

      },
    ],
  },
}
