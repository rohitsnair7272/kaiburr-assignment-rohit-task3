import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { createTask } from "../api/taskService";

const TaskForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await createTask(values);
      message.success("Task created");
    } catch (error) {
      message.error("Failed to create task");
    }
    setLoading(false);
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Owner" name="owner" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Command" name="command" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Create Task
      </Button>
    </Form>
  );
};

export default TaskForm;
