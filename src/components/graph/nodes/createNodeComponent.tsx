import React from "react";
import { Box, colors, Typography } from "@mui/material";
import { BaseNode } from "./BaseNode";
import { IGraphNode } from "@/models/models";

export const createNodeComponent = (type: string) => {
    const NodeComponent: React.FC<{ data: IGraphNode }> = ({ data }) => {
        let displayText = "";
        let additionalInformation = null;
        let style = {};

        const additionalWidth = () => (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.grey[200],
                    flexDirection: "column",
                    p: 1,
                }}
            >
                <Typography>
                    {data.parameters?.size && `${data.parameters?.size}`}
                </Typography>
                <Typography>
                    {data.parameters?.pad && `Pad: ${data.parameters?.pad}`}
                </Typography>
            </Box>
        );

        switch (type) {
            case "Input":
                displayText = "Input";
                style = {
                    background: colors.purple[100],
                    borderRadius: 4,
                };
                break;
            case "Output":
                displayText = "Output";
                style = {
                    background: colors.purple[200],
                    borderRadius: 4,
                };
                break;
            case "Convolution":
                displayText = "Convolution";
                style = {
                    background: colors.blue[100],
                    borderRadius: 4,
                };
                additionalInformation = additionalWidth();

                break;
            case "ReLU":
                displayText = "ReLU";
                style = { background: colors.red[100], borderRadius: 4 };
                break;
            case "MaxPool":
                displayText = "MaxPool";
                style = {
                    background: colors.green[100],
                    borderRadius: 4,
                };
                additionalInformation = additionalWidth();
                break;
            case "FC":
                displayText = "Fully Connected";
                style = {
                    background: colors.green[200],
                    borderRadius: 4,
                };
                break;
            case "Flatten":
                displayText = "Flatten";
                style = {
                    background: colors.blue[200],
                    borderRadius: 4,
                };
                break;
            case "Concat":
                displayText = "Concat";
                style = {
                    background: colors.orange[100],
                    borderRadius: 4,
                };
                break;

            case "Softmax":
                displayText = "Softmax";
                style = {
                    background: colors.orange[200],
                    borderRadius: 4,
                };
                break;
            case "Linear":
                displayText = "Linear";
                style = {
                    background: colors.pink[100],
                    borderRadius: 4,
                };
                break;
            case "FeedForward":
                displayText = "Feed Forward";
                style = {
                    background: colors.pink[200],
                    borderRadius: 4,
                };
                break;
            case "PositionalEncoding":
                displayText = "Positional Encoding";
                style = {
                    background: colors.purple[100],
                    borderRadius: 4,
                };
                break;
            case "InputEmbedding":
                displayText = "Input Embedding";
                style = {
                    background: colors.purple[200],
                    borderRadius: 4,
                };
                break;
            case "OutputEmbedding":
                displayText = "Output Embedding";
                style = {
                    background: colors.blue[100],
                    borderRadius: 4,
                };
                break;
            case "AddAndNorm":
                displayText = "Add & Norm";
                style = {
                    background: colors.blue[200],
                    borderRadius: 4,
                };
                break;
            case "MultiHeadAttention":
                displayText = "Multi-Head Attention";
                style = {
                    background: colors.green[100],
                    borderRadius: 4,
                };
                break;
            default:
                break;
        }

        return (
            <BaseNode
                type={type}
                data={data}
                displayText={displayText}
                additionalInformation={additionalInformation}
                style={style}
            />
        );
    };

    NodeComponent.displayName = type + "Node";

    return NodeComponent;
};
