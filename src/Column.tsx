import type { ColumnType } from "./assets/App.types";
import Task from "./Task";

type ColumnProps = {
  columnId: string;
  column: ColumnType;
  editTask: (columnId: string, taskId: string, newContent: string) => void;
  deleteTask: (columnId: string, taskId: string) => void;
};

function Column({ columnId, column, editTask, deleteTask }: ColumnProps) {
  return (
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
            <Task
                columnId={columnId}
                editTask={editTask}
                deleteTask={deleteTask}
                task={item}
            />
        ))}
      </div>
    </div>
  );
}

export default Column;
