import React from "react";
import { WorkflowNode } from "../../state/flowState";
import { StartNodeData } from "../../types";

type StartNodeProps = {
  node: WorkflowNode; // Accept full node object
};

export const StartNode: React.FC<StartNodeProps> = ({ node }) => {
  const data = node.data as StartNodeData;
  const items = data.items || [];

  return (
    <div className="min-w-[180px] max-w-[220px] rounded-2xl border border-emerald-300 bg-emerald-50/90 backdrop-blur-sm p-4 shadow-md hover:shadow-lg transition">
      <div className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
        Start
      </div>

      <div className="mt-1 text-lg font-bold text-emerald-900 truncate">
        {data.title || "Start Node"}
      </div>

      <div className="mt-3 space-y-1">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={index}
              className="text-[11px] text-emerald-900 bg-white/70 border border-emerald-200 rounded px-2 py-1 truncate"
              title={item}
            >
              {item}
            </div>
          ))
        ) : (
          <p className="text-xs text-emerald-800">No items yet.</p>
        )}
      </div>
    </div>
  );
};
