import React from 'react';
import { Card, Typography, Layout } from 'antd';
import './UserProfile.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const UserProfile: React.FC = () => {
  const username = localStorage.getItem('username') || 'Guest';
  return (
    <Layout>
      <Content className="user-profile-content">
        <Card className="user-profile-card">
          <Title level={2}>User Profile</Title>
          <Paragraph><strong>Username:</strong> {username}</Paragraph>
        </Card>
      </Content>
    </Layout>
  );
};

export default UserProfile;