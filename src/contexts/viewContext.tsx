import React, {
    FC,
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Interfaces & Types
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Represents the state and actions associated with the drawer.
 */
interface IViewState {
    graphName: string | undefined;
    setGraphName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Context Initialisation
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * The ViewStateContext provides access to drawer state and actions.
 * This context should only be consumed within components wrapped by the ViewStateProvider.
 */
const ViewStateContext = createContext<IViewState | undefined>(undefined);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Provider Component
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * The ViewStateProvider is a React component that provides drawer state and actions
 * to its child components.
 *
 * @param {ReactNode} children - Child components that can consume the drawer state.
 * @returns {JSX.Element} A component wrapping its children in the context provider.
 */
export const ViewStateProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [graphName, setGraphName] = useState<string | undefined>(undefined);

    return (
        <ViewStateContext.Provider value={{ graphName, setGraphName }}>
            {children}
        </ViewStateContext.Provider>
    );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Custom Hook for Context Consumption
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * A custom hook to access the drawer state and associated actions.
 * Must be used within a ViewStateProvider.
 *
 * @throws Error if used outside of a ViewStateProvider.
 * @returns The drawer state and associated actions.
 */
export const useViewStateContext = (): IViewState => {
    const context = useContext(ViewStateContext);
    if (!context) {
        throw new Error(
            "useViewStateContext must be used within a ViewStateProvider"
        );
    }
    return context;
};
