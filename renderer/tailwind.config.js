
import colors from 'tailwindcss/colors';

export const content = [
  './renderer/pages/**/*.{js,ts,jsx,tsx}',
  './renderer/components/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    colors: {
      foreground: "#18191c",
      secondaryText: colors.zinc[400],
      button: "#2c2e33",
      background: "#0f1012",
      hover: "#222429",
      border: colors.gray[700],
    },
  },
};
export const plugins = [];
