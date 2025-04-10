import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "hsl(258, 79.80%, 23.30%)"
        },
        secondary: {
            main: "#270C6B"
        }
    },
    typography: {
        fontFamily: "Roboto Slab, Arial, sans-serif"
    },
});

export default theme