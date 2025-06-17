import React, { useState } from "react";
import "./App.css";
import type { Columns } from "./assets/App.types";

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
      <h1>📝 React + TypeScript Kanban Board</h1>
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
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 20px",
            }}
          >
            <h2>{column.name}</h2>
            <div
              style={{
                background: "#eceff1",
                padding: 4,
                width: 250,
                minHeight: 500,
                borderRadius: 5,
              }}
            >
              {column.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    minHeight: "50px",
                    backgroundColor: "#f5f5f5",
                    color: "#333",
                    borderRadius: 4,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    display: "inline-flex",
                  }}
                >
                  <input
                    type="text"
                    value={item.content}
                    onChange={(e) =>
                      editTask(columnId, item.id, e.target.value)
                    }
                    onBlur={(e) =>
                      editTask(columnId, item.id, e.target.value)
                    }
                    style={{
                      border: "none",
                      background: "transparent",
                      width: "100%",
                      color: "#333",
                      fontSize: "16px",
                      textOverflow: "ellipsis"
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        editTask(columnId, item.id, e.currentTarget.value); // Save the updated content
                        e.currentTarget.blur(); // Remove focus from the input field
                      }
                    }}
                  />
                  <button
                    onClick={() => deleteTask(columnId, item.id)}
                    style={{
                      marginLeft: "10px",
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "4px 8px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;