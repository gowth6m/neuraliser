import React from "react";
import { Box, Button, Typography } from "@mui/material";
import predefined from "@/data/predefined.json";
import useJsonFileConvert from "@/hooks/useJsonFileConvert";

const AvailableArchitecturesView = () => {
    const predefinedModels = predefined;
    const { openPredefined } = useJsonFileConvert();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                mx: 2,
                gap: 2,
            }}
        >
            <Typography variant="h6">Pre-defined Architectures</Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" },
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                {predefinedModels.map((model) => (
                    <Button
                        key={model.name}
                        sx={{
                            borderRadius: 2,
                            p: 2,
                            minWidth: { md: 200, xs: "100%" },
                            maxWidth: { md: 300, xs: "100%" },
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={() => openPredefined(model.name)}
                    >
                        <Typography variant="h6" textTransform={"none"}>
                            {model.name}
                        </Typography>
                        <Typography variant="subtitle2" textTransform={"none"}>
                            Nodes: {model.data.nodes.length}
                        </Typography>
                        <Typography variant="subtitle2" textTransform={"none"}>
                            Edges: {model.data.edges.length}
                        </Typography>
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default AvailableArchitecturesView;
