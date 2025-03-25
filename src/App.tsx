import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import TaskHistory from "./pages/TaskHistory";
import { ToastContainer } from "react-toastify";

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Layout>
          <Header>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="home">
                <a href="/">Home</a>
              </Menu.Item>
              <Menu.Item key="tasks">
                <a href="/tasks">Task List</a>
              </Menu.Item>
              <Menu.Item key="history">
                <a href="/history">Task History</a>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/history" element={<TaskHistory />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        draggable
      />
      ;
    </div>
  );
};

export default App;
