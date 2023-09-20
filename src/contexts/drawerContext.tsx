import React, {
    FC,
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Interfaces & Types
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Represents the state and actions associated with the drawer.
 */
interface IDrawerState {
    open: boolean;
    isMobile: boolean;
    handleDrawerToggle: () => void;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Context Initialisation
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * The DrawerStateContext provides access to drawer state and actions.
 * This context also provides a boolean value to check if the current screen size is mobile.
 *
 * This context should only be consumed within components wrapped by the DrawerStateProvider.
 */
const DrawerStateContext = createContext<IDrawerState | undefined>(undefined);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Provider Component
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * The DrawerStateProvider is a React component that provides drawer state and actions
 * to its child components.
 *
 * @param {ReactNode} children - Child components that can consume the drawer state.
 * @returns {JSX.Element} A component wrapping its children in the context provider.
 */
export const DrawerStateProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const mobileBreakpoint = 900;

    // Local state declarations
    const [open, setOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    /**
     * Toggles the open state of the drawer.
     */
    const handleDrawerToggle = (): void => {
        setOpen((prevOpen) => !prevOpen);
    };

    /**
     * Handles window resize events to update drawer state.
     */
    const handleResize = useCallback((): void => {
        const windowWidth = window.innerWidth;
        setOpen(windowWidth > mobileBreakpoint);
        setIsMobile(windowWidth < mobileBreakpoint);
    }, [mobileBreakpoint]);

    /**
     * Adds a resize event listener to the window to update drawer state.
     */
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    return (
        <DrawerStateContext.Provider
            value={{ open, handleDrawerToggle, isMobile }}
        >
            {children}
        </DrawerStateContext.Provider>
    );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Custom Hook for Context Consumption
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * A custom hook to access the drawer state and associated actions.
 * Must be used within a DrawerStateProvider.
 *
 * @throws Error if used outside of a DrawerStateProvider.
 * @returns The drawer state and associated actions.
 */
export const useDrawerStateContext = (): IDrawerState => {
    const context = useContext(DrawerStateContext);
    if (!context) {
        throw new Error(
            "useDrawerStateContext must be used within a DrawerStateProvider"
        );
    }
    return context;
};
