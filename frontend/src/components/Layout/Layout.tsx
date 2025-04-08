import React, { useState } from 'react';
import { Layout as AntLayout, Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import AppHeader from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Layout.css';
import '../../theme/animations.css';

const { Content } = AntLayout;

interface LayoutProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  locale: string; // Use locale from props
  setLocale: React.Dispatch<React.SetStateAction<string>>; // Use setLocale from props
}

const Layout: React.FC<LayoutProps> = ({ isDarkMode, setIsDarkMode, locale, setLocale }) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const location = useLocation();

  // Generate breadcrumb items dynamically based on the current route
  const breadcrumbItems = [
    {
      title: <Link to="/">Inicio</Link>, // Updated to link to /frontpage
    },
    ...location.pathname
      .split('/')
      .filter((path) => path)
      .map((path, index, arr) => {
        const url = `/${arr.slice(0, index + 1).join('/')}`;
        return {
          title: <Link to={url}>{path.charAt(0).toUpperCase() + path.slice(1)}</Link>,
        };
      }),
  ];

  return (
    <AntLayout className="layout">
      {/* Header */}
      <AppHeader
        isDarkMode={isDarkMode}
        locale={locale} // Use locale from props
        setLocale={setLocale} // Use setLocale from props
        setIsDarkMode={setIsDarkMode} // Pass setIsDarkMode prop
        onMenuToggle={() => setIsMenuCollapsed(!isMenuCollapsed)}
      />

      {/* Sidebar and Content */}
      <AntLayout style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
        {/* Sidebar */}
        <SideBar
          isCollapsed={isMenuCollapsed}
          onCollapse={setIsMenuCollapsed}
        />

        {/* Content */}
        <AntLayout style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Breadcrumb */}
          <Breadcrumb
            className="breadcrumb"
            items={breadcrumbItems}
          />

          <Content className="layout-content">
            <Outlet /> {/* This renders the nested routes */}
          </Content>
        </AntLayout>
      </AntLayout>

      {/* Footer */}
      <Footer />
    </AntLayout>
  );
};

export default Layout;