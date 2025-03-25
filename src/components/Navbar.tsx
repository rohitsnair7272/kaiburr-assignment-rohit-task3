import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="tasks">
        <Link to="/tasks">Tasks</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
