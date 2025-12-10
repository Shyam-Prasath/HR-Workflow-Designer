import React, { useEffect, useState } from "react";
import { WorkflowEdge, WorkflowNode } from "../../state/flowState";

type WorkflowSimulatorProps = {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};

type ActiveNode = string;

export const WorkflowSimulator: React.FC<WorkflowSimulatorProps> = ({ nodes, edges }) => {
  const [activeNodes, setActiveNodes] = useState<ActiveNode[]>([]);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1000);

  // -----------------------------
  // CONTROLS
  // -----------------------------
  const startSimulation = () => {
    if (!nodes.length) return;

    if (paused) {
      setPaused(false);
      setRunning(true);
      return;
    }

    const startNodes = nodes.filter((n) => n.type === "start").map((n) => n.id);
    setActiveNodes(startNodes);
    setRunning(true);
    setPaused(false);
  };

  const pauseSimulation = () => {
    setPaused(true);
    setRunning(false);
  };

  const stopSimulation = () => {
    setActiveNodes([]);
    setRunning(false);
    setPaused(false);
  };

  const resetSimulation = () => stopSimulation();

  // -----------------------------
  // SIMULATION LOOP
  // -----------------------------
  useEffect(() => {
    if (!running || paused || activeNodes.length === 0) return;

    const timeout = setTimeout(() => {
      const nextNodes: string[] = [];

      activeNodes.forEach((nodeId) => {
        const outgoing = edges
          .filter((e) => e.source === nodeId)
          .map((e) => e.target);

        nextNodes.push(...outgoing);
      });

      if (nextNodes.length === 0) {
        const startNodes = nodes.filter((n) => n.type === "start").map((n) => n.id);
        setActiveNodes(startNodes);
        return;
      }

      setActiveNodes(nextNodes);
    }, speed);

    return () => clearTimeout(timeout);
  }, [activeNodes, running, paused, speed, nodes, edges]);

  const isActive = (id: string) => activeNodes.includes(id);

  // -----------------------------
  // RENDER UI
  // -----------------------------
  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg flex flex-col gap-4">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Workflow Simulator
        </h2>

        {/* Buttons BELOW the heading */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={startSimulation}
            className="px-3 py-1 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            {paused ? "Resume" : "Start"}
          </button>

          <button
            onClick={pauseSimulation}
            disabled={!running}
            className="px-3 py-1 bg-yellow-500 text-white rounded-lg shadow disabled:opacity-50 hover:bg-yellow-600 transition"
          >
            Pause
          </button>

          <button
            onClick={stopSimulation}
            className="px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            Stop
          </button>
        </div>
      </div>

      {/* Speed Control */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Speed:</span>
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value={1500}>Slow</option>
          <option value={1000}>Normal</option>
          <option value={500}>Fast</option>
          <option value={200}>Very Fast</option>
        </select>
      </div>

      {/* Node Visualizer */}
      <div className="flex flex-wrap gap-3 mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`px-4 py-2 rounded-xl border shadow-sm transition-all duration-300 ${
              isActive(node.id)
                ? "bg-yellow-400 border-yellow-600 scale-105"
                : "bg-white border-gray-300 opacity-80"
            }`}
          >
            {node.data.title || node.type.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
};
