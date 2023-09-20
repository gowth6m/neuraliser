import "reactflow/dist/style.css";
import { useCallback } from "react";
import GraphResize from "@/components/graph/GraphResize";
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    addEdge,
    Edge,
} from "reactflow";
import { useGraphStateContext } from "@/contexts/graphContext";
import { CircularProgress } from "@mui/material";
import { useDrawerStateContext } from "@/contexts/drawerContext";
import { createNodeComponent } from "./nodes/createNodeComponent";
import { IGraphNode } from "@/models/models";

const nodeTypes = {
    Input: createNodeComponent("Input"),
    Convolution: createNodeComponent("Convolution"),
    ReLU: createNodeComponent("ReLU"),
    MaxPool: createNodeComponent("MaxPool"),
    FC: createNodeComponent("FC"),
    Output: createNodeComponent("Output"),
    Flatten: createNodeComponent("Flatten"),
    Concat: createNodeComponent("Concat"),
    Softmax: createNodeComponent("Softmax"),
    Linear: createNodeComponent("Linear"),
    FeedForward: createNodeComponent("FeedForward"),
    PositionalEncoding: createNodeComponent("PositionalEncoding"),
    InputEmbedding: createNodeComponent("InputEmbedding"),
    OutputEmbedding: createNodeComponent("OutputEmbedding"),
    AddAndNorm: createNodeComponent("AddAndNorm"),
    MultiHeadAttention: createNodeComponent("MultiHeadAttention"),
};

const NeuralNetworkGraph = () => {
    const {
        loading,
        setEdges,
        nodes,
        edges,
        onEdgesChange,
        onNodesChange,
        setSelectedEdge,
        setSelectedNode,
    } = useGraphStateContext();
    const { isMobile } = useDrawerStateContext();
    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleClickEdge = (_event: any, edge: Edge<any>) => {
        console.log(edge);
        setSelectedNode(undefined);
        setSelectedEdge(edge);
    };

    const handleClickNode = (_event: any, node: any) => {
        setSelectedEdge(undefined);
        setSelectedNode(node);
    };

    if (loading) <CircularProgress />;

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeClick={handleClickEdge}
            onNodeClick={handleClickNode}
            nodeTypes={nodeTypes}
            fitViewOptions={{ padding: 0.1 }}
            fitView
            proOptions={{
                hideAttribution: true,
            }}
        >
            <GraphResize />
            {!isMobile && <MiniMap />}
            <Controls />
            <Background />
        </ReactFlow>
    );
};

export default NeuralNetworkGraph;
