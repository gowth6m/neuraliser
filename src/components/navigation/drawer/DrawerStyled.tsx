import { Theme, CSSObject, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import MuiDrawer from "@mui/material/Drawer";

const DRAWER_WIDTH = 260;
const DRAWER_WIDTH_CLOSED = 64;

const openedStyles = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
});

const closedStyles = (theme: Theme): CSSObject => ({
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const scrollbarStyles = {
    "&::-webkit-scrollbar": {
        display: "none",
    },
    "&::-webkit-scrollbar-track": {
        background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        background: grey[600],
        borderRadius: "4px",
        display: "none",
        transition: "opacity 0.3s",
    },
    "&:hover::-webkit-scrollbar-thumb": {
        display: "block",
    },
};

const DrawerStyled = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    height: "100vh",
    position: "sticky",
    scrollbarGutter: "stable",
    zIndex: 1200,
    ...(open
        ? {
              ...openedStyles(theme),
              "& .MuiDrawer-paper": {
                  ...openedStyles(theme),
                  overflowY: "scroll",
                  scrollbarGutter: "stable",
                  ...scrollbarStyles,
              },
          }
        : {
              ...closedStyles(theme),
              "& .MuiDrawer-paper": {
                  ...closedStyles(theme),
                  ...scrollbarStyles,
              },
          }),
}));

export { DrawerStyled, DRAWER_WIDTH, DRAWER_WIDTH_CLOSED };
