import axios from "axios";
import { Modal, message } from "antd";

const API_URL = "http://localhost:8080/tasks"; // Backend URL

export const getAllTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const executeTask = async (id: string) => {
  const response = await axios.put(`${API_URL}/${id}/execute`);
  return response.data;
};

export const handleExecute = async (
  taskId: string,
  setExecutingTask: (taskId: string | null) => void,
  loadTasks: () => void
) => {
  setExecutingTask(taskId);
  try {
    const result = await executeTask(taskId);
    setExecutingTask(null);

    if (result?.status === "completed") {
      message.success(`Task "${result.taskName}" executed successfully!`);
    } else {
      message.error(`Task execution failed.`);
    }

    // ✅ Refresh both active task list and task history
    setTimeout(() => {
      loadTasks();
    }, 1000);
  } catch (error) {
    setExecutingTask(null);
    message.error("Error executing task.");
  }
};
