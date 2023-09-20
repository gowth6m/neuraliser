import React from "react";
import useJsonFileConvert from "@/hooks/useJsonFileConvert";
import { Box, Button, Typography } from "@mui/material";
import { useFilesContext } from "@/contexts/filesContext";

const FileHistoryView = () => {
    const { history } = useFilesContext();
    const { openHistoryFile } = useJsonFileConvert();

    if (history === undefined || history.length === 0) return null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2,
                gap: 2,
                mt: 2,
            }}
        >
            <Typography variant="h6">History</Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" },
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                {history.map((model) => (
                    <Button
                        key={model.fileName}
                        sx={{
                            borderRadius: 2,
                            p: 2,
                            minWidth: { md: 200, xs: "100%" },
                            maxWidth: { md: 300, xs: "100%" },
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={() => openHistoryFile(model.fileName)}
                    >
                        <Typography variant="h6" textTransform={"none"}>
                            {model.fileName}
                        </Typography>
                        <Typography variant="subtitle2" textTransform={"none"}>
                            Nodes: {model.jsonFileData.nodes.length}
                        </Typography>
                        <Typography variant="subtitle2" textTransform={"none"}>
                            Edges: {model.jsonFileData.edges.length}
                        </Typography>
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default FileHistoryView;
