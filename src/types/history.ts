export type WorkflowHistory = {
  id: string;
  timestamp: number;
  snapshot: any; // Store workflow nodes/edges snapshot
};
