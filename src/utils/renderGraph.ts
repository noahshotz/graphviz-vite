import * as d3 from "d3";
import "d3-graphviz";
import parse from "dotparser";

// Extend D3 Selection for `graphviz`
declare module "d3" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Selection<GElement extends d3.BaseType, Datum, PElement extends d3.BaseType, PDatum> {
        graphviz: () => GraphvizRenderer;
    }
}

// Define the GraphvizRenderer type explicitly
interface GraphvizRenderer {
    renderDot: (dotSrc: string) => void;
    engine: (engineName: string) => GraphvizRenderer;
    zoom: (zoom: boolean) => GraphvizRenderer;
}

export const renderGraph = (selector: string, dotSrc: string, engine: string): void => {
    try {
        // Only attempt to render if the DOT is potentially complete
        if (!dotSrc.trim() || !isCompleteDotSyntax(dotSrc)) {
            return;
        }

        // Validate DOT syntax before rendering
        parse(dotSrc);

        // Clear any previous error messages or content
        const graphElement = d3.select(selector);
        graphElement.selectAll("*").remove();

        // Render the graph
        graphElement
            .graphviz()
            .engine(engine || "dot")
            .zoom(false)
            .renderDot(dotSrc);

    } catch (error) {
        // Handle parsing or rendering errors
        console.error("Graph rendering error:", error);

        // Display an error message in the graph container
        const graphElement = d3.select(selector);
        graphElement.selectAll("*").remove();
        graphElement
            .append("div")
            .attr("class", "text-red-500 p-2")
            .text(`Error rendering graph: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

// Helper function to check if DOT syntax looks complete
function isCompleteDotSyntax(dotSrc: string): boolean {
    const trimmedSrc = dotSrc.trim();

    // Check for basic graph structure
    return (
        (trimmedSrc.startsWith('digraph') || trimmedSrc.startsWith('graph')) &&
        (trimmedSrc.includes(';') || trimmedSrc.includes('}'))
    );
}