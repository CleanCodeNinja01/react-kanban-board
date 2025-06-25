import type { ColumnType } from "./assets/App.types";
import Task from "./Task";

type ColumnProps = {
  columnId: string;
  column: ColumnType;
  editTaskInEachCol: (columnId: string, taskId: string, newContent: string) => void;
  deleteTaskInEachCol: (columnId: string, taskId: string) => void;
};

function Column({ columnId, column, editTaskInEachCol, deleteTaskInEachCol }: ColumnProps) {
  const handleEdit = (taskId: string, newContent: string) => {
    editTaskInEachCol(columnId, taskId, newContent)
  }
  const handleDelete = (taskId: string) => {
    deleteTaskInEachCol(columnId, taskId)
  }
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
                editTaskInEachTask={handleEdit}
                deleteTaskInEachTask={handleDelete}
                task={item}
            />
        ))}
      </div>
    </div>
  );
}

export default Column;
