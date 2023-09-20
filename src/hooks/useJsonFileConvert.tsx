import predefined from "@/data/predefined.json";
import useProcessedGraphData from "./useProcessGraphData";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useGraphStateContext } from "@/contexts/graphContext";
import { useViewStateContext } from "@/contexts/viewContext";
import { useFilesContext } from "@/contexts/filesContext";
import { InputGraphData } from "@/models/models";

type UseJsonFileConvertReturnType = {
    data: object | null;
    error: Error | null;
    openFilePicker: () => void;
    loading: boolean;
    showError: boolean;
    setShowError: Dispatch<SetStateAction<boolean>>;
    openHistoryFile: (fileName: string) => void;
    openPredefined: (fileName: string) => void;
};

/**
 *
 * @returns Returns an object with functions that can be used to open a file picker, open a file from the history,
 * and open a predefined file.
 *
 * @example
 * const {data, error, openFilePicker, loading, showError, setShowError, openHistoryFile, openPredefined} = useJsonFileConvert();
 */
const useJsonFileConvert = (): UseJsonFileConvertReturnType => {
    const { processGraphData } = useProcessedGraphData();
    const { setJsonFileData, setFileName, history } = useFilesContext();
    const { setEdges, setNodes, setSelectedEdge, setSelectedNode } =
        useGraphStateContext();
    const { setGraphName } = useViewStateContext();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<object | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [showError, setShowError] = useState<boolean>(false);

    /**
     * Processes the selected file and sets the graph name, nodes, and edges to
     * the data from the file.
     */
    const processFile = useCallback(
        (file: File) => {
            setLoading(true);
            const reader = new FileReader();

            reader.onload = (event) => {
                try {
                    const result = JSON.parse(event.target!.result as string);
                    setSelectedNode(undefined);
                    setSelectedEdge(undefined);
                    setData(result);
                    const { nodes, edges } = processGraphData(result);
                    setJsonFileData(result);
                    setFileName(file.name);
                    setGraphName(file.name);
                    setNodes(nodes);
                    setEdges(edges);
                } catch (err: any) {
                    setError(err);
                    setShowError(true);
                }
            };

            reader.readAsText(file);
            setLoading(false);
        },
        [
            processGraphData,
            setEdges,
            setFileName,
            setGraphName,
            setJsonFileData,
            setNodes,
            setSelectedEdge,
            setSelectedNode,
        ]
    );

    /**
     * Opens a file picker and processes the selected file. If the file is not a JSON file, an error is thrown.
     * If the file is a JSON file, the file is processed and the graph name, nodes, and edges are set to the
     * data from the file.
     */
    const openFilePicker = useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.onchange = (event) => {
            const file = (event.target as HTMLInputElement).files![0];
            if (file) {
                processFile(file);
            }
        };

        input.click();
    }, [processFile]);

    /**
     * Opens a file from the history (stored in LocalStorage) and sets the graph name, nodes, and edges to
     * the data from the file.
     *
     * @param fileName Name of the file to open
     */
    const openHistoryFile = (fileName: string) => {
        const file = history?.find((entry) => entry.fileName === fileName);
        setJsonFileData(file?.jsonFileData);
        setSelectedNode(undefined);
        setSelectedEdge(undefined);
        setFileName(file?.fileName);
        setGraphName(file?.fileName);
        const { nodes, edges } = processGraphData(file?.jsonFileData);
        setNodes(nodes);
        setEdges(edges);
    };

    /**
     * Opens a predefined file and sets the graph name, nodes, and edges to the
     * data from the file.
     *
     * @param fileName Name of the predefined file to open
     */
    const openPredefined = (fileName: string) => {
        const file = predefined?.find((entry) => entry.name === fileName);
        const data: InputGraphData = file?.data ?? {
            nodes: [],
            edges: [],
        };
        setSelectedNode(undefined);
        setSelectedEdge(undefined);
        setGraphName(file?.name);
        const { nodes, edges } = processGraphData(data);
        setNodes(nodes);
        setEdges(edges);
    };

    return {
        data,
        error,
        openFilePicker,
        loading,
        showError,
        setShowError,
        openHistoryFile,
        openPredefined,
    };
};

export default useJsonFileConvert;
