import React from "react";
import { useState, useEffect } from "react";
import { dot as dotLanguage } from "@viz-js/lang-dot";
import parse from "dotparser";
import { initaldot } from "../data/dot";
import CodeMirror from "@uiw/react-codemirror";
import GraphComponent from "./GraphComponent";

interface GraphvizProps {
    dot?: string | null;
    engine?: string | null;
};

export const Graphviz: React.FC<GraphvizProps> = ({ dot, engine }) => {
    const [data, setData] = useState(dot || initaldot);
    const [error, setError] = useState<string | null>(null);
    const [lastValidData, setLastValidData] = useState(initaldot);

    // Trigger state updates when the `dot` prop changes
    useEffect(() => {
        if (dot) {
            try {
                parse(dot); // Validate the new DOT string
                setLastValidData(dot); // Update last valid data
                setError(null); // Clear any existing errors
            } catch (err) {
                if (err instanceof Error) {
                    setError(`Syntax Error: ${err.message}`);
                } else {
                    setError("Unexpected error parsing DOT.");
                }
            }
            setData(dot);
        }
    }, [dot, engine]);

    const handleInputChange = (value: string) => {
        try {
            // Only validate if the input looks like a complete DOT graph
            if (value.trim().endsWith(';') || value.trim().endsWith('}')) {
                parse(value); // Try to parse
                setLastValidData(value); // Store last valid input
                setError(null);
            }

            // Always update the current data
            setData(value);
        } catch (err) {
            // If parsing fails, keep the last valid data for rendering
            if (err instanceof Error) {
                setError(`Syntax Error: ${err.message}`);
            } else {
                setError("Unexpected error parsing DOT.");
            }
        }
    };

    return (
        <React.Fragment>
            <CodeMirror
                className="flex-2 h-full w-1/3 ring-1 ring-zinc-200"
                value={data}
                height="100%"
                extensions={[dotLanguage()]}
                onChange={(value) => handleInputChange(value)}
            />
            <div className="relative flex items-center justify-center flex-1 h-full p-2 w-2/3">
                {error ? (
                    <div className="absolute bg-yellow-100 text-yellow-700 mx-6 p-2 px-3 rounded-lg bottom-2">
                        <p>{error}</p>
                    </div>
                ) : null}
                <GraphComponent dot={lastValidData} engine={engine} />
            </div>
        </React.Fragment>
    );
};