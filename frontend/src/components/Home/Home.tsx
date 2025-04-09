import React, { useEffect, useState, useContext } from 'react';
import { Alert, Card, Button, Layout, Carousel } from 'antd';
import { useIntl } from 'react-intl';
import './Home.css';
import FloatingInput from '../FloatingComps/FloatingInput';
import AuthContext, { AuthProvider, useAuth } from '../Auth/AuthContext';

const { Content } = Layout;

const Home: React.FC = () => {
  const intl = useIntl();
  const authContext = useContext(AuthContext); // Access authentication state from AuthContext
  const isAuthenticated = authContext?.isAuthenticated ?? false; // Handle undefined context
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const sliderImages = [
    {
      url: '/assets/images/wall.jpg',
      title: intl.formatMessage({ id: 'home.slider.title1', defaultMessage: 'Digital solutions for your business' }),
      description: intl.formatMessage({
        id: 'home.slider.description1',
        defaultMessage: 'Improve your business performance through online management.',
      }),
    },
    {
      url: '/assets/images/building2.jpg',
      title: intl.formatMessage({ id: 'home.slider.title2', defaultMessage: 'Dedicated teams for your needs' }),
      description: intl.formatMessage({
        id: 'home.slider.description2',
        defaultMessage: 'We create platforms tailored to your business model.',
      }),
    },
    {
      url: '/assets/images/penguin-9475470_1280.jpg',
      title: intl.formatMessage({ id: 'home.slider.title3', defaultMessage: 'Waste management and sustainability' }),
      description: intl.formatMessage({
        id: 'home.slider.description3',
        defaultMessage: 'We create tools for environmental management and sustainability for your company.',
      }),
    },
  ];

  const galleryImages = [
    {
      url: '/assets/images/keyboard2.jpg',
      text: intl.formatMessage({
        id: 'home.gallery.text1',
        defaultMessage: 'Access the form to start working together',
      }),
    },
    {
      url: '/assets/images/namibia-5087365_1280.jpg',
      text: intl.formatMessage({
        id: 'home.gallery.text2',
        defaultMessage: 'Learn about your requirements to be sustainable',
      }),
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      setShowAlert(true); // Show alert after login
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]); // Trigger effect when authentication state changes

  return (
    <Layout>
      <Content className="home-content">
        {/* Welcome Alert */}
        {showAlert && (
          <Alert
            message={intl.formatMessage(
              { id: 'home.welcomeMessage', defaultMessage: 'Welcome back, {username}! 🎉' },
              { username: localStorage.getItem('username') || intl.formatMessage({ id: 'home.defaultUser', defaultMessage: 'User' }) }
            )}
            type="success"
            showIcon
            className="welcome-alert"
          />
        )}

        {/* Full-width Slider */}
        <Carousel autoplay className="slider">
          {sliderImages.map((image, index) => (
            <div key={index}>
              <div
                className="slider-image"
                style={{
                  background: `url('${image.url}') center/cover no-repeat`,
                }}
              >
                <div className="slider-caption">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Divider */}
        <div className="divider" />

        {/* Gallery Section */}
        <div className="gallery">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item"
              style={{
                background: `url('${image.url}') center/cover no-repeat`,
              }}
            >
              <div className="gallery-item-content">
                <p>{image.text}</p>
                <Button type="primary">
                  {intl.formatMessage({ id: 'home.gallery.button', defaultMessage: 'Contact us' })}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" />
        <FloatingInput />
      </Content>
    </Layout>
  );
};

export default Home;