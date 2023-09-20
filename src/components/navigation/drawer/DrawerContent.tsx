import React from "react";
import DrawerHeader from "./DrawerHeader";
import MenuIcon from "@mui/icons-material/Menu";
import UploadIcon from "@mui/icons-material/Upload";
import HistoryIcon from "@mui/icons-material/History";
import HelpIcon from "@mui/icons-material/Help";
import ErrorPopup from "@/components/utils/ErrorPopup";
import DashboardIcon from "@mui/icons-material/Dashboard";
import useJsonFileConvert from "@/hooks/useJsonFileConvert";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useDrawerStateContext } from "@/contexts/drawerContext";
import { DrawerItemProps, DrawerList } from "./DrawerList";
import { useViewStateContext } from "@/contexts/viewContext";
import { useFilesContext } from "@/contexts/filesContext";
import { useRouter } from "next/router";

const DRAWER_TITLE = "Neuraliser";

const DrawerToggleButton = ({ toggleDrawer }: any) => (
    <IconButton onClick={toggleDrawer}>
        <MenuIcon />
    </IconButton>
);

export default function DrawerContent() {
    const { open, handleDrawerToggle, isMobile } = useDrawerStateContext();
    const { error, openFilePicker, showError, setShowError, openHistoryFile } =
        useJsonFileConvert();
    const { history } = useFilesContext();
    const { openPredefined } = useJsonFileConvert();
    const { setGraphName } = useViewStateContext();
    const router = useRouter();

    const mainMenuListItems: DrawerItemProps[] = [
        {
            text: "Dashboard",
            icon: <DashboardIcon />,
            onClick: () => {
                router.push("/");
                setGraphName(undefined);
            },
        },
        {
            text: "Open model",
            icon: <UploadIcon />,
            onClick: () => {
                router.push("/");
                openFilePicker();
            },
        },
        {
            text: "Q&A",
            icon: <HelpIcon />,
            onClick: () => {
                router.push("/qna");
                setGraphName(undefined);
            },
        },
    ];

    const networkListItems: DrawerItemProps[] = [
        {
            text: "AlexNet",
            icon: <SubdirectoryArrowRightIcon />,
            onClick: () => {
                router.push("/");
                openPredefined("AlexNet");
            },
        },
        {
            text: "BERT",
            icon: <SubdirectoryArrowRightIcon />,
            onClick: () => {
                router.push("/");
                openPredefined("BERT");
            },
        },
        {
            text: "Sample-1",
            icon: <SubdirectoryArrowRightIcon />,
            onClick: () => {
                router.push("/");
                openPredefined("Sample-1");
            },
        },
        {
            text: "Sample-2",
            icon: <SubdirectoryArrowRightIcon />,
            onClick: () => {
                router.push("/");
                openPredefined("Sample-2");
            },
        },
        {
            text: "Sample-3",
            icon: <SubdirectoryArrowRightIcon />,
            onClick: () => {
                router.push("/");
                openPredefined("Sample-3");
            },
        },
    ];

    const jsonFileHistoryListItems: DrawerItemProps[] = history
        ? history.map((item) => {
              return {
                  text: item.fileName,
                  icon: <HistoryIcon />,
                  onClick: () => {
                      router.push("/");
                      openHistoryFile(item.fileName);
                  },
              };
          })
        : [];

    return (
        <React.Fragment>
            <DrawerHeader>
                <DrawerToggleButton toggleDrawer={handleDrawerToggle} />
                {open && (
                    <Box
                        sx={{
                            width: "100%",
                            paddingRight: "2rem",
                            paddingLeft: "0.5rem",
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            color={"grey.600"}
                            fontSize={18}
                        >
                            {DRAWER_TITLE}
                        </Typography>
                    </Box>
                )}
            </DrawerHeader>
            {isMobile && <Divider />}
            <DrawerList listItems={mainMenuListItems} title={"main menu"} />
            <Divider sx={!open ? { py: 0.4 } : { py: 0.4, mb: 0.8 }} />
            <DrawerList listItems={networkListItems} title={"architectures"} />
            {jsonFileHistoryListItems.length > 0 && (
                <React.Fragment>
                    <Divider sx={!open ? { py: 0.4 } : { py: 0.4, mb: 0.8 }} />
                    <DrawerList
                        listItems={jsonFileHistoryListItems}
                        title={"history"}
                    />
                </React.Fragment>
            )}

            {/* Error dialog for file upload */}
            <ErrorPopup
                open={showError}
                setOpen={setShowError}
                msg={`Error occurred during file upload - ${error?.message}`}
            />
        </React.Fragment>
    );
}
