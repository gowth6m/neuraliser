import { useGraphStateContext } from "@/contexts/graphContext";
import useJsonFileConvert from "@/hooks/useJsonFileConvert";
import { useEffect } from "react";
import { useReactFlow } from "reactflow";

/**
 * This component is used to trigger a fitView() on the ReactFlow graph.
 *
 * @returns null
 */
const GraphResize = () => {
    const { openPredefined } = useJsonFileConvert();
    const { fitView } = useReactFlow();
    const { setSelectedNode, selectedNode } = useGraphStateContext();

    useEffect(() => {
        if (selectedNode === undefined) {
            setTimeout(
                () =>
                    fitView({
                        padding: 0.1,
                    }),
                0
            );
        }
    }, [fitView, openPredefined, selectedNode]);

    return null;
};

export default GraphResize;
