import { FC } from "react";
import { Box, Divider, Tooltip, Typography, withStyles } from "@mui/material";
import { IGraphNode } from "@/models/models";

type Props = {
    selectedNode: IGraphNode;
};

const NodeTooltip: FC<Props> = ({ selectedNode }) => {
    return (
        <Box
            sx={{
                p: 1,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" fontWeight={700}>
                {selectedNode?.type}
            </Typography>
            <Typography>
                {selectedNode.parameters?.size &&
                    `Size: ${selectedNode.parameters?.size}`}
            </Typography>
            <Typography>
                {selectedNode.parameters?.kernel_size &&
                    `Kernal Size: ${selectedNode.parameters?.kernel_size}`}
            </Typography>
            <Typography>
                {selectedNode.parameters?.pad &&
                    `Pad: ${selectedNode.parameters?.pad}`}
            </Typography>
            <Typography>
                {selectedNode.parameters?.stride &&
                    `Stride: ${selectedNode.parameters?.stride}`}
            </Typography>
        </Box>
    );
};

export default NodeTooltip;
