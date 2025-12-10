import React, { useEffect, useState } from "react";
import { NodeType, useFlowState } from "../../state/flowState";
import { useWorkflowStorage } from "../../storage/workflowStorage";
import WorkflowHistoryModal from "../history/WorkflowHistoryModal";

const NodeSidebar: React.FC = () => {
  const { addNode, setNodes, setEdges } = useFlowState();
  const { history, load, remove } = useWorkflowStorage();

  const [historyOpen, setHistoryOpen] = useState(false);
  const [savedWorkflows, setSavedWorkflows] = useState(history);

  useEffect(() => {
    setSavedWorkflows(history);
  }, [history]);

  const addNewNode = (type: NodeType) => addNode(type);

  const openHistory = () => {
    setSavedWorkflows(load());
    setHistoryOpen(true);
  };

  const loadWorkflow = (nodes: any[], edges: any[]) => {
    setNodes(nodes);
    setEdges(edges);
    setHistoryOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this saved workflow?")) return;
    remove(id);
    setSavedWorkflows(load());
  };

  return (
    <div className="w-62 h-full bg-white/90 backdrop-blur-sm border-r border-slate-200 p-5 flex flex-col gap-6 shadow-lg rounded-2xl">
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-3">Add Node</h2>
        <div className="grid gap-3">
          {["start", "task", "approval", "automated", "end"].map((type) => (
            <button
              key={type}
              onClick={() => addNewNode(type as NodeType)}
              className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow hover:from-indigo-600 hover:to-indigo-700 transition-all"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Node
            </button>
          ))}
        </div>
      </div>

      <hr className="border-slate-300" />

      <div className="flex flex-col gap-2">
        <button
          onClick={openHistory}
          className="w-full px-4 py-2 rounded-xl bg-green-500 text-white font-medium shadow hover:bg-green-600 transition"
        >
          Load from History
        </button>

        {/*
{savedWorkflows.length > 0 && (
  <div className="mt-2 max-h-64 overflow-auto border border-slate-200 rounded-xl bg-gray-50 p-3 shadow-inner space-y-2">
    {savedWorkflows.map((wf) => (
      <div
        key={wf.id}
        className="flex justify-between items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
      >
        <span
          className="text-sm font-medium text-slate-800 cursor-pointer truncate"
          onClick={() => loadWorkflow(wf.nodes, wf.edges)}
          title={wf.title}
        >
          {wf.title}
        </span>

        <div className="flex gap-1">
          <button
            onClick={() => loadWorkflow(wf.nodes, wf.edges)}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition"
          >
            Load
          </button>
          <button
            onClick={() => handleDelete(wf.id)}
            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)}
*/}

      </div>

      {/* History Modal */}
      {historyOpen && (
        <WorkflowHistoryModal
          open={historyOpen}
          onClose={() => setHistoryOpen(false)}
          onLoad={(nodes, edges) => loadWorkflow(nodes, edges)}
        />
      )}
    </div>
  );
};

export default NodeSidebar;
