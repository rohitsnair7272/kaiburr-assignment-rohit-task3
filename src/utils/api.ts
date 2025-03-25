import axios from "axios";
import { message } from "antd";

const API_BASE_URL = "http://localhost:8080/tasks";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    message.error("Error fetching tasks. Please try again later.");
    return [];
  }
};

export const executeTask = async (taskId: string) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${taskId}/execute`);
    message.success("Task executed successfully.");
    return response.data;
  } catch (error) {
    message.error("Task execution failed.");
    return null;
  }
};
