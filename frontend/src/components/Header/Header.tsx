import React from 'react';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { MoonOutlined, SunOutlined, MenuOutlined, GlobalOutlined } from '@ant-design/icons';
import './Header.css';
import { useIntl } from 'react-intl';

const { Header } = Layout;

interface AppHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  onMenuToggle: () => void; // Function to toggle the lateral menu
  locale: string;
  setLocale: (locale: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ isDarkMode, setIsDarkMode, onMenuToggle, locale, setLocale }) => {
  const intl = useIntl();

  // Mapping of locales to display text
  const localeDisplayText: Record<string, string> = {
    es: 'ES - ES',
    en: 'Global - EN',
  };

  const languageMenu = (
    <Menu
      onClick={({ key }) => setLocale(key)} // Set the selected language
      selectedKeys={[locale]} // Highlight the current language
    >
      <Menu.Item key="es">{localeDisplayText['es']}</Menu.Item>
      <Menu.Item key="en">{localeDisplayText['en']}</Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        backgroundColor: 'transparent',
        paddingInline: 0,
      }}
    >
      <div className="menu-container">
        {/* Left Section */}
        <Menu mode="horizontal" className="menu-left" defaultSelectedKeys={['1']}>
          <Menu.Item key="0">
            <Button type="text" icon={<MenuOutlined />} onClick={onMenuToggle} />
          </Menu.Item>
          <Menu.Item key="1">
            <Link to={`/frontpage`}>{intl.formatMessage({ id: 'header.home' })}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/about`}>{intl.formatMessage({ id: 'header.about' })}</Link>
          </Menu.Item>
          <Menu.Item key="3">{intl.formatMessage({ id: 'header.whatWeDo' })}</Menu.Item>
          <Menu.Item key="4">{intl.formatMessage({ id: 'header.contact' })}</Menu.Item>
        </Menu>

        {/* Right Section */}
        <Menu mode="horizontal" className="menu-right">
          <Menu.Item key="5">
            <Link to={`/user/:id`}>{intl.formatMessage({ id: 'header.profile' })}</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Button type="text" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <MoonOutlined /> : <SunOutlined />}
            </Button>
          </Menu.Item>
          <Menu.Item key="7">
            <Dropdown overlay={languageMenu} trigger={['click']}>
              <Button type="text" icon={<GlobalOutlined />}>
                {localeDisplayText[locale]} {/* Use the locale variable */}
              </Button>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;