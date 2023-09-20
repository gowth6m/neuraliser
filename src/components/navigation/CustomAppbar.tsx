import { ReactNode } from "react";
import theme from "@/styles/theme";
import MenuIcon from "@mui/icons-material/Menu";
import { grey } from "@mui/material/colors";
import { AppBar, Grid, IconButton, Toolbar } from "@mui/material";
import { useDrawerStateContext } from "@/contexts/drawerContext";

type Props = {
    drawerWidth: number;
    drawerWidthClosed: number;
    child?: ReactNode;
};

const CustomAppbar = ({ drawerWidth, drawerWidthClosed, child }: Props) => {
    const { open, handleDrawerToggle } = useDrawerStateContext();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                outline: "none",
                borderLeft: "none",
                borderRight: "none",
                width: {
                    md: open
                        ? `calc(100% - ${drawerWidth}px)`
                        : `calc(100% - ${drawerWidthClosed}px)`,
                },
                boxShadow: "none",
                backgroundColor: theme.palette.common.white,
                borderBottom: "solid",
                borderBottomColor: grey[300],
                borderWidth: "1px",
                transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Toolbar sx={{ paddingX: 1.5, width: "100%" }}>
                <Grid
                    container
                    sx={{
                        alignItems: "center",
                        width: "100%",
                        direction: "row",
                    }}
                >
                    <Grid item sx={{ ml: 0.5, display: { md: "none" } }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                color: grey[700],
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid
                        item
                        flex={2}
                        sx={{
                            flexGrow: "auto",
                            width: "100%",
                        }}
                    >
                        {child}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppbar;
