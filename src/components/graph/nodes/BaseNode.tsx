import { Handle, Position } from "reactflow";
import { Box, SxProps, Tooltip, Typography } from "@mui/material";
import { useGraphStateContext } from "@/contexts/graphContext";
import NodeTooltip from "../NodeTooltip";

type BaseNodeProps = {
    type: string;
    data: any;
    displayText: string;
    additionalInformation?: JSX.Element | null;
    style?: SxProps;
};

export const BaseNode: React.FC<BaseNodeProps> = ({
    data,
    displayText,
    additionalInformation,
    style,
}) => {
    const { selectedNode } = useGraphStateContext();
    const isSelected = String(selectedNode?.id) === String(data.id);

    return (
        <Tooltip
            title={<NodeTooltip selectedNode={data} />}
            placement="right"
            componentsProps={{
                tooltip: {
                    sx: {
                        border: "1px solid black",
                        borderRadius: 2,
                        color: "black",
                        backgroundColor: "grey.100",
                    },
                },
            }}
        >
            <Box
                sx={{
                    border: isSelected ? "5px solid black" : "1px solid grey",
                    overflow: "hidden",
                    background: "grey",
                    position: "relative",
                    transition: "all 0.05s ease-in-out",
                    ...style,
                }}
            >
                {/* Output */}
                <Handle
                    type="source"
                    position={Position.Bottom}
                    style={{ background: "#555" }}
                />
                {/* Input */}
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{ background: "#555" }}
                />
                <Typography
                    variant="h6"
                    sx={{
                        py: "10px",
                        px: "20px",
                    }}
                >
                    {displayText}
                </Typography>
                {additionalInformation}
            </Box>
        </Tooltip>
    );
};
