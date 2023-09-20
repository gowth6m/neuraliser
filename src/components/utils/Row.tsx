import { Box, SxProps } from "@mui/material";
import React from "react";

interface RowProps {
    children?: React.ReactNode;
    sx?: SxProps;
    flexDir?: "row" | "column";
}

export default function Row(props: RowProps) {
    return (
        <Box
            sx={{
                ...props.sx,
                display: "flex",
                flexDirection: {
                    xs: props.flexDir || "row",
                    md: "row",
                },
                width: "100%",
            }}
        >
            {props.children}
        </Box>
    );
}
