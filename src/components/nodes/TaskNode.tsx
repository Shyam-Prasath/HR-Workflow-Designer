import React from "react";
import { WorkflowNode } from "../../state/flowState";
import { TaskNodeData } from "../../types";

type TaskNodeProps = {
  node: WorkflowNode; // Accept full node object
};

export const TaskNode: React.FC<TaskNodeProps> = ({ node }) => {
  const data = node.data as TaskNodeData;
  const tasks = data.tasks || [];

  return (
    <div className="min-w-[180px] max-w-[220px] rounded-2xl border border-blue-300 bg-blue-50/90 backdrop-blur-sm p-4 shadow-md hover:shadow-lg transition">
      <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
        Task
      </div>

      <div className="mt-1 text-lg font-bold text-blue-900 truncate">
        {data.title || "Task Node"}
      </div>

      <div className="mt-3 space-y-1">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={index}
              className="text-[11px] text-blue-900 bg-white/70 border border-blue-200 rounded px-2 py-1 truncate"
              title={task}
            >
              {task}
            </div>
          ))
        ) : (
          <p className="text-xs text-blue-800">No tasks added yet.</p>
        )}
      </div>
    </div>
  );
};
