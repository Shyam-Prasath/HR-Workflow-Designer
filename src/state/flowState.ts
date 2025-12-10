import { create } from "zustand";


export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface WorkflowNodeData {
  x: number;
  y: number;
  title?: string;
  [key: string]: any;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;   
  target: string;   
}

interface FlowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;                  
  addNode: (type: NodeType) => void;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  selectNode: (id: string | null) => void;       
  removeNode: (id: string) => void;              
}

export const useFlowState = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  addNode: (type) => {
  const id = `${type}-${Date.now()}`;
  const baseData = { x: 50, y: 50, title: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` };
  
  const typeData = (() => {
    switch (type) {
      case "start": return { ...baseData, items: [] };
      case "task": return { ...baseData, tasks: [] };
      case "approval": return { ...baseData, approver: "", instructions: "", required: false };
      case "automated": return { ...baseData, automationId: "", params: {} };
      case "end": return { ...baseData, summary: "" };
      default: return baseData;
    }
  })();

  const newNode: WorkflowNode = { id, type, data: typeData };
  
  set({ nodes: [...get().nodes, newNode], selectedNodeId: id }); // auto-select
}
,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
    });
  },

  selectNode: (id) => set({ selectedNodeId: id }),

  removeNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
      edges: get().edges.filter((e) => e.source !== id && e.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },
}));
