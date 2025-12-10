# 🚀 Workflow Builder – Visual Drag & Drop Workflow Designer

A powerful **React + TypeScript** based **visual workflow builder** featuring draggable nodes, connections, zooming, history tracking, workflow saving, exporting, and more.

This tool lets users **create, edit, save, and visualize multi-step workflows** using an intuitive drag-and-drop canvas interface.

---

### 📷 **Live Output**
![WhatsApp Image 2025-12-10 at 22 18 53_02fde3e5](https://github.com/user-attachments/assets/2eefd61a-4522-4208-9ae5-09eee4454f9b)
![WhatsApp Image 2025-12-10 at 23 03 12_27f6d051](https://github.com/user-attachments/assets/ddcd85ae-aea3-47eb-a70e-cbbdab0458e0)
![WhatsApp Image 2025-12-10 at 23 03 26_53257b2d](https://github.com/user-attachments/assets/25355c02-8851-4fe1-a3e6-056f4f19fee9)

## ✨ Features

### 🧩 **Node Types**

* **Start Node**
* **Task Node**
* **Approval Node**
* **Automated Node**
* **End Node**

Each node has configurable settings through a dynamic side panel.

---

### 🖱️ **Canvas & Interaction**

* Drag nodes on a huge expandable canvas
* Draw edges between nodes
* Smooth Bézier curve connectors
* Zoom in / out / reset
* Infinite workspace feel

---

### 💾 **Workflow Management**

* Save workflows with custom names
* Auto-store in localStorage
* Load previous workflows
* Version history modal
* Export workflow as:

  * **PNG Image**
  * **JSON File**

---

### 🚧 **Drawing Mode**

Press **Draw Line** → click nodes in sequence → press **Enter** to connect
Press **Esc** to cancel.

---

### 🧰 **Tech Stack**

* **React** (Typescript)
* **Tailwind CSS**
* **shadcn/ui components**
* **html2canvas** (PNG export)
* **Zustand** (Global state)
* **LocalStorage** (Persistence)
* **React Hot Toast** (Feedback)

---

## 📦 Installation

```bash
git clone <repo-url>
cd workflow-builder
npm install
npm run dev
```

---

## 📁 Folder Structure

```
src/
 ├─ components/
 │   ├─ canvas/
 │   │   └─ WorkflowCanvas.tsx
 │   ├─ nodes/
 │   │   ├─ StartNode.tsx
 │   │   ├─ TaskNode.tsx
 │   │   ├─ ApprovalNode.tsx
 │   │   ├─ AutomatedNode.tsx
 │   │   └─ EndNode.tsx
 │   ├─ forms/
 │   │   ├─ StartNodeForm.tsx
 │   │   ├─ TaskNodeForm.tsx
 │   │   ├─ ApprovalNodeForm.tsx
 │   │   ├─ AutomatedNodeForm.tsx
 │   │   └─ EndNodeForm.tsx
 │   ├─ history/
 │   │   └─ WorkflowHistoryModal.tsx
 │   └─ sidebar/
 │       └─ NodeFormPanel.tsx
 │
 ├─ state/
 │   ├─ flowState.ts
 │
 ├─ storage/
 │   ├─ workflowStorage.ts
 │
 ├─ App.tsx
 └─ main.tsx
```

---

## 🛠️ Core Components

### 🖼️ `WorkflowCanvas.tsx`

Main visual canvas:

* Renders nodes + edges
* Handles drag, zoom, scaling
* Contains export, save, draw, history tools

### 🧩 Node Components

Each node type has its own UI + logic.

### ⚙️ Node Form Components

Dynamic right panel forms for editing node data.

### 📚 Zustand Store (`flowState.ts`)

Manages:

* Selected node
* Node/edge collection
* Add/remove/update logic

### 💾 Workflow Storage

Handles saving, loading, exporting via localStorage.

---

## 📤 Exporting Workflows

### 👇 Export PNG

Uses **html2canvas** to capture full canvas.

### 👇 Export JSON

Includes:

```json
{
  "exportedAt": "",
  "nodes": [],
  "edges": []
}
```

---

## 🧪 Running Locally

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🚀 Future Improvements (Optional)

* Infinite canvas with panning
* Keyboard shortcuts (Ctrl+S, Delete node)
* Snap-to-grid
* Mini-map
* Node grouping & multi-select
* Backend sync support

---
