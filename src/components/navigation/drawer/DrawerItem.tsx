import { useDrawerStateContext } from "@/contexts/drawerContext";
import { FC } from "react";
import {
    ListItem,
    Tooltip,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import Router from "next/router";

type DrawerItemProps = {
    text: string;
    icon: React.JSX.Element;
    route?: string;
    onClick?: () => void;
};

const DrawerItem: FC<DrawerItemProps> = ({ text, icon, route, onClick }) => {
    const { open, handleDrawerToggle, isMobile } = useDrawerStateContext();

    const closeDrawerAndPush = () => {
        if (isMobile) handleDrawerToggle();
        route && Router.push(route);
        onClick && onClick();
    };

    return (
        <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => closeDrawerAndPush()}
        >
            <Tooltip title={text} placement="right">
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                    />
                </ListItemButton>
            </Tooltip>
        </ListItem>
    );
};

export { DrawerItem };
export type { DrawerItemProps };
