# Neuraliser - Neural network visualiser

Neuraliser is a web application for visualising neural networks as graphs. It allows you to upload JSON files with neural network data and visualise them. You can also edit the neural networks graphs and save them as JSON files. The application is built with React, React flow and MUI. Live demo is available [here][Live Demo].

## Features

-   Visualise neural networks as graphs
-   Upload JSON files with neural network data and visualise them
-   Edit neural networks graphs and save them as JSON files
-   View detailed information about neural networks nodes and edges

## Usage

1. Upload a JSON file with neural network data or view pre-defined neural networks
2. Visualise the neural network as a graph and view detailed information about nodes and edges by clicking on them
3. Edit the neural network by adding, removing or editing nodes and edges
4. When clicked on a Node - view detailed information about it and add node or remove selected node on side detail panel
5. When clicked on an Edge - view detailed information about it and add node in the middle of the edge or remove selected edge on side detail panel
6. Save the neural network as a JSON file by clicking on the export button
7. For more information and questions about the application - click on the Q&A button or visit [QnA][QnA] page

## Installation

1. Clone the repository
2. Install dependencies

```
npm install
```

3. Run the app

```
npm run dev
```

## Example input JSON file

```
{
    "nodes": [
        {
            "id": 0,
            "type": "Input"
        },
        {
            "id": 1,
            "type": "ReLU",
            "parameters": { "kernel_size": 3, "stride": 1 }
        },
        {
            "id": 2,
            "type": "Convolution",
            "parameters": { "kernel_size": 3, "stride": 1 }
        },
        {
            "id": 3,
            "type": "ReLU",
            "parameters": { "kernel_size": 3, "stride": 1 }
        },
    ],
    "edges": [
        { "source": 0, "target": 1 },
        { "source": 1, "target": 2 },
        { "source": 2, "target": 3 },
    ]
}
```

[Live Demo]: https://gowth6m.github.io/neuraliser/
[QnA]: https://gowth6m.github.io/neuraliser/qna
