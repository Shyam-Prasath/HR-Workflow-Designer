import React from "react";
import { WorkflowNode } from "../../state/flowState";
import { ApprovalNodeData } from "../../types";

type ApprovalNodeProps = {
  node: WorkflowNode;
};

export const ApprovalNode: React.FC<ApprovalNodeProps> = ({ node }) => {
  const data = node.data as ApprovalNodeData;

  return (
    <div className="min-w-[180px] max-w-[220px] rounded-2xl border border-yellow-300 bg-yellow-50/90 backdrop-blur-sm p-4 shadow-md hover:shadow-lg transition">
      <div className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">
        Approval
      </div>

      <div className="mt-1 text-lg font-bold text-yellow-900 truncate">
        {data.title || "Approval Node"}
      </div>

      <div className="mt-3 space-y-1 text-yellow-800 text-xs">
        <div>
          <span className="font-semibold">Approver:</span> {data.approver || "Not assigned"}
        </div>

        <div>
          <span className="font-semibold">Instructions:</span> {data.instructions || "None"}
        </div>

        <div>
          <span className="font-semibold">Required:</span> {data.required ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
};
