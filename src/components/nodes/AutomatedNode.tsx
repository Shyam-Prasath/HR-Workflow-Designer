import React from "react";
import { WorkflowNode } from "../../state/flowState";
import { AutomatedNodeData } from "../../types";

type AutomatedNodeProps = {
  node: WorkflowNode;
};

export const AutomatedNode: React.FC<AutomatedNodeProps> = ({ node }) => {
  const data = node.data as AutomatedNodeData;
  const params = data.params || {};

  return (
    <div className="min-w-[180px] max-w-[220px] rounded-2xl border border-purple-300 bg-purple-50/90 backdrop-blur-sm p-4 shadow-md hover:shadow-lg transition">
      <div className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
        Automated
      </div>

      <div className="mt-1 text-lg font-bold text-purple-900 truncate">
        {data.title || "Automated Node"}
      </div>

      <div className="mt-3 space-y-1 text-purple-800 text-xs">
        <div>
          <span className="font-semibold">Automation ID:</span> {data.automationId || "Not set"}
        </div>

        {Object.keys(params).length > 0 ? (
          <div className="mt-1 grid gap-1">
            {Object.entries(params).map(([key, value]) => (
              <div
                key={key}
                className="text-[11px] text-purple-900 bg-white/70 border border-purple-200 rounded px-2 py-1 truncate"
                title={`${key}: ${value}`}
              >
                {key}: {value}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs mt-1">No parameters</p>
        )}
      </div>
    </div>
  );
};
