import theme from "@/styles/theme";
import CustomAppbar from "./CustomAppbar";
import DrawerContent from "./drawer/DrawerContent";
import { useDrawerStateContext } from "@/contexts/drawerContext";
import { FC, ReactNode } from "react";
import { Box, Drawer } from "@mui/material";
import {
    DrawerStyled,
    DRAWER_WIDTH,
    DRAWER_WIDTH_CLOSED,
} from "./drawer/DrawerStyled";

type Props = {
    children: any;
    appBarChild?: ReactNode;
};

export const CustomDrawer: FC<Props> = ({ children, appBarChild }) => {
    const { isMobile, open, handleDrawerToggle } = useDrawerStateContext();

    return (
        <Box sx={{ display: "flex", overflowX: "hidden" }}>
            <CustomAppbar
                drawerWidth={DRAWER_WIDTH}
                drawerWidthClosed={DRAWER_WIDTH_CLOSED}
                child={appBarChild}
            />

            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={open}
                    anchor={"left"}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: DRAWER_WIDTH,
                        },
                    }}
                >
                    <DrawerContent />
                </Drawer>
            ) : (
                <DrawerStyled variant="permanent" open={open}>
                    <DrawerContent />
                </DrawerStyled>
            )}
            <Box
                sx={{
                    flexGrow: 1,
                    backgroundColor: theme.palette.common.white,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: theme.palette.common.white,
                        height: { md: "4.2rem", xs: "3.8rem" },
                    }}
                />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: theme.palette.common.white,
                        flexGrow: 1,
                        width: "100%",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};
