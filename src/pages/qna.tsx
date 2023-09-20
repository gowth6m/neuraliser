import React from "react";
import QnaAppbar from "@/components/qna/QnaAppbar";
import ExpandableQuestion from "@/components/qna/ExpandableQuestion";
import { Layout } from "@/components/layout/Layout";
import { Box, List, ListItem, Typography } from "@mui/material";
import { CodeBlock } from "react-code-blocks";

const QnA = () => {
    return (
        <Layout appBarChild={<QnaAppbar />}>
            <Box sx={{ m: 2 }}>
                <List
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {questionAnswerPairs.map((pair) => (
                        <ExpandableQuestion
                            key={pair.question}
                            question={pair.question}
                            answer={pair.answer}
                        />
                    ))}
                </List>
            </Box>
        </Layout>
    );
};

const supportedNodeTypes = [
    "Convolution",
    "MaxPool",
    "Input",
    "Output",
    "FC",
    "Flatten",
    "Concat",
    "ReLU",
    "Softmax",
    "Linear",
    "FeedForward",
    "PositionalEncoding",
    "InputEmbedding",
    "OutputEmbedding",
    "AddAndNorm",
    "MultiHeadAttention",
];

const jsonExample = `
{
    "nodes": [
        {
            "id": 0,
            "type": "Input"
        },
        {
            "id": 1,
            "type": "MaxPool",
            "parameters": { "kernel_size": 3, "pad": 2, "size": "3x3" }
        },
        {
            "id": 2,
            "type": "Convolution",
            "parameters": {
                "kernel_size": 3,
                "pad": 2,
                "size": "255x5x5"
            }
        },  
        ...
    ],
    "edges": [
        { "source": 0, "target": 1 },
        { "source": 1, "target": 2 },
        { "source": 1, "target": 3 },
        { "source": 2, "target": 4 },
        ...
    ]
}
`;

const questionAnswerPairs = [
    {
        question: "How do I use this application?",
        answer: "This application has predefined networks architecture that you can load and visualise. You can also upload your own network architecture in JSON format.",
    },
    {
        question: "What file formats are supported?",
        answer: (
            <React.Fragment>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Currently, only JSON files are supported. The JSON file must
                    be in the following format containg list of nodes and edges:
                </Typography>
                <CodeBlock
                    text={jsonExample}
                    language={"json"}
                    showLineNumbers={true}
                />
            </React.Fragment>
        ),
    },
    {
        question: "What node types are supported?",
        answer: (
            <React.Fragment>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                    Currently, the following node types are supported:
                </Typography>
                {supportedNodeTypes.map((nodeType) => (
                    <ListItem
                        key={nodeType}
                        style={{
                            listStyleType: "disc",
                            display: "list-item",
                        }}
                        sx={{ ml: 4, py: 0.5 }}
                    >
                        {nodeType}
                    </ListItem>
                ))}
            </React.Fragment>
        ),
    },
    {
        question: "What are features of this application?",
        answer: "This application allows you to upload and visualise the network architecture in a graph, and also allows you to edit the network architecture. You can also save and download the network architecture in JSON format. This application also save the history of the uploaded JSON files in your local storage on your browser.",
    },
];

export default QnA;
