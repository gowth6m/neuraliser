import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { DrawerStateProvider } from "@/contexts/drawerContext";
import { GraphStateProvider } from "@/contexts/graphContext";
import { ViewStateProvider } from "@/contexts/viewContext";
import { FilesProvider } from "@/contexts/filesContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <DrawerStateProvider>
            <GraphStateProvider>
                <ViewStateProvider>
                    <FilesProvider>
                        <ThemeProvider theme={theme}>
                            <Component {...pageProps} />
                        </ThemeProvider>
                    </FilesProvider>
                </ViewStateProvider>
            </GraphStateProvider>
        </DrawerStateProvider>
    );
}
