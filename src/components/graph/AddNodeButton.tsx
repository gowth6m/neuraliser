import { useGraphStateContext } from "@/contexts/graphContext";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC } from "react";

type Props = {
    addOnEdge?: boolean;
};

const AddNodeButton: FC<Props> = ({ addOnEdge }) => {
    const { addNode, addNodeOnEdge } = useGraphStateContext();
    const [open, setOpen] = React.useState(false);
    const [nodeType, setNodeType] = React.useState("");
    const [nodePos, setNodePos] = React.useState("before");
    const [params, setParams] = React.useState("{}");

    const handleToggleOpen = () => setOpen((prevOpen) => !prevOpen);

    const handleAddNode = () => {
        addNode({
            nodeType,
            nodePos,
            params,
        });
        setOpen(false);
    };

    const handleAddNodeToEdge = () => {
        addNodeOnEdge(nodeType, params);
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleToggleOpen}>
                {addOnEdge ? "Add node on edge" : "Add node"}
            </Button>

            <Dialog open={open} onClose={handleToggleOpen}>
                <DialogTitle>
                    {addOnEdge ? "Add Node on Edge" : "Add Node"}
                </DialogTitle>
                <DialogContent sx={{ minWidth: 400 }}>
                    {/* Node type */}
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel id="node-type-input">Node Type</InputLabel>
                        <Select
                            labelId="node-type-input"
                            value={nodeType}
                            label="Node Type"
                            onChange={(event) => {
                                setNodeType(event.target.value as string);
                            }}
                        >
                            <MenuItem value={"Convolution"}>
                                Convolution
                            </MenuItem>
                            <MenuItem value={"ReLU"}>ReLU</MenuItem>
                            <MenuItem value={"MaxPool"}>MaxPool</MenuItem>
                            <MenuItem value={"FC"}>FC</MenuItem>
                            <MenuItem value={"Flatten"}>Flatten</MenuItem>
                            <MenuItem value={"Input"}>Input</MenuItem>
                            <MenuItem value={"Output"}>Output</MenuItem>
                            <MenuItem value={"Concat"}>Concat</MenuItem>
                            <MenuItem value={"Softmax"}>Softmax</MenuItem>
                            <MenuItem value={"Linear"}>Linear</MenuItem>
                            <MenuItem value={"FeedForward"}>
                                FeedForward
                            </MenuItem>
                            <MenuItem value={"PositionalEncoding"}>
                                PositionalEncoding
                            </MenuItem>
                            <MenuItem value={"InputEmbedding"}>
                                InputEmbedding
                            </MenuItem>
                            <MenuItem value={"OutputEmbedding"}>
                                OutputEmbedding
                            </MenuItem>
                            <MenuItem value={"AddAndNorm"}>AddAndNorm</MenuItem>
                            <MenuItem value={"MultiHeadAttention"}>
                                MultiHeadAttention
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {/* Position */}

                    {!addOnEdge ? (
                        <FormControl fullWidth sx={{ my: 2 }}>
                            <InputLabel id="node-pos-input">
                                Node Position
                            </InputLabel>
                            <Select
                                labelId="node-pos-input"
                                value={nodePos}
                                label="Node Position"
                                onChange={(event) => {
                                    setNodePos(event.target.value as string);
                                }}
                            >
                                <MenuItem value={"before"}>Before</MenuItem>
                                <MenuItem value={"after"}>After</MenuItem>
                            </Select>
                        </FormControl>
                    ) : null}
                    {/* Param */}
                    <TextField
                        fullWidth
                        sx={{ my: 2 }}
                        label="Parameters"
                        value={params}
                        multiline={true}
                        rows={4}
                        helperText="Enter parameters in JSON format"
                        onChange={(event) => {
                            setParams(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ mb: 2, mx: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleToggleOpen}
                        style={{
                            color: grey[800],
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={
                            !addOnEdge ? handleAddNode : handleAddNodeToEdge
                        }
                    >
                        {addOnEdge ? "Add Node to Edge" : "Add Node"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default AddNodeButton;
