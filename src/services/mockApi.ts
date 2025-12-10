// src/services/mockApi.ts

import { WorkflowEdge, WorkflowNode } from "../state/flowState";

export type WorkflowPayload = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  updatedAt: string;
};

// Simulated in-memory backend
let storedWorkflow: WorkflowPayload | null = null;

// Fake network delay
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async saveWorkflow(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
    await wait(600);

    storedWorkflow = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
      updatedAt: new Date().toISOString(),
    };

    return { success: true };
  },

  async loadWorkflow(): Promise<WorkflowPayload | null> {
    await wait(500);

    return storedWorkflow
      ? JSON.parse(JSON.stringify(storedWorkflow))
      : null;
  },

  async resetWorkflow() {
    await wait(300);
    storedWorkflow = null;
    return { success: true };
  }
};
