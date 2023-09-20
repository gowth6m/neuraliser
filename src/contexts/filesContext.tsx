import {
    FC,
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect,
    useCallback,
} from "react";
import { useGraphStateContext } from "./graphContext";
import { useViewStateContext } from "./viewContext";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Interfaces & Types
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Represents the state and actions associated with the drawer.
 */
interface IFilesState {
    jsonFileData: any;
    setJsonFileData: Dispatch<SetStateAction<any>>;
    fileName?: string;
    setFileName: Dispatch<SetStateAction<string | undefined>>;
    setSaveToLocal: (jsonFileData: any, fileName: string) => void;
    history?: IJsonFileHistory[];
    downloadJsonFile: () => void;
}

interface IJsonFileHistory {
    fileName: string;
    jsonFileData: any;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Context Initialisation
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * The JsonFileState provides access to drawer state and actions.
 * This context should only be consumed within components wrapped by the FilesProvider.
 */
const FilesStateContext = createContext<IFilesState | undefined>(undefined);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Provider Component
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * The FilesProvider is a React component that provides drawer state and actions
 * to its child components.
 *
 * @param {ReactNode} children - Child components that can consume the drawer state.
 * @returns {JSX.Element} A component wrapping its children in the context provider.
 */
export const FilesProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [jsonFileData, setJsonFileData] = useState<any>(undefined);
    const [fileName, setFileName] = useState<string | undefined>(undefined);
    const [history, setHistory] = useState<IJsonFileHistory[]>([]);
    const { nodes, edges } = useGraphStateContext();
    const { graphName } = useViewStateContext();

    /**
     * Saves the jsonFileData to local storage.
     */
    const setSaveToLocal = useCallback(
        (jsonFileData: any, fileName: string) => {
            setHistory((prevHistory) => {
                const existingIndex = prevHistory.findIndex(
                    (entry) => entry.fileName === fileName
                );
                let newHistory;
                if (existingIndex !== -1) {
                    // Replace the existing entry
                    newHistory = [...prevHistory];
                    newHistory[existingIndex] = { fileName, jsonFileData };
                } else {
                    // Append new entry
                    newHistory = [...prevHistory, { fileName, jsonFileData }];
                }
                localStorage.setItem(
                    "jsonFileHistory",
                    JSON.stringify(newHistory)
                );
                return newHistory;
            });
        },
        []
    );

    /**
     * Downloads a json file of the current graph.
     */
    const downloadJsonFile = () => {
        const jsonData = {
            nodes: nodes,
            edges: edges,
        };
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const fileName = graphName?.includes(".json")
            ? graphName
            : `${graphName}.json`;
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
    };

    /**
     * Loads the jsonFileHistory from local storage to the context.
     */
    useEffect(() => {
        const history: IJsonFileHistory[] = JSON.parse(
            localStorage.getItem("jsonFileHistory") ?? "[]"
        );
        setHistory(history);
    }, []);

    /**
     * Saves the current jsonFileData to local storage when the fileName changes.
     */
    useEffect(() => {
        if (jsonFileData && fileName) {
            setSaveToLocal(jsonFileData, fileName);
        }
    }, [fileName, jsonFileData, setSaveToLocal]);

    return (
        <FilesStateContext.Provider
            value={{
                jsonFileData,
                setJsonFileData,
                fileName,
                setFileName,
                setSaveToLocal,
                history,
                downloadJsonFile,
            }}
        >
            {children}
        </FilesStateContext.Provider>
    );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Custom Hook for Context Consumption
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * A custom hook to access the drawer state and associated actions.
 * Must be used within a FilesProvider.
 *
 * @throws Error if used outside of a FilesProvider.
 * @returns The drawer state and associated actions.
 */
export const useFilesContext = (): IFilesState => {
    const context = useContext(FilesStateContext);
    if (!context) {
        throw new Error("useFilesContext must be used within a FilesProvider");
    }
    return context;
};
