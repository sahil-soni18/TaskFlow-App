import React from "react";
import { useParams } from "react-router-dom";
import { TaskForm } from "../TaskForm";

const TaskFormPage: React.FC = () => {
  const { id } = useParams();
  const mode = id ? "edit" : "create";

  return <TaskForm mode={mode} />;
};

export default TaskFormPage;
