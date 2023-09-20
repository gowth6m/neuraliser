import { useGraphStateContext } from "@/contexts/graphContext";
import { useViewStateContext } from "@/contexts/viewContext";
import { Box, Typography, IconButton, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import Row from "../utils/Row";
import AddNodeButton from "../graph/AddNodeButton";

const EdgeDetailsPanel = () => {
    const {
        setSelectedEdge,
        selectedEdge,
        removeEdge,
        findNodeById,
        setSelectedNode,
        addNodeOnEdge,
    } = useGraphStateContext();
    const { graphName } = useViewStateContext();

    const handleCloseSidePanel = () => {
        setSelectedEdge(undefined);
    };

    const handleSourceNode = () => {
        setSelectedNode(findNodeById(selectedEdge?.source?.toString() ?? ""));
    };

    const handleTargetNode = () => {
        setSelectedNode(findNodeById(selectedEdge?.target?.toString() ?? ""));
    };

    const handleAddNodeOnEdge = () => {
        addNodeOnEdge("ReLU", "{}");
    };

    return (
        <Box>
            {/***************************************************
             * Header
             ****************************************************/}
            <Row
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                    px: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: 20,
                            fontWeight: 700,
                        }}
                    >
                        {graphName} <KeyboardArrowRightIcon /> Edge
                    </Typography>
                    <Typography>Edge ID: {selectedEdge?.id}</Typography>
                </Box>
                <IconButton onClick={handleCloseSidePanel}>
                    <CloseIcon />
                </IconButton>
            </Row>
            <Divider />

            {/***************************************************
             * Type
             ****************************************************/}
            <Box
                sx={{
                    p: 2,
                    m: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    border: "1px solid grey",
                    borderColor: "grey.300",
                    borderRadius: 2,
                }}
            >
                <Typography fontSize={16}>Edge type: </Typography>
                <Typography fontSize={16} fontWeight={700}>
                    {selectedEdge?.type}
                </Typography>
            </Box>

            {/***************************************************
             * Edge details
             ****************************************************/}
            <Box
                sx={{
                    p: 2,
                    m: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    border: "1px solid grey",
                    borderColor: "grey.300",
                    borderRadius: 2,
                    gap: 2,
                }}
            >
                <Button
                    sx={{ borderRadius: 50, width: 100, mx: "auto" }}
                    onClick={handleSourceNode}
                >
                    Node {selectedEdge?.source}
                </Button>
                <ArrowDownwardIcon sx={{ mx: "auto", fontSize: 40 }} />
                <Button
                    sx={{ borderRadius: 50, width: 100, mx: "auto" }}
                    onClick={handleTargetNode}
                >
                    Node {selectedEdge?.target}
                </Button>
            </Box>

            {/***************************************************
             * Actions
             ****************************************************/}
            <Box
                sx={{
                    p: 2,
                    m: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px solid grey",
                    borderColor: "grey.300",
                    borderRadius: 2,
                }}
            >
                <Typography fontSize={16} fontWeight={700}>
                    Actions
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        my: 1,
                        gap: 2,
                    }}
                >
                    <AddNodeButton addOnEdge={true} />
                    <Button
                        sx={{
                            color: "grey.800",
                            border: "1px solid grey",
                            ":hover": {
                                color: "grey.900",
                                borderColor: "grey.900",
                            },
                        }}
                        onClick={() => {
                            removeEdge(selectedEdge?.id);
                        }}
                    >
                        Remove edge
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EdgeDetailsPanel;
