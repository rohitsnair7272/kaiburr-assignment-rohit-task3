import axios from "axios";
import { message } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:8080/tasks"; // Your Spring Boot API

// ✅ Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    message.error("Error fetching tasks.");
    toast.error("❌ Error fetching tasks!");
    return [];
  }
};

// ✅ Create a new task
export const createTask = async (taskData: {
  name: string;
  owner: string;
  command: string;
}) => {
  try {
    const response = await axios.post(API_BASE_URL, taskData);
    message.success("Task created successfully!");
    toast.success("✅ Task created successfully!");
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      message.error("Task creation failed: Unsafe command detected!");
      toast.error("❌ Unsafe command detected!");
    } else {
      message.error("Task creation failed. Please try again.");
      toast.error("❌ Task creation failed. Please try again.");
    }
    return null;
  }
};

// ✅ Delete a task
export const deleteTask = async (taskId: string) => {
  try {
    await axios.delete(`${API_BASE_URL}/${taskId}`);
    message.success("Task deleted successfully.");
    toast.success("✅ Task deleted successfully!");
  } catch (error) {
    const errorMsg = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Failed to delete task.";
    message.error(errorMsg);
    toast.error(`❌ ${errorMsg}`);
  }
};

// ✅ Execute a task
export const executeTask = async (taskId: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${taskId}/execute`);

    if (response.status === 200) {
      toast.success(`✅ Execution Successful! Output: ${response.data.output}`);
    } else {
      toast.error("❌ Execution failed. Please try again.");
    }
  } catch (error) {
    console.error("Error executing task:", error);
    toast.error("⚠️ Error executing task. Check console for details.");
  }
};

// ✅ Fetch task execution history
export const fetchTaskHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data.map((execution: any, index: number) => ({
      key: `${execution.taskId}-${index}`,
      taskId: execution.id,
      name: execution.name,
      startTime: execution.startTime,
      endTime: execution.endTime,
      output: execution.output || "No output available.",
    }));
  } catch (error) {
    message.error("Failed to load task history.");
    toast.error("❌ Failed to load task history.");
    return [];
  }
};
