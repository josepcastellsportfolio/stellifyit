import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Alert, Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import authService from '../../services/api';
import '../../theme/theme.less';

const { Title } = Typography;

const Login: React.FC = () => {
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (values: { username: string; password: string; email?: string }) => {
    try {
      const { username, password, email } = values;
      console.log('Request Payload:', { username, email, password }); // Log the request payload
      if (isRegistering) {
        if (email) {
          await authService.register({ username, email, password });
        } else {
          throw new Error('Email is required for registration');
        }
        // Auto-login after registration
        await authService.login(username, password);
      } else {
        await authService.login(username, password);
      }
      navigate('/frontpage');
    } catch (err) {
      setError(isRegistering ? 'Registration failed' : 'Invalid credentials');
      console.error('Error:', err.message);
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <div style={{ maxWidth: '400px', height: '100%', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>{isRegistering ? 'Register' : 'Login'}</Title>
      {error && <Alert message={error} type="error" showIcon />}
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        {isRegistering && (
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
        )}
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </div>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {isRegistering ? 'Register' : 'Log in'}
          </Button>
          or <a onClick={toggleForm}>{isRegistering ? 'Back to Login' : 'Register now!'}</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;