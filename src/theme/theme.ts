import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FFFFFF", dark: "#050505", contrastText: "#050505" },
    secondary: { main: "#6CC644", dark: "#3F8F27", contrastText: "#050505" },
    background: { default: "#050505", paper: "#0B0F0A" },
    text: { primary: "#FFFFFF", secondary: "#B7C4B0" },
  },
  typography: {
    fontFamily: "var(--font-montserrat), sans-serif",
    h1: { fontFamily: "var(--font-bodoni), serif", fontWeight: 700 },
    h2: { fontFamily: "var(--font-bodoni), serif", fontWeight: 700 },
    h3: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
    h4: { fontFamily: "var(--font-bodoni), serif", fontWeight: 600 },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 800,
          borderRadius: 2,
          paddingInline: 28,
        },
      },
    },
  },
});

export default theme;
