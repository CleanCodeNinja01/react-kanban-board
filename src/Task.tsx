import React from "react";
import type { Card } from "./assets/App.types";

type TaskProps = {
    columnId: string;
    task: Card;
    editTaskInEachTask: (taskId: string, newContent: string) => void;
    deleteTaskInEachTask: (taskId: string) => void;
}

function Task({editTaskInEachTask, deleteTaskInEachTask, task}: TaskProps) {
  return (
    <div
      key={task.id}
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
        value={task.content}
        onChange={(e) => editTaskInEachTask(task.id, e.target.value)}
        onBlur={(e) => editTaskInEachTask(task.id, e.target.value)}
        style={{
          border: "none",
          background: "transparent",
          width: "100%",
          color: "#333",
          fontSize: "16px",
          textOverflow: "ellipsis",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            editTaskInEachTask(task.id, e.currentTarget.value); // Save the updated content
            e.currentTarget.blur(); // Remove focus from the input field
          }  else if (e.key === "Escape") {
            e.currentTarget.blur();
          }
        }}
      />
      <button
        onClick={() => deleteTaskInEachTask(task.id)}
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
  );
}

export default Task;
