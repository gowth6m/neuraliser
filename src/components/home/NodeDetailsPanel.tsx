import React, { FC } from "react";
import Row from "../utils/Row";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddNodeButton from "../graph/AddNodeButton";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useGraphStateContext } from "@/contexts/graphContext";
import { useViewStateContext } from "@/contexts/viewContext";

const NodeDetailsPanel: FC = () => {
    const { setSelectedNode, selectedNode, removeNode, findNodeById } =
        useGraphStateContext();
    const { graphName } = useViewStateContext();

    const handleCloseSidePanel = () => {
        setSelectedNode(undefined);
    };

    const handlePreviousNode = () => {
        setSelectedNode(
            findNodeById(selectedNode?.data.prevNodeId?.toString() ?? "")
        );
    };

    const handleNextNode = () => {
        setSelectedNode(
            findNodeById(selectedNode?.data.nextNodeId?.toString() ?? "")
        );
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
                        {graphName} <KeyboardArrowRightIcon />{" "}
                        {selectedNode?.type}
                    </Typography>
                    <Typography>Node ID: {selectedNode?.id}</Typography>
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
                <Typography fontSize={16}>Node type: </Typography>
                <Typography fontSize={16} fontWeight={700}>
                    {selectedNode?.type}
                </Typography>
            </Box>

            {/***************************************************
             * Parameters
             ****************************************************/}
            {selectedNode?.data.parameters && (
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
                        Parameters
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            my: 1,
                        }}
                    >
                        {Object.entries(selectedNode.data.parameters).map(
                            ([key, value]) => (
                                <Typography key={key} fontSize={16}>
                                    {`${key}: ${value}`}
                                </Typography>
                            )
                        )}
                    </Box>
                </Box>
            )}

            {/***************************************************
             * Node details
             ****************************************************/}
            {selectedNode?.data.prevNodeId !== undefined && (
                <Box
                    sx={{
                        p: 2,
                        m: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid grey",
                        borderColor: "grey.300",
                        borderRadius: 2,
                    }}
                >
                    <Typography fontSize={16} fontWeight={700}>
                        Previous node:{" "}
                    </Typography>
                    <Button onClick={handlePreviousNode}>
                        Node {selectedNode?.data.prevNodeId}
                    </Button>
                </Box>
            )}
            {selectedNode?.data.nextNodeId !== undefined && (
                <Box
                    sx={{
                        p: 2,
                        m: 2,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        border: "1px solid grey",
                        borderColor: "grey.300",
                        borderRadius: 2,
                    }}
                >
                    <Typography fontSize={16} fontWeight={700}>
                        Next node:{" "}
                    </Typography>
                    <Button onClick={handleNextNode}>
                        Node {selectedNode?.data.nextNodeId}
                    </Button>
                </Box>
            )}

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
                    <AddNodeButton />
                    <Button
                        sx={{
                            color: "grey.800",
                            border: "1px solid grey",
                            ":hover": {
                                color: "grey.900",
                                borderColor: "grey.900",
                            },
                        }}
                        onClick={() => removeNode(selectedNode?.data.id)}
                    >
                        Remove node
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default NodeDetailsPanel;
