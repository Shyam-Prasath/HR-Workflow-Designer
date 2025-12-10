export type StartNodeData = {
  title: string;
  items?: string[];
  x: number;
  y: number;
};

export type TaskNodeData = {
  title: string;
  tasks?: string[];
  x: number;
  y: number;
};

export type ApprovalNodeData = {
  title: string;
  approver?: string;
  instructions?: string;
  required?: boolean;
  x: number;
  y: number;
};

export type AutomatedNodeData = {
  title: string;
  automationId?: string;
  params?: Record<string, any>;
  x: number;
  y: number;
};

export type EndNodeData = {
  title: string;
  summary?: string;
  x: number;
  y: number;
};
