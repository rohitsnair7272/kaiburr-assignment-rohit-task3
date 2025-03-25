import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space } from "antd";
import {
  getAllTasks,
  createTask,
  deleteTask,
  executeTask,
} from "../services/taskService";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:8080/tasks"; // Adjust if needed

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default search type is "name"
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      fetchTasks();
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/search?name=${searchTerm}&type=${searchType}` // Search by selected type (name or id)
      );
      console.log(searchTerm + searchType);
      setTasks(response.data);
      if (response.data.length === 0) {
        toast.warn("No tasks found.");
      }
    } catch (error) {
      toast.error("Error searching tasks.");
    }
    setLoading(false);
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setModalVisible(true);
    form.resetFields();
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setModalVisible(true);
    form.setFieldsValue(task);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted Successfully!");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    try {
      if (editingTask) {
        await axios.put(`${API_BASE_URL}/${editingTask.id}`, values);
        toast.success("Task updated successfully!");
      } else {
        await createTask(values);
        toast.success("Task created successfully!");
      }
      setModalVisible(false);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to create/update task.");
    }
  };

  const handleExecute = async (id: string) => {
    try {
      await executeTask(id);
      toast.success("Task executed Successfully!");
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
        <Space>
          <Button type="primary" onClick={() => handleExecute(record.id)}>
            Execute
          </Button>
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => handleEditTask(record)}
          >
            Edit
          </Button>
          <Button
            danger
            style={{ marginLeft: 8 }}
            onClick={() => handleDeleteTask(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <h2>Task List</h2>

      {/* Create Task Button */}
      <Button
        type="primary"
        onClick={handleCreateTask}
        style={{ marginBottom: 16 }}
      >
        + Create Task
      </Button>

      {/* Search Section */}
      <Space style={{ marginBottom: 16 }}>
        <Select
          value={searchType}
          onChange={(value) => setSearchType(value)}
          style={{ width: 120 }}
        >
          <Select.Option value="name">Name</Select.Option>
          <Select.Option value="id">ID</Select.Option>
        </Select>

        <Input
          placeholder={`Search by ${searchType}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />

        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>

        <Button
          onClick={() => {
            setSearchTerm("");
            fetchTasks();
          }}
        >
          Clear
        </Button>
      </Space>

      {/* Task Table */}
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      {/* Modal for Create/Edit Task */}
      <Modal
        title={editingTask ? "Edit Task" : "Create Task"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="Task ID" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Task Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="owner" label="Owner" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="command"
            label="Command"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskList;
