
interface IGraphNode {
    id: number;
    type: string;
    parameters?: {
        kernel_size?: number;
        stride?: number;
        size?: string;
        pad?: number;
    };
    nextNodeId?: number;
    prevNodeId?: number;
}

type InputNodeData = {
    id: number;
    type: string;
    parameters?: {
        kernel_size?: number;
        stride?: number;
        pad?: number;
        in_channels?: number;
        out_channels?: number;
        activation?: string;
        input_size?: string;
        output_size?: string;
        size?: string;
    };
};

type InputEdgeData = {
    source: number;
    target: number;
};

export type InputGraphData = {
    nodes: InputNodeData[];
    edges: InputEdgeData[];
} | null;

export type SelectedNode = {
    width: number,
    height: number,
    id: string,
    type: string,
    position: {
        x: number,
        y: number
    },
    data: IGraphNode,
    selected: boolean,
    dragging: boolean,
    positionAbsolute: {
        x: number,
        y: number
    }
}

export type SelectedEdge = {
    id: string,
    source: string,
    target: string,
    markerEnd: {
        type: string,
        width: number,
        height: number,
        stroke: string
    },
    type: string,
    selected: boolean
}

export type { IGraphNode, InputNodeData, InputEdgeData };
