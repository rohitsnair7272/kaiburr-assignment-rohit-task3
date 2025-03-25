import React, { useEffect, useState } from "react";
import { Table, Button, message, Input } from "antd";
import { getAllTasks, deleteTask, executeTask } from "../services/taskService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/tasks"; // Adjust if needed

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      message.error("Failed to load tasks");
    }
    setLoading(false);
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      fetchTasks();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/search?name=${value}`);
      setTasks(response.data);
      if (response.data.length === 0) {
        message.warning("No tasks found.");
      }
    } catch (error) {
      message.error("Error searching tasks.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted successfully!", { autoClose: 3000 });
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task.", { autoClose: 3000 });
    }
  };

  const handleExecute = async (id: string) => {
    try {
      await executeTask(id);
      toast.success("Task executed");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to execute task");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Owner", dataIndex: "owner", key: "owner" },
    { title: "Command", dataIndex: "command", key: "command" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button type="primary" onClick={() => handleExecute(record.id)}>
            Execute
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <h2>Task List</h2>

      {/* Search Bar */}
      <Input.Search
        placeholder="Search tasks..."
        enterButton
        allowClear
        onSearch={handleSearch}
        style={{ marginBottom: 16, width: "50%" }}
      />

      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
    </>
  );
};

export default TaskList;
