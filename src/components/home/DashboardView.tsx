import { Box } from "@mui/material";
import React from "react";
import AvailableArchitecturesView from "./AvailableArchitecturesView";
import NoFileSelected from "./NoFileSelected";

const LandingView = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 2,
            }}
        >
            <NoFileSelected />
            <AvailableArchitecturesView />
        </Box>
    );
};

export default LandingView;
