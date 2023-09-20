import React from "react";
import NodeDetailsPanel from "./NodeDetailsPanel";
import NeuralNetworkGraph from "../graph/NeuralNetworkGraph";
import { useGraphStateContext } from "@/contexts/graphContext";
import { Grid, Slide } from "@mui/material";
import { useDrawerStateContext } from "@/contexts/drawerContext";
import EdgeDetailsPanel from "./EdgeDetailsPanel";

const GraphView = () => {
    const { selectedNode, selectedEdge } = useGraphStateContext();
    const { isMobile } = useDrawerStateContext();

    return (
        <Grid container>
            {/********************************************************
             *  Graph display section
             *********************************************************/}
            <Grid
                item
                flex={2}
                sx={{
                    height: {
                        md: "calc(100vh - 4.2rem)",
                        xs: "calc(100vh - 3.8rem)",
                    },
                    width: "100%",
                }}
            >
                <NeuralNetworkGraph />
            </Grid>

            {/********************************************************
             *  Details section
             *********************************************************/}

            {selectedNode && !isMobile && (
                <Slide
                    direction={selectedNode ? "left" : "right"}
                    in={true}
                    mountOnEnter
                    unmountOnExit
                >
                    <Grid
                        item
                        flex={1}
                        sx={{
                            width: "100%",
                            borderLeft: 1,
                            borderColor: "grey.300",
                        }}
                    >
                        <NodeDetailsPanel />
                    </Grid>
                </Slide>
            )}

            {selectedNode && isMobile && (
                <Slide
                    direction={selectedNode ? "left" : "right"}
                    in={true}
                    mountOnEnter
                    unmountOnExit
                >
                    <Grid
                        item
                        flex={"auto"}
                        sx={{
                            width: "100%",
                            borderLeft: 1,
                            borderColor: "grey.300",
                        }}
                    >
                        <NodeDetailsPanel />
                    </Grid>
                </Slide>
            )}

            {selectedEdge && !isMobile && (
                <Slide
                    direction={selectedEdge ? "left" : "right"}
                    in={true}
                    mountOnEnter
                    unmountOnExit
                >
                    <Grid
                        item
                        flex={1}
                        sx={{
                            width: "100%",
                            borderLeft: 1,
                            borderColor: "grey.300",
                        }}
                    >
                        <EdgeDetailsPanel />
                    </Grid>
                </Slide>
            )}

            {selectedEdge && isMobile && (
                <Slide
                    direction={selectedEdge ? "left" : "right"}
                    in={true}
                    mountOnEnter
                    unmountOnExit
                >
                    <Grid
                        item
                        flex={"auto"}
                        sx={{
                            width: "100%",
                            borderLeft: 1,
                            borderColor: "grey.300",
                        }}
                    >
                        <EdgeDetailsPanel />
                    </Grid>
                </Slide>
            )}
        </Grid>
    );
};

export default GraphView;
