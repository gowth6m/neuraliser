import React, { FC, Fragment } from "react";
import { Typography } from "@mui/material";
import { useDrawerStateContext } from "@/contexts/drawerContext";

type DrawerListTitleProps = {
    title?: string;
    paddingTop?: number;
};

const DrawerListTitle: FC<DrawerListTitleProps> = ({ title }) => {
    const { open } = useDrawerStateContext();

    if (title) {
        return (
            <Typography
                sx={{
                    display: open ? "block" : "none",
                    px: 2.5,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    paddingBottom: 0.8,
                }}
            >
                {title}
            </Typography>
        );
    } else {
        return <Fragment></Fragment>;
    }
};

export { DrawerListTitle };
