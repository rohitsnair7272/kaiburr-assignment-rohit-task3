import React from "react";
import { Card, Typography, Button } from "antd";
import { CheckCircleOutlined, RocketOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "82vh",
        overflow: "hidden",
        background: "linear-gradient(135deg, #74ebd5, #acb6e5)", // Gradient background
        margin: "0",
        padding: "0",
      }}
    >
      <Card
        style={{
          maxWidth: 600,
          textAlign: "center",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.9)", // Subtle shadow
        }}
      >
        <Title level={2} style={{ color: "#1890ff" }}>
          <CheckCircleOutlined /> Kaiburr Task Manager
        </Title>
        <Paragraph style={{ fontSize: "16px", color: "#555" }}>
          Manage and execute your tasks efficiently with my simple UI.
        </Paragraph>

        {/* Action Buttons */}
        <Button
          type="primary"
          size="large"
          icon={<RocketOutlined />}
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/tasks")}
        >
          View Tasks
        </Button>

        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/history")}
        >
          View Task Excution History
        </Button>
      </Card>
    </div>
  );
};

export default Home;
