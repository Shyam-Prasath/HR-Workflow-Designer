import { Card, CardContent } from "@/components/ui/card";
import { useWorkflowStorage } from "../../storage/workflowStorage";

type WorkflowHistoryModalProps = {
  open: boolean;
  onClose: () => void;
  onLoad: (nodes: any[], edges: any[]) => void;
};

export default function WorkflowHistoryModal({
  open,
  onClose,
  onLoad,
}: WorkflowHistoryModalProps) {
  const { history, remove } = useWorkflowStorage();

  if (!open) return null;

  const formatTime = (ts: number) => new Date(ts).toLocaleString();

  const handleLoad = (id: string) => {
    const entry = history.find((x) => x.id === id);
    if (!entry) return;
    onLoad(entry.nodes, entry.edges);
    onClose();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this saved version?")) return;
    remove(id);
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] rounded-lg p-3"
    >
      <Card className="w-[500px] max-h-[80vh] overflow-hidden shadow-xl">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Workflow History</h2>
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-10">
              No saved workflows yet.
            </p>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 bg-white rounded shadow flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                >
                  <div
                    className="flex-1"
                    onClick={() => handleLoad(entry.id)}
                  >
                    <div className="font-semibold">{entry.title}</div>
                    <div className="text-xs text-gray-500">
                      {formatTime(entry.timestamp)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="ml-3 px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
