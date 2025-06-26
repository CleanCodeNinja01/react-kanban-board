import { useState } from "react";
import "./App.css";
import type { Columns } from "./assets/App.types";
import Column from "./Column";

const initialData: Columns = {
  backlog: {
    name: "Backlog",
    items: [],
  },
  todo: {
    name: "To Do",
    items: [
      { id: "1", content: "Learn React" },
      { id: "2", content: "Setup Kanban Board" },
    ],
  },
  "in-progress": {
    name: "In Progress",
    items: [{ id: "3", content: "Implement Drag and Drop" }],
  },
  done: {
    name: "Done",
    items: [{ id: "4", content: "Write blog post" }],
  },
};

function App() {
  const [columns, setColumns] = useState<Columns>(initialData);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem = { id: Date.now().toString(), content: newTask };
      const backlogColumn = columns["backlog"];
      const updatedBacklogItems = [...backlogColumn.items, newTaskItem];

      setColumns({
        ...columns,
        backlog: { ...backlogColumn, items: updatedBacklogItems },
      });

      setNewTask("");
    }
  };

  const editTask = (columnId: string, taskId: string, newContent: string) => {
    const column = columns[columnId];
    const updatedItems = column.items.map((item) =>
      item.id === taskId ? { ...item, content: newContent } : item
    );

    setColumns({
      ...columns,
      [columnId]: { ...column, items: updatedItems },
    });
  };

  const deleteTask = (columnId: string, taskId: string) => {
    const column = columns[columnId];
    const updatedItems = column.items.filter((item) => item.id !== taskId);

    setColumns({
      ...columns,
      [columnId]: { ...column, items: updatedItems },
    });
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          style={{ padding: "8px", marginRight: "10px" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />
        <button onClick={addTask} style={{ padding: "8px" }}>
          Add Task
        </button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            columnId={columnId}
            column={column}
            editTaskInEachCol={editTask}
            deleteTaskInEachCol={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
