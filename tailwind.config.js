const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(215 90% 45%)", // More professional blue
          foreground: "hsl(0 0% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(215 25% 95%)", // Lighter, more subtle secondary
          foreground: "hsl(215 90% 35%)",
        },
        muted: {
          DEFAULT: "hsl(215 25% 97%)",
          foreground: "hsl(215 25% 40%)",
        },
        accent: {
          DEFAULT: "hsl(215 90% 97%)",
          foreground: "hsl(215 90% 45%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(215 25% 15%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(215 25% 15%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}

export default config

