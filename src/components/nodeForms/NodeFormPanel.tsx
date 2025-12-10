import React from "react";
import { useFlowState } from "../../state/flowState";
import { ApprovalNodeForm } from "./ApprovalNodeForm";
import { AutomatedNodeForm } from "./AutomatedNodeForm";
import { EndNodeForm } from "./EndNodeForm";
import { StartNodeForm } from "./StartNodeForm";
import { TaskNodeForm } from "./TaskNodeForm";

export const NodeFormPanel: React.FC = () => {
  const { nodes, selectedNodeId, removeNode } = useFlowState();
  const node = nodes.find((n) => n.id === selectedNodeId);

  if (!node) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-4 shadow-lg flex items-center justify-center h-36">
        <p className="text-sm text-slate-500 text-center">
          Select a node to configure.
        </p>
      </div>
    );
  }

  const renderForm = () => {
    switch (node.type) {
      case "start":
        return <StartNodeForm nodeId={node.id} data={node.data as any} />;
      case "task":
        return <TaskNodeForm nodeId={node.id} data={node.data as any} />;
      case "approval":
        return <ApprovalNodeForm nodeId={node.id} data={node.data as any} />;
      case "automated":
        return <AutomatedNodeForm nodeId={node.id} data={node.data as any} />;
      case "end":
        return <EndNodeForm nodeId={node.id} data={node.data as any} />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-5 shadow-lg space-y-4">
      {/* Header with Delete */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Node Settings</h3>
        <button
          onClick={() => removeNode(node.id)}
          className="text-xs text-rose-600 font-semibold px-2 py-1 rounded hover:bg-rose-100 transition-all"
          type="button"
        >
          Delete
        </button>
      </div>

      {/* Node Form */}
      <div className="space-y-4">{renderForm()}</div>
    </div>
  );
};
