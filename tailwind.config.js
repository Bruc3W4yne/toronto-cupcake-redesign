const defaultConfig = require("tailwindcss/defaultConfig")
const shadcnConfig = require("shadcn/ui/tailwind.config")

module.exports = {
  ...shadcnConfig,
  content: [
    ...shadcnConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...shadcnConfig.theme,
    extend: {
      ...shadcnConfig.theme.extend,
      colors: {
        ...shadcnConfig.theme.extend.colors,
        "brand-pink": "#E8477C",
        "accent-gold": "#F4D19B",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        playfair: ["var(--font-playfair)", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
    },
  },
  plugins: [...shadcnConfig.plugins, require("tailwindcss-animate")],
}
