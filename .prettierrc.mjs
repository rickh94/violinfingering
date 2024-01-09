/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  arrowParens: "always",
  quoteProps: "as-needed",
  trailingComma: "all",
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-astro"],
};

export default config;
