import { IGraphNode, SelectedEdge, SelectedNode } from "@/models/models";
import React, {
    FC,
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from "react";
import { Edge, MarkerType, useEdgesState, useNodesState } from "reactflow";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Interfaces & Types
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Represents the state and actions associated with the current graph.
 */
interface IGraphState {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    nodes: any[];
    setNodes: Dispatch<SetStateAction<any[]>>;
    onNodesChange: (nodes: any[]) => void;
    edges: any[];
    setEdges: Dispatch<SetStateAction<any[]>>;
    onEdgesChange: (edges: any[]) => void;
    selectedNode?: SelectedNode;
    setSelectedNode: Dispatch<SetStateAction<SelectedNode | undefined>>;
    removeNode: (id?: number) => void;
    addNode: ({
        nodeType,
        nodePos,
        params,
    }: {
        nodeType: string;
        nodePos: string;
        params: string;
    }) => void;
    selectedEdge?: Edge<any>;
    setSelectedEdge: Dispatch<SetStateAction<Edge<any> | undefined>>;
    removeEdge: (id?: string) => void;
    findNodeById: (id: string) => any;
    findEdgeById: (id: string) => Edge<any> | undefined;
    addNodeOnEdge: (nodeType: string, params: string) => void;
}

const markerEnd = {
    type: MarkerType.ArrowClosed,
    width: 40,
    height: 40,
    stroke: "black",
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Context Initialisation
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * The Graph context provides access to graph state and actions. It stores nodes, edges and
 * the currently selected node.
 *
 * This context should only be consumed within components wrapped by the GraphStateProvider.
 */
const GraphStateContext = createContext<IGraphState | undefined>(undefined);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Provider Component
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * The GraphStateProvider is a React component that provides graph state and actions
 * to its child components.
 *
 * @param {ReactNode} children - Child components that can consume the graph state.
 * @returns {JSX.Element} A component wrapping its children in the context provider.
 */
export const GraphStateProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedNode, setSelectedNode] = useState<SelectedNode | undefined>(
        undefined
    );
    const [selectedEdge, setSelectedEdge] = useState<Edge<any> | undefined>(
        undefined
    );

    /**
     * Removes an edge from the graph.
     *
     * @param id Edge ID to remove from the graph.
     */
    const removeEdge = (id?: string) => {
        setEdges((edges) => edges.filter((edge) => edge.id !== id));
        setSelectedEdge(undefined);
    };

    /**
     * Removes a node from the graph.
     *
     * @param id Node ID to remove from the graph.
     */
    const removeNode = (id?: number) => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id?.toString()));
        setSelectedNode(undefined);
    };

    /**
     * Adds a node to the graph.
     *
     * @param nodeType
     * @param nodePos
     * @param params
     */
    const addNode = ({
        nodeType,
        nodePos,
        params,
    }: {
        nodeType: string;
        nodePos: string;
        params: string;
    }) => {
        const largestId = nodes.reduce(
            (acc, node) => Math.max(acc, parseInt(node.id)),
            0
        );
        const currentId = selectedNode?.id ?? 0;
        const currNode = nodes.find((node) => node.id === currentId.toString());

        try {
            if (nodePos === "before") {
                const node = {
                    id: (largestId + 1).toString(),
                    type: nodeType,
                    data: {
                        id: (largestId + 1).toString(),
                        type: nodeType,
                        parameters: JSON.parse(params),
                        nextNodeId: currNode?.data?.id,
                        prevNodeId: currNode?.data?.prevNodeId,
                    },
                    position: {
                        x: (currNode?.position.x ?? 0) + 200,
                        y: currNode?.position.y ?? 0,
                    },
                };

                setNodes((nodes) => [...nodes, node]);

                const edgeBefore = {
                    id: `e${currNode?.data?.prevNodeId}-${largestId + 1}`,
                    source: currNode?.data?.prevNodeId,
                    target: currentId.toString(),
                    type: "smoothstep",
                    markerEnd: markerEnd,
                };
                const edgeAfter = {
                    id: `e${largestId + 1}-${currentId}`,
                    source: (largestId + 1).toString(),
                    target: currentId.toString(),
                    type: "smoothstep",
                    markerEnd: markerEnd,
                };
                setEdges((edges) => [...edges, edgeBefore, edgeAfter]);
            } else {
                const node = {
                    id: (largestId + 1).toString(),
                    type: nodeType,
                    data: {
                        id: (largestId + 1).toString(),
                        type: nodeType,
                        parameters: JSON.parse(params),
                        nextNodeId: currNode?.data?.nextNodeId,
                        prevNodeId: currNode?.data?.id,
                    },
                    position: {
                        x: (currNode?.position.x ?? 0) + 200,
                        y: currNode?.position.y ?? 0,
                    },
                };

                setNodes((nodes) => [...nodes, node]);

                const edgeBefore = {
                    id: `e${currentId}-${largestId + 1}`,
                    source: currentId.toString(),
                    target: (largestId + 1).toString(),
                    type: "smoothstep",
                    markerEnd: markerEnd,
                };
                const edgeAfter = {
                    id: `e${largestId + 1}-${currNode?.data?.nextNodeId}`,
                    source: (largestId + 1).toString(),
                    target: currNode?.data?.nextNodeId,
                    type: "smoothstep",
                    markerEnd: markerEnd,
                };
                setEdges((edges) => [...edges, edgeBefore, edgeAfter]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    /**
     * Finds a node in the graph by its ID.
     *
     * @param id Node ID to find.
     * @returns Node object with the given ID.
     */
    const findNodeById = (id: string) => {
        return nodes.find((node) => node.id === id);
    };

    /**
     * Finds an edge in the graph by its ID.
     *
     * @param id Edge ID to find.
     * @returns Edge object with the given ID.
     */
    const findEdgeById = (id: string) => {
        return edges.find((edge) => edge.id === id);
    };

    /**
     * Adds a node to the graph on the currently selected edge. The new node will be
     * connected to the source and target nodes of the selected edge.
     *
     * @param nodeType The type of node to add (e.g. "ReLU", "Input", "MaxPool")
     * @param params The parameters to pass to the node (e.g. "{}", "{kernel_size: 2}")
     */
    const addNodeOnEdge = (nodeType: string, params: string) => {
        const largestId = nodes.reduce(
            (acc, node) => Math.max(acc, parseInt(node.id)),
            0
        );
        const currentId = selectedEdge?.id ?? 0;
        const currEdge = edges.find((edge) => edge.id === currentId);

        if (!currEdge?.source || !currEdge?.target) {
            console.error("Missing source or target for the current edge.");
            return;
        }

        try {
            const node = {
                id: (largestId + 1).toString(),
                type: nodeType,
                data: {
                    id: (largestId + 1).toString(),
                    type: nodeType,
                    parameters: JSON.parse(params),
                    nextNodeId: currEdge.target,
                    prevNodeId: currEdge.source,
                },
                position: {
                    x: (findNodeById(currEdge.source)?.position.x ?? 0) + 200,
                    y: findNodeById(currEdge.source)?.position.y ?? 0,
                },
            };

            setNodes((nodes) => [...nodes, node]);

            const edgeBefore = {
                id: `e${currEdge.source}-${largestId + 1}`,
                source: currEdge.source,
                target: (largestId + 1).toString(),
                type: "smoothstep",
                markerEnd: markerEnd,
            };
            const edgeAfter = {
                id: `e${largestId + 1}-${currEdge.target}`,
                source: (largestId + 1).toString(),
                target: currEdge.target,
                type: "smoothstep",
                markerEnd: markerEnd,
            };
            setEdges((edges) => [...edges, edgeBefore, edgeAfter]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <GraphStateContext.Provider
            value={{
                loading,
                setLoading,
                nodes,
                setNodes,
                onNodesChange,
                edges,
                setEdges,
                onEdgesChange,
                selectedNode,
                setSelectedNode,
                removeNode,
                addNode,
                selectedEdge,
                setSelectedEdge,
                removeEdge,
                findNodeById,
                findEdgeById,
                addNodeOnEdge,
            }}
        >
            {children}
        </GraphStateContext.Provider>
    );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Custom Hook for Context Consumption
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * A custom hook to access the graph state and associated actions.
 * Must be used within a GraphStateContextStateProvider.
 *
 * @throws Error if used outside of a GraphStateContextStateProvider.
 * @returns The graph state and associated actions.
 */
export const useGraphStateContext = (): IGraphState => {
    const context = useContext(GraphStateContext);
    if (!context) {
        throw new Error(
            "useGraphStateContext must be used within a GraphStateProvider"
        );
    }
    return context;
};
