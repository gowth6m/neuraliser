import DownloadIcon from "@mui/icons-material/Download";
import { Box, Typography, Button } from "@mui/material";
import { FC } from "react";

type Props = {
    graphName?: string;
    downloadJsonFile: () => void;
};

const HomeAppbar: FC<Props> = ({ graphName, downloadJsonFile }) => {
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
                {graphName ? graphName : "Dashboard"}
            </Typography>

            {graphName && (
                <Button sx={{ px: 4 }} onClick={() => downloadJsonFile()}>
                    Export <DownloadIcon sx={{ ml: 1 }} />
                </Button>
            )}
        </Box>
    );
};

export default HomeAppbar;
