import { styled } from "@mui/material";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1.6),
    ...theme.mixins.toolbar,
}));

export default DrawerHeader;
