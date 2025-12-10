import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { WorkflowEdge, WorkflowNode } from "../state/flowState";

export type SavedWorkflow = {
  id: string;
  title: string;
  timestamp: number;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};

export const useWorkflowStorage = () => {
  const [history, setHistory] = useState<SavedWorkflow[]>(() => {
    const stored = localStorage.getItem("workflowHistory");
    return stored ? JSON.parse(stored) : [];
  });

  const save = (title: string, nodes: WorkflowNode[], edges: WorkflowEdge[]) => {
    const entry: SavedWorkflow = {
      id: uuidv4(),
      title,
      timestamp: Date.now(),
      nodes,
      edges,
    };
    const updated = [...history, entry];
    setHistory(updated);
    localStorage.setItem("workflowHistory", JSON.stringify(updated));
  };

  const load = (): SavedWorkflow[] => {
    return history;
  };

  const remove = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("workflowHistory", JSON.stringify(updated));
  };

  const clear = () => {
    setHistory([]);
    localStorage.removeItem("workflowHistory");
  };

  return { history, save, load, remove, clear };
};
