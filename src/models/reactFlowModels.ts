import { MarkerType } from "reactflow";
import { IGraphNode } from "./models";

export type ReactFlowNode = {
    id: string;
    type: string;
    position: { x: number; y: number };
    data?: IGraphNode;
};

export type ReactFlowEdge = {
    id: string;
    source: string;
    target: string;
    markerEnd: {
        type: MarkerType;
        width: number;
        height: number;
        stroke: string;
    };
    type: string;
};

export type ProcessedData = {
    nodes: ReactFlowNode[];
    edges: ReactFlowEdge[];
};
