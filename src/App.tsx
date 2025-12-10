import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { WorkflowCanvas } from "./components/canvas/WorkflowCanvas";
import { NodeFormPanel } from "./components/nodeForms/NodeFormPanel";
import NodeSidebar from "./components/sidebar/NodeSidebar";
import { WorkflowSimulator } from "./components/simulator/WorkflowSimulator";
import { useFlowState } from "./state/flowState";

const App: React.FC = () => {
  const { nodes, edges, setNodes, setEdges } = useFlowState();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setHighlightedNodes([]);
      setSearchResult(null);
      return;
    }

    const query = searchQuery.toLowerCase();
    const matchingNodes = nodes.filter((node) =>
      (node.data.label || "").toLowerCase().includes(query)
    );

    if (matchingNodes.length > 0) {
      setHighlightedNodes(matchingNodes.map((n) => n.id));
      setSearchResult(`${matchingNodes.length} match(es) found`);
    } else {
      setHighlightedNodes([]);
      setSearchResult("No matches found");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-blue-200 shadow-sm">
        <div className="mx-auto max-w-screen-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">

              {/* Mobile Sidebar Toggle */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-blue-100 transition"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                  HR
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-semibold">HR Workflow Designer</h1>
                  <p className="text-xs text-blue-700/70">Build and simulate workflows effortlessly</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 hidden md:flex justify-end items-center gap-2">
              <Input
                placeholder="Search workflows or nodes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="outline" onClick={handleSearch}>Search</Button>
            </div>
          </div>
          {/* Search Result */}
          {searchResult && (
            <p className="text-sm text-blue-700/80 mt-1 ml-4">{searchResult}</p>
          )}
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="mx-auto max-w-screen-6xl px-3 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row gap-4">

        {/* LEFT SIDEBAR */}
        <aside className="hidden lg:block lg:w-72">
          <Card className="p-4 bg-white/90 border border-blue-100 shadow-lg rounded-2xl sticky top-28">
            <h2 className="text-sm font-semibold mb-3">Palette</h2>
            <NodeSidebar />
          </Card>
        </aside>

        {/* MOBILE SIDEBAR */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileSidebarOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 p-4 bg-white shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Palette</h3>
                <button
                  className="text-xl px-2"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  ✕
                </button>
              </div>
              <NodeSidebar />
            </div>
          </div>
        )}

        {/* CANVAS */}
        <section className="flex-1 min-h-[500px] lg:h-auto">
          <Card className="h-full flex flex-col overflow-hidden shadow-xl rounded-2xl border border-blue-100">
            <div className="flex items-center justify-between p-4 border-b border-blue-50">
              <div>
                <h3 className="text-sm font-semibold">Canvas</h3>
                <p className="text-xs text-blue-700/60">
                  Drag & drop nodes, draw connections, export images
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setRightPanelOpen(!rightPanelOpen)}>
                {rightPanelOpen ? "Hide Panel" : "Show Panel"}
              </Button>
            </div>
            <div className="flex-1 min-h-[400px] bg-gradient-to-b from-white to-blue-50 overflow-auto">
              <WorkflowCanvas
                nodes={nodes}
                edges={edges}
                setNodes={setNodes}
                setEdges={setEdges}
                highlightedNodes={highlightedNodes} // pass highlights
              />
            </div>
          </Card>
        </section>

        {/* RIGHT PANEL */}
        <aside className={`transition-all duration-300 ${rightPanelOpen ? "w-80" : "w-11"} shrink-0`}>
          <div className={`flex flex-col gap-4 ${rightPanelOpen ? "" : "items-center"}`}>
            <Card className="p-4 bg-white/90 border border-blue-100 shadow-md rounded-2xl overflow-y-auto max-h-[45vh]">
              {rightPanelOpen ? <NodeFormPanel /> : <button onClick={() => setRightPanelOpen(true)}>▶</button>}
            </Card>
            <Card className="p-4 bg-white/90 border border-blue-100 shadow-md rounded-2xl overflow-y-auto max-h-[45vh]">
              {rightPanelOpen ? <WorkflowSimulator nodes={nodes} edges={edges} /> : <button onClick={() => setRightPanelOpen(true)}>▶</button>}
            </Card>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default App;
