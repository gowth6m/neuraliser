import { Box } from "@mui/material";
import React from "react";
import AvailableArchitecturesView from "./AvailableArchitecturesView";
import NoFileSelected from "./NoFileSelected";
import { useFilesContext } from "@/contexts/filesContext";
import FileHistoryView from "./FileHistoryView";

const LandingView = () => {
    const { history } = useFilesContext();

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
            {history && history.length > 0 && <FileHistoryView />}
        </Box>
    );
};

export default LandingView;
