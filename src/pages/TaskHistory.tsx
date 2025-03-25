import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { fetchTaskHistory } from "../api/taskService";

const TaskHistory: React.FC = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    const data = await fetchTaskHistory();
    console.log("Fetched Task History:", data); // ✅ Check if data is being fetched
    setHistory(data || []);
    setLoading(false);
  };

  const columns = [
    { title: "Task ID", dataIndex: "taskId", key: "taskId" },
    { title: "Task Name", dataIndex: "name", key: "name" },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    { title: "Output", dataIndex: "output", key: "output" },
  ];

  return (
    <Table columns={columns} dataSource={history} loading={loading} bordered />
  );
};

export default TaskHistory;
