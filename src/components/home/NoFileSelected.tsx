import useJsonFile from "@/hooks/useJsonFileConvert";
import UploadIcon from "@mui/icons-material/Upload";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ErrorPopup from "../utils/ErrorPopup";
import React from "react";

const NoFileSelected = () => {
    const { loading, error, openFilePicker, showError, setShowError } =
        useJsonFile();

    if (loading) return <CircularProgress />;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                border: "1px dashed grey",
                m: 2,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" sx={{ p: 2 }}>
                No file selected
            </Typography>
            <Button
                variant="outlined"
                onClick={openFilePicker}
                sx={{
                    fontSize: 18,
                }}
            >
                <UploadIcon />
                Open
            </Button>
            {/* Error dialog for file upload */}
            <ErrorPopup
                open={showError}
                setOpen={setShowError}
                msg={`Error occurred during file upload - ${error?.message}`}
            />
        </Box>
    );
};

export default NoFileSelected;
