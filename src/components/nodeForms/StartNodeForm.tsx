import React, { useState } from "react";
import { useFlowState } from "../../state/flowState";
import { StartNodeData } from "../../types";

type StartNodeFormProps = {
  nodeId: string;
  data: StartNodeData;
};

export const StartNodeForm: React.FC<StartNodeFormProps> = ({ nodeId, data }) => {
  const { updateNodeData } = useFlowState();
  const [title, setTitle] = useState(data.title);
  const [items, setItems] = useState(data.items || []);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    updateNodeData(nodeId, { items: updatedItems });
    setNewItem("");
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    updateNodeData(nodeId, { items: updatedItems });
  };

  return (
    <div className="space-y-4">
      {/* Title Input */}
      <div>
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateNodeData(nodeId, { title: e.target.value });
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          placeholder="Enter node title"
        />
      </div>

      {/* Items List */}
      <div>
        <label className="text-sm font-medium text-gray-700">Items</label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            className="flex-1 rounded-md border-gray-300 shadow-sm text-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
          />
          <button
            type="button"
            onClick={handleAddItem}
            className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
          >
            Add
          </button>
        </div>

        <ul className="mt-2 space-y-1 max-h-40 overflow-auto">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-xs text-emerald-900 bg-white/70 border border-emerald-200 rounded px-2 py-1 shadow-sm"
            >
              <span className="truncate">{item}</span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="text-red-500 font-bold ml-2 hover:text-red-600 transition"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
