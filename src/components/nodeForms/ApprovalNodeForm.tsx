import React, { useState } from "react";
import { useFlowState } from "../../state/flowState";
import { ApprovalNodeData } from "../../types";

type ApprovalNodeFormProps = {
  nodeId: string;
  data: ApprovalNodeData;
};

export const ApprovalNodeForm: React.FC<ApprovalNodeFormProps> = ({ nodeId, data }) => {
  const { updateNodeData } = useFlowState();

  const [title, setTitle] = useState(data.title);
  const [approver, setApprover] = useState(data.approver);
  const [instructions, setInstructions] = useState(data.instructions);
  const [required, setRequired] = useState(data.required);

  const handleUpdate = (field: keyof ApprovalNodeData, value: any) => {
    updateNodeData(nodeId, { [field]: value });
  };

  const inputClasses =
    "mt-1 block w-full rounded-xl border border-yellow-200 bg-yellow-50/80 px-3 py-2 text-sm shadow-sm focus:border-yellow-400 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 transition";

  const labelClasses = "text-sm font-medium text-yellow-700";

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
        <label className={labelClasses}>Approver</label>
        <input
          type="text"
          value={approver}
          onChange={(e) => {
            setApprover(e.target.value);
            handleUpdate("approver", e.target.value);
          }}
          className={inputClasses}
          placeholder="Enter approver name"
        />
      </div>

      <div>
        <label className={labelClasses}>Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => {
            setInstructions(e.target.value);
            handleUpdate("instructions", e.target.value);
          }}
          className={`${inputClasses} resize-none h-20`}
          placeholder="Enter instructions"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => {
            setRequired(e.target.checked);
            handleUpdate("required", e.target.checked);
          }}
          className="h-4 w-4 text-yellow-600 border-yellow-300 rounded focus:ring-yellow-500"
        />
        <label className="text-sm text-yellow-800 font-medium">Required</label>
      </div>
    </div>
  );
};
