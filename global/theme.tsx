import { createTheme } from "@mui/material/styles/"
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            light: "#2CA3FA",
            main: "#5BA2F4",
            dark: "#034C81",
        },
        secondary: {
            light: "#FFFFFF",
            main: "#C9BBAA",
            dark: "#7F858C",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#FFFFFF",
        },
    },
    typography: {
        fontFamily: "'Raleway', sans-serif",
        h3: {
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 600,
        },
        h4: {
            fontSize: 35,
            fontFamily: "'Raleway', sans-serif",
            color: "#2A2F72",
        },
        h5: {
            fontSize: 28,
            fontFamily: "'Raleway', sans-serif",
        },
        h6: {
            fontSize: 22,
            lineHeight: 1.25,
            fontFamily: "'Raleway', sans-serif",
        },
        subtitle1: {
            fontSize: 18,
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.25,
        },
        subtitle2: {
            fontSize: 16,
            fontFamily: "'Poppins', sans-serif",
        },
        body1: {
            fontSize: 16,
            fontFamily: "'Raleway', sans-serif",
        },
        body2: {
            fontSize: 16,
            fontFamily: "'Poppins', sans-serif",
        },
        button: {
            fontSize: 16,
            fontFamily: "'Poppins', sans-serif",
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default theme;
