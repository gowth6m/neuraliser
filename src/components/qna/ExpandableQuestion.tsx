import React, { FC, ReactNode, useState } from "react";
import { ListItem, Collapse, Typography, ListItemButton } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

type Props = {
    question: string;
    answer: ReactNode;
};

const ExpandableQuestion: FC<Props> = ({ question, answer }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <ListItem
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "flex-start",
                border: "1px solid",
                borderRadius: 2,
                borderColor: "grey.300",
                p: 0,
            }}
        >
            <ListItemButton
                onClick={handleClick}
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    py: 2,
                }}
            >
                <Typography variant="subtitle1" fontWeight={700}>
                    {question}
                </Typography>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} unmountOnExit sx={{ width: "100%" }}>
                <Typography
                    variant="body1"
                    sx={{
                        width: "100%",
                        px: 2,
                        py: 1,
                    }}
                >
                    {answer}
                </Typography>
            </Collapse>
        </ListItem>
    );
};

export default ExpandableQuestion;
