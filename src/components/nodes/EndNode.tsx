import React from "react";
import { WorkflowNode } from "../../state/flowState";
import { EndNodeData } from "../../types";

type EndNodeProps = {
  node: WorkflowNode;
};

export const EndNode: React.FC<EndNodeProps> = ({ node }) => {
  const data = node.data as EndNodeData;

  return (
    <div className="min-w-[180px] max-w-[220px] rounded-2xl border border-red-300 bg-red-50/90 backdrop-blur-sm p-4 shadow-md hover:shadow-lg transition">
      <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">
        End
      </div>

      <div className="mt-1 text-lg font-bold text-red-900 truncate">
        {data.title || "End Node"}
      </div>

      <div className="mt-3 text-xs text-red-800">
        {data.summary ? (
          <p className="truncate" title={data.summary}>
            {data.summary}
          </p>
        ) : (
          <p>No summary provided.</p>
        )}
      </div>
    </div>
  );
};
