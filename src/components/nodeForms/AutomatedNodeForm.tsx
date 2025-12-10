import React, { useState } from "react";
import { useFlowState } from "../../state/flowState";
import { AutomatedNodeData } from "../../types";

type AutomatedNodeFormProps = {
  nodeId: string;
  data: AutomatedNodeData;
};

export const AutomatedNodeForm: React.FC<AutomatedNodeFormProps> = ({ nodeId, data }) => {
  const { updateNodeData } = useFlowState();
  const [title, setTitle] = useState(data.title);
  const [automationId, setAutomationId] = useState(data.automationId);
  const [params, setParams] = useState(data.params || {});
  const [newParamKey, setNewParamKey] = useState("");
  const [newParamValue, setNewParamValue] = useState("");

  const handleAddParam = () => {
    if (!newParamKey.trim()) return;
    const updatedParams = { ...params, [newParamKey]: newParamValue };
    setParams(updatedParams);
    updateNodeData(nodeId, { params: updatedParams });
    setNewParamKey("");
    setNewParamValue("");
  };

  const handleRemoveParam = (key: string) => {
    const updatedParams = { ...params };
    delete updatedParams[key];
    setParams(updatedParams);
    updateNodeData(nodeId, { params: updatedParams });
  };

  const inputClasses =
    "rounded-xl border border-purple-200 bg-purple-50/80 px-3 py-2 text-sm shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition w-full";

  const labelClasses = "text-sm font-medium text-purple-700";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateNodeData(nodeId, { title: e.target.value });
          }}
          className={inputClasses}
          placeholder="Enter node title"
        />
      </div>

      <div>
        <label className={labelClasses}>Automation ID</label>
        <input
          type="text"
          value={automationId}
          onChange={(e) => {
            setAutomationId(e.target.value);
            updateNodeData(nodeId, { automationId: e.target.value });
          }}
          className={inputClasses}
          placeholder="Enter automation ID"
        />
      </div>

      <div>
        <label className={labelClasses}>Parameters</label>

        {/* Wrap inputs and button inside flex-wrap container */}
        <div className="flex flex-wrap gap-2 mt-1">
          <input
            type="text"
            value={newParamKey}
            onChange={(e) => setNewParamKey(e.target.value)}
            placeholder="Key"
            className="flex-1 min-w-[120px] rounded-xl border border-purple-200 bg-purple-50/80 px-2 py-1 text-sm shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition"
          />
          <input
            type="text"
            value={newParamValue}
            onChange={(e) => setNewParamValue(e.target.value)}
            placeholder="Value"
            className="flex-1 min-w-[120px] rounded-xl border border-purple-200 bg-purple-50/80 px-2 py-1 text-sm shadow-sm focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition"
          />
          <button
            onClick={handleAddParam}
            type="button"
            className="px-3 py-1 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition flex-shrink-0"
          >
            Add
          </button>
        </div>

        {Object.keys(params).length > 0 ? (
          <ul className="mt-2 space-y-1 p-2 max-h-40 overflow-auto border border-purple-100 rounded-xl bg-purple-50/50">
            {Object.entries(params).map(([key, value]) => (
              <li
                key={key}
                className="flex justify-between items-center text-xs text-purple-900 bg-white/70 border border-purple-200 rounded-xl px-2 py-1 shadow-sm"
              >
                <span>{key}: {value}</span>
                <button
                  onClick={() => handleRemoveParam(key)}
                  className="text-red-500 font-bold ml-2 hover:text-red-600 transition"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-purple-800 mt-1">No parameters added yet.</p>
        )}
      </div>
    </div>
  );
};
