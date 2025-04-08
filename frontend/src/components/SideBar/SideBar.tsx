import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

interface SideBarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ isCollapsed}) => {
  return (
    <Sider
    collapsed={isCollapsed}
    collapsedWidth={0} // Completely hide the sidebar when collapsed
    style={{
      transition: 'all 0.2s',
      backgroundColor: 'transparent' // Smooth transition when collapsing/expanding
    }}
    >
      <Menu mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/frontpage">Inicio</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/about">Sobre mi</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/contact">Contacto</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/user/:id">Perfil</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;