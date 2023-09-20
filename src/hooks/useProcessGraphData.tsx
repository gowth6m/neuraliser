import {
    IGraphNode,
    InputEdgeData,
    InputGraphData,
    InputNodeData,
} from "@/models/models";
import { ProcessedData, ReactFlowNode } from "@/models/reactFlowModels";
import { MarkerType } from "reactflow";

/**
 * This hook contains functions that can be used to process the input graph data
 * into a format that can be used by react-flow to render the graph.
 *
 * @returns An object with a function that can be used to process the input graph
 *
 * @example
 * const { processGraphData } = useProcessedGraphData();
 */
const useProcessedGraphData = () => {
    const yOffset = 180;
    const xOffset = 250;

    /**
     * This function assigns a depth to each node in the graph. The depth of a node
     * is the number of edges between the node and the input node. The depth of the
     * input node is 0.
     *
     * @param _nodes Data for all nodes in the graph
     * @param edges Data for all edges in the graph
     * @returns An object where the key is the id of the node and the value is the
     * depth of the node
     */
    const assignDepthToNodes = (
        _nodes: InputNodeData[],
        edges: InputEdgeData[]
    ) => {
        const depths: { [key: number]: number } = {};

        const visitNode = (nodeId: number, depth: number) => {
            if (!depths[nodeId] || depths[nodeId] < depth) {
                depths[nodeId] = depth;
                const children = edges.filter((edge) => edge.source === nodeId);
                children.forEach((child) => visitNode(child.target, depth + 1));
            }
        };
        visitNode(0, 0);
        return depths;
    };

    /**
     * Processes the input graph data for the edges into a format that can be used
     * by react-flow to render the graph. This includes assigning the correct id
     * to each edge and assigning the correct markerEnd to each edge.
     *
     * @param graphData Input graph data from json file
     * @returns An array of edges that can be used by react-flow to render the graph
     */
    const processEdges = (graphData: InputGraphData) => {
        return graphData !== null
            ? graphData.edges.map((edge) => {
                  return {
                      id: `e${edge.source}-${edge.target}`,
                      source: edge.source.toString(),
                      target: edge.target.toString(),
                      markerEnd: {
                          type: MarkerType.ArrowClosed,
                          width: 40,
                          height: 40,
                          stroke: "black",
                      },
                      type: "smoothstep",
                      //   type: "default",
                  };
              })
            : [];
    };

    /**
     * Processes the input graph data into a format that can be used by react-flow
     * to render the graph. This includes assigning x and y positions to each node
     * and assigning the correct type to each node.
     *
     * The x and y positions are assigned based on the depth of each node. The depth
     * of a node is the number of edges between the node and the input node. The x
     * position is assigned based on the depth of the node, and the y position is
     * assigned based on the depth of the node and the yOffset. The x position is
     * assigned such that nodes at the same depth are placed next to each other.
     *
     * @param graphData Input graph data from json file
     * @returns An object with two arrays, one for nodes and one for edges, that can
     * be used by react-flow to render the graph
     */
    const processGraphData = (graphData: InputGraphData): ProcessedData => {
        if (graphData === null) {
            return { nodes: [], edges: [] };
        }

        let xOffsetPosDir = true;
        const depths = assignDepthToNodes(graphData.nodes, graphData.edges);
        const nodesByDepth: { [key: number]: InputNodeData[] } = {};

        graphData.nodes.forEach((node) => {
            if (!nodesByDepth[depths[node.id]]) {
                nodesByDepth[depths[node.id]] = [];
            }
            nodesByDepth[depths[node.id]].push(node);
        });

        const processedNodes: ReactFlowNode[] = [];

        let prevDepth = depths[0];
        Object.entries(nodesByDepth).forEach(([depth, nodes]) => {
            nodes.forEach((node, index) => {
                const yPosition = parseInt(depth) * yOffset;
                // If the previous node was at the same depth, we can reduce index by 1
                // to make the graph look more compact
                // const xPosition = xOffsetPosDir
                //     ? index * xOffset
                //     : prevDepth === parseInt(depth) && prevDepth !== 0
                //     ? -(index - 1) * xOffset
                //     : -index * xOffset;
                const xPosition = index * xOffset;
                xOffsetPosDir = !xOffsetPosDir;

                processedNodes.push({
                    id: node.id.toString(),
                    type: node.type,
                    position: { x: xPosition, y: yPosition },
                    data: {
                        id: node.id,
                        type: node.type,
                        parameters: node.parameters,
                        nextNodeId: graphData.edges.find(
                            (edge) => edge.source === node.id
                        )?.target,
                        prevNodeId: graphData.edges.find(
                            (edge) => edge.target === node.id
                        )?.source,
                    } as IGraphNode,
                });
                prevDepth = parseInt(depth);
            });
        });
        return { nodes: processedNodes, edges: processEdges(graphData) };
    };

    return { processGraphData };
};

export default useProcessedGraphData;
