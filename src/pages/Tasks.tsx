import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space } from "antd";
import { fetchTasks, deleteTask, executeTask } from "../api/taskService";

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    const data = await fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    loadTasks(); // Refresh task list
  };

  const handleExecute = async (taskId: string) => {
    await executeTask(taskId);
    loadTasks(); // Refresh task history
  };

  const filteredTasks = tasks.filter(
    (task: any) =>
      task.name.toLowerCase().includes(searchText.toLowerCase()) ||
      task.owner.toLowerCase().includes(searchText.toLowerCase()) ||
      task.command.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
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
          <Button type="default" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16, width: "300px" }}
      />
      <Table
        columns={columns}
        dataSource={filteredTasks}
        loading={loading}
        rowKey="id"
      />
    </>
  );
};

export default Tasks;
