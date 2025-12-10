import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { WorkflowEdge, WorkflowNode, useFlowState } from "../../state/flowState";
import { useWorkflowStorage } from "../../storage/workflowStorage";
import WorkflowHistoryModal from "../history/WorkflowHistoryModal";
import { ApprovalNode } from "../nodes/ApprovalNode";
import { AutomatedNode } from "../nodes/AutomatedNode";
import { EndNode } from "../nodes/EndNode";
import { StartNode } from "../nodes/StartNode";
import { TaskNode } from "../nodes/TaskNode";

type WorkflowCanvasProps = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
};

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ nodes, edges, setNodes, setEdges }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const { selectNode } = useFlowState();
  const [drawMode, setDrawMode] = useState(false);
  const [drawNodes, setDrawNodes] = useState<string[]>([]);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const { save } = useWorkflowStorage();

  const handleNodeClickForDraw = (nodeId: string) => {
    if (!drawMode) return;
    setDrawNodes((prev) => [...prev, nodeId]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!drawMode) return;

    if (e.key === "Enter") {
      if (drawNodes.length < 2) {
        toast.error("Select at least 2 nodes to draw connections!");
        return;
      }

      const newEdges: WorkflowEdge[] = [];
      for (let i = 0; i < drawNodes.length - 1; i++) {
        newEdges.push({
          id: `${drawNodes[i]}-${drawNodes[i + 1]}-${Date.now() + i}`,
          source: drawNodes[i],
          target: drawNodes[i + 1],
        });
      }

      setEdges([...edges, ...newEdges]);
      setDrawNodes([]);
      setDrawMode(false);
      toast.success("Connection drawn!");
    }

    if (e.key === "Escape") {
      setDrawNodes([]);
      setDrawMode(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    selectNode(id);

    if (drawMode) {
      handleNodeClickForDraw(id);
      return;
    }

    const node = nodes.find((n) => n.id === id);
    if (!node || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    offsetRef.current = {
      x: e.clientX - (rect.left + (node.data.x || 0) * zoom),
      y: e.clientY - (rect.top + (node.data.y || 0) * zoom),
    };

    setDraggingId(id);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingId || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    setNodes(
      nodes.map((n) =>
        n.id === draggingId
          ? {
              ...n,
              data: {
                ...n.data,
                x: (e.clientX - rect.left - offsetRef.current.x) / zoom,
                y: (e.clientY - rect.top - offsetRef.current.y) / zoom,
              },
            }
          : n
      )
    );
  };

  const handleMouseUp = () => setDraggingId(null);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 2));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.3));
  const resetZoom = () => setZoom(1);

  const getBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = Math.abs(x2 - x1);
    return `M ${x1} ${y1} C ${x1 + dx * 0.5} ${y1}, ${x2 - dx * 0.5} ${y2}, ${x2} ${y2}`;
  };

  const onSaveWorkflow = () => {
    if (!workflowName) {
      toast.error("Please enter a workflow name");
      return;
    }

    save(workflowName, nodes, edges);
    setSaveModalOpen(false);
    toast.success("Workflow saved successfully!");
  };

  const downloadAsImage = async () => {
    if (!containerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();

    const canvas = await html2canvas(containerRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
      width: bounds.width,
      height: bounds.height,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `workflow-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    toast.success("Workflow image downloaded!");
  };

  const downloadAsJSON = () => {
    const data = { exportedAt: new Date().toISOString(), nodes, edges };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `workflow-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
    toast.success("Workflow JSON downloaded!");
  };

  const renderNode = (node: WorkflowNode) => {
    switch (node.type) {
      case "start": return <StartNode node={node} />;
      case "task": return <TaskNode node={node} />;
      case "approval": return <ApprovalNode node={node} />;
      case "automated": return <AutomatedNode node={node} />;
      case "end": return <EndNode node={node} />;
      default: return null;
    }
  };

  return (
    <Card className="w-full h-full relative bg-gray-50 shadow-lg overflow-visible">
      <CardContent className="w-full h-full p-0 flex flex-col">

        {/* Toolbar */}
        <div className="absolute top-3 left-3 z-50 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={zoomIn}>+</Button>
          <Button size="sm" variant="outline" onClick={zoomOut}>–</Button>
          <Button size="sm" variant="outline" onClick={resetZoom}>⟳</Button>
          <Button size="sm" variant="default" onClick={() => setSaveModalOpen(true)}>Save</Button>
          <Button size="sm" variant="secondary" onClick={() => setDownloadPopup(true)}>Download</Button>
          <Button size="sm" variant={drawMode ? "destructive" : "secondary"} onClick={() => { setDrawMode(true); setDrawNodes([]); }}>
            {drawMode ? `Drawing (${drawNodes.length})` : "Draw Line"}
          </Button>
          <Button size="sm" variant="outline" onClick={() => setHistoryModalOpen(true)}>History</Button>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className="absolute inset-0 bg-white rounded-md shadow-inner overflow-visible"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "0 0",
            minWidth: "1200px",
            minHeight: "800px",
          }}
        >
          {/* Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {edges.map((edge) => {
              const from = nodes.find((n) => n.id === edge.source);
              const to = nodes.find((n) => n.id === edge.target);
              if (!from || !to) return null;

              return (
                <path
                  key={edge.id}
                  d={getBezierPath(
                    (from.data.x || 0) + 100,
                    (from.data.y || 0) + 40,
                    (to.data.x || 0),
                    (to.data.y || 0) + 40
                  )}
                  stroke="#4B5563"
                  fill="none"
                  strokeWidth={2}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute cursor-move hover:scale-105 transition-transform duration-200"
              style={{ left: node.data.x, top: node.data.y }}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
            >
              {renderNode(node)}
            </div>
          ))}
        </div>
      </CardContent>

      {/* History Modal */}
      <WorkflowHistoryModal
        open={historyModalOpen}
        onClose={() => setHistoryModalOpen(false)}
        onLoad={(loadedNodes, loadedEdges) => {
          setNodes(loadedNodes);
          setEdges(loadedEdges);
        }}
      />

      {/* Download Popup */}
      {downloadPopup && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-xl shadow-xl w-64 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Download As</h2>

            <Button className="w-full" size="sm" variant="default" onClick={() => { downloadAsImage(); setDownloadPopup(false); }}>
              Image (PNG)
            </Button>

            <Button className="w-full" size="sm" variant="secondary" onClick={() => { downloadAsJSON(); setDownloadPopup(false); }}>
              JSON
            </Button>

            <Button className="w-full" size="sm" variant="outline" onClick={() => setDownloadPopup(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Save Modal */}
      <Dialog open={saveModalOpen} onOpenChange={setSaveModalOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Save Workflow</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Enter workflow name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
          />

          <DialogFooter className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setSaveModalOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={onSaveWorkflow}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
