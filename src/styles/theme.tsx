import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: {
                        variant: "outlined",
                    },
                    style: {
                        fontSize: 14,
                        color: "grey.800",
                        border: "1px solid grey",
                    },
                },
            ],
            styleOverrides: {
                root: {
                    color: colors.grey[800],
                    border: "1px solid grey",
                    "& .MuiTouchRipple-root": {
                        color: colors.grey[500],
                    },
                    "&:hover": {
                        backgroundColor: colors.grey[200],
                        color: colors.grey[800],
                        borderColor: colors.grey[800],
                    },
                },
            },
        },
    },
});

export default theme;
