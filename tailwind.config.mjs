import defaultTheme from "tailwindcss/defaultTheme";
import iconify from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [
    iconify.addDynamicIconSelectors({
      iconSets: {
        custom: "./custom-icons.json",
      },
    }),
  ],
};
