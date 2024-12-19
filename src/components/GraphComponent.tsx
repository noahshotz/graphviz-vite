import React, { useEffect, useRef } from "react";
import { renderGraph } from "../utils/renderGraph";

interface GraphComponentProps {
  dot: string;
  engine?: string | null;
  className?: string;
}

const GraphComponent: React.FC<GraphComponentProps> = ({ dot, engine, className }) => {
  const graphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (graphRef.current) {
      // Only attempt to render if dot is not empty
      if (dot && dot.trim()) {
        renderGraph("#graph", dot, engine || "dot");
      } else {
        // Clear the graph if dot is empty
        const graphElement = document.querySelector("#graph");
        if (graphElement) {
          graphElement.innerHTML = '';
        }
      }
    }
  }, [dot, engine]);

  return (
    <div
      ref={graphRef}
      id="graph"
      className={className}
    />
  );
};

export default GraphComponent;