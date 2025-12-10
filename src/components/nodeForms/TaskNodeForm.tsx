import React, { useState } from "react";
import { useFlowState } from "../../state/flowState";
import { TaskNodeData } from "../../types";

type TaskNodeFormProps = {
  nodeId: string;
  data: TaskNodeData;
};

export const TaskNodeForm: React.FC<TaskNodeFormProps> = ({ nodeId, data }) => {
  const { updateNodeData } = useFlowState();
  const [title, setTitle] = useState(data.title);
  const [tasks, setTasks] = useState(data.tasks || []);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    updateNodeData(nodeId, { tasks: updatedTasks });
    setNewTask("");
  };

  const handleRemoveTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    updateNodeData(nodeId, { tasks: updatedTasks });
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Enter node title"
        />
      </div>

      {/* Tasks List */}
      <div>
        <label className="text-sm font-medium text-gray-700">Tasks</label>
        <div className="flex space-x-2 mt-1">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
            className="flex-1 rounded-md border-gray-300 shadow-sm text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <button
            onClick={handleAddTask}
            type="button"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <ul className="mt-2 space-y-1 max-h-40 overflow-auto">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center text-xs text-blue-900 bg-white/70 border border-blue-200 rounded px-2 py-1 shadow-sm"
            >
              <span className="truncate">{task}</span>
              <button
                onClick={() => handleRemoveTask(index)}
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
