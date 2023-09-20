import { Box, Typography } from "@mui/material";

const QnaAppbar = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Typography variant="h6" color={"grey.800"} sx={{ width: "100%" }}>
                Q&A
            </Typography>
        </Box>
    );
};

export default QnaAppbar;
