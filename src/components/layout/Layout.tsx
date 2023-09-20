import Head from "next/head";
import theme from "@/styles/theme";
import { Box } from "@mui/material";
import { Fragment, FC, ReactNode } from "react";
import { CustomDrawer } from "../navigation/CustomDrawer";

const metadata = {
    title: "Neural Network Graph Viewer",
    description:
        "Application that visualizes artificial neural network (ANN) as a graph.",
    url: "https://gowtham.io",
};

type LayoutProps = {
    title?: string;
    children?: ReactNode;
    appBarChild?: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ title, children, appBarChild }) => {
    return (
        <Fragment>
            <Head>
                <title>{title ?? metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta property="og:title" content={metadata.title} />
                <meta
                    property="og:description"
                    content={metadata.description}
                />
                <meta property="og:url" content={metadata.url} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/logo/logo.png" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="apple-touch-icon" href="./favicon.png" />
                <link rel="icon" type="image/x-icon" href="./favicon.ico" />
                <meta name="theme-color" content="#0a192f" />
            </Head>

            <main>
                <Box
                    sx={{
                        minHeight: "100vh",
                        backgroundColor: theme.palette.common.white,
                    }}
                >
                    <CustomDrawer appBarChild={appBarChild}>
                        <Box
                            sx={{
                                margin: "auto",
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {children}
                        </Box>
                    </CustomDrawer>
                </Box>
            </main>
        </Fragment>
    );
};
