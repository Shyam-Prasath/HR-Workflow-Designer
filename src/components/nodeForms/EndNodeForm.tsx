import React, { useState } from "react";
import { useFlowState } from "../../state/flowState";
import { EndNodeData } from "../../types";

type EndNodeFormProps = {
  nodeId: string;
  data: EndNodeData;
};

export const EndNodeForm: React.FC<EndNodeFormProps> = ({ nodeId, data }) => {
  const { updateNodeData } = useFlowState();
  const [title, setTitle] = useState(data.title);
  const [summary, setSummary] = useState(data.summary);

  const handleUpdate = (field: keyof EndNodeData, value: any) => {
    updateNodeData(nodeId, { [field]: value });
  };

  const inputClasses =
    "mt-1 block w-full rounded-xl border border-red-200 bg-red-50/80 px-3 py-2 text-sm shadow-sm focus:border-red-400 focus:ring focus:ring-red-200 focus:ring-opacity-50 transition";
    
  const labelClasses = "text-sm font-medium text-red-700";

  return (
    <div className="space-y-4">
      <div>
        <label className={labelClasses}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleUpdate("title", e.target.value);
          }}
          className={inputClasses}
          placeholder="Enter node title"
        />
      </div>

      <div>
        <label className={labelClasses}>Summary</label>
        <textarea
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
            handleUpdate("summary", e.target.value);
          }}
          className={inputClasses + " resize-none h-20"}
          placeholder="Enter summary or notes"
        />
      </div>
    </div>
  );
};
