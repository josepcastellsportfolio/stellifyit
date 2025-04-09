import React, { useState, useEffect } from 'react';
import { Input, Button, Dropdown, Menu, Tag, Spin, Layout, Avatar } from 'antd';
import { SendOutlined, DownOutlined, UserOutlined, RobotOutlined, LineOutlined, UpOutlined } from '@ant-design/icons';
import { openRouterService } from '../../services/api';
import './FloatingInput.css';
import { CheckOutlined } from '@ant-design/icons';
import { useIntl } from 'react-intl'; // Importa useIntl

const FloatingInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const intl = useIntl(); // Inicializa useIntl

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  useEffect(() => {
    const storedModels = localStorage.getItem('models');
    if (storedModels) {
      const parsedModels = JSON.parse(storedModels);
      setModels(parsedModels.map((model: any) => model.id)); // Extract model IDs
      setSelectedModel(parsedModels[0]?.id || null); // Default to the first model
    } else {
      const fetchModels = async () => {
        console.log('Fetching models...'); // Debugging log
        setModelsLoading(true);
        try {
          const modelsData = await openRouterService.getModels();
          console.log('Models:', modelsData); // Debugging log
          setModels(modelsData.map((model: any) => model.id)); // Extract model IDs
          setSelectedModel(modelsData[0]?.id || null); // Default to the first model
          localStorage.setItem('models', JSON.stringify(modelsData)); // Save models to local storage
        } catch (error) {
          console.error('Error fetching models:', error); // Log the error
          setModels([]); // Reset models to an empty array in case of an error
          setSelectedModel(null); // Reset the selected model
        } finally {
          setModelsLoading(false);
        }
      };
      fetchModels();
    }
  }, []);

  useEffect(() => {
    const storedModel = localStorage.getItem('selectedModel');
    if (storedModel) {
      setSelectedModel(storedModel); // Set the selected model from local storage
    }
  }, []);

  useEffect(() => {
    if (inputValue.trim()) {
      setIsMinimized(false); // Open the chat container if input is active
    }
  }, [inputValue]);

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [response]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && inputValue.trim() && !loading) {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputValue, loading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem('selectedModel', model); // Save the selected model to local storage
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() || !selectedModel) return;
    setLoading(true);
    try {
      const result = await openRouterService.callOpenRouter(inputValue, selectedModel);
      const newResponse = typeof result === 'object' && result.content ? result.content : result;
      setResponse((prev) => [
        ...prev,
        { role: 'user', content: inputValue },
        { role: 'assistant', content: newResponse },
      ]);
      setInputValue(''); // Clear the input field
    } catch (error) {
      console.error('Error calling OpenRouter:', error);
      setResponse((prev) => [
        ...prev,
        { role: 'user', content: inputValue },
        { role: 'assistant', content: 'An error occurred while processing your request.' },
      ]);
      setInputValue(''); // Clear the input field
    } finally {
      setLoading(false);
    }
  };

  const modelsMenu = (
    <Menu>
      {models.map((model) => {
        const isFree = model.includes('free');
        const formattedModel = model
          .replace(/^[^/]+\//, '') // Remove string before the first '/'
          .replace(/:.*$/, '') // Remove string after ':'
          .trim();
        return (
          <Menu.Item key={model} onClick={() => handleModelSelect(model)} disabled={!isFree}>
            {formattedModel}
            {isFree && <CheckOutlined style={{ marginLeft: '8px', color: 'green' }} />}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  // Format the selected model to display the formatted version
  const formattedSelectedModel = selectedModel
    ? selectedModel
        .replace(/^[^/]+\//, '') // Remove string before the first '/'
        .replace(/:.*$/, '') // Remove string after ':'
        .trim()
    : null;

  const avatarSize = isMinimized ? 14 : 28; // Adjust avatar size for mobile mode

    return (
      <Layout
        className={`floating-input-container ${isMinimized ? 'minimized' : 'maximized'}`}
      >
        {isMinimized ? (
          <Button
            className="chat-avatar-button"
            shape="circle"
            size="large"
            icon={<RobotOutlined />}
            onClick={toggleMinimize}
          />
        ) : (
          <>
            <Button onClick={toggleMinimize} className="minimize-button">
              <LineOutlined />
            </Button>
            <div className="chat-container">
              {response &&
                response.map((message, index) => (
                  <div
                    key={index}
                    className={`chat-message-container ${message.role === 'user' ? 'user' : 'assistant'}`}
                  >
                    {message.role === 'user' ? (
                      <>
                        <Avatar className="chat-avatar" size={avatarSize} icon={<UserOutlined />} />
                        <p className="chat-message user-message">{message.content}</p>
                      </>
                    ) : (
                      <>
                        <p className="chat-message assistant-message">{message.content}</p>
                        <Avatar className="chat-avatar" size={avatarSize} icon={<RobotOutlined />} />
                      </>
                    )}
                  </div>
                ))}
            </div>
            {formattedSelectedModel && (
              <Tag color="blue" className="selected-model-tag">
                {formattedSelectedModel}
              </Tag>
            )}
            <div className="input-with-button">
              <Input
                placeholder={intl.formatMessage({
                  id: 'floatingInput.placeholder',
                  defaultMessage: 'Ask Stella any question',
                })}
                value={inputValue}
                onChange={handleInputChange}
                className="floating-input"
                suffix={
                  inputValue.trim() ? (
                    <Button
                      type="primary"
                      icon={<SendOutlined />}
                      onClick={handleSubmit}
                      className="floating-input-button"
                    />
                  ) : modelsLoading ? (
                    <Spin />
                  ) : (
                    <Dropdown overlay={modelsMenu} trigger={['click']}>
                      <Button icon={<DownOutlined />} className="floating-input-button" />
                    </Dropdown>
                  )
                }
              />
            </div>
          </>
        )}
      </Layout>
    );
};

export default FloatingInput;