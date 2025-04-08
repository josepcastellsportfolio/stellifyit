import React, { useEffect, useState } from 'react';
import { Alert, Card, Button, Layout, Carousel } from 'antd';
import './Home.css';
import FloatingInput from '../FloatingComps/FloatingInput';

const { Content } = Layout;

const Home: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(true);

  const sliderImages = [
    {
      url: '/assets/images/building1.jpg',
      title: 'Soluciones digitales para tu negocio',
      description: 'Mejora el rendimiento de tu negocio a traves de la gestion online.',
    },
    {
      url: '/assets/images/building2.jpg',
      title: 'Equipos de trabajo dedicados a tus necesidades',
      description: 'Creamos plataformas dedicadas a tu modelo de negocio.',
    },
    {
      url: '/assets/images/penguin-9475470_1280.jpg',
      title: 'Gestion de residuos y sostenibilidad',
      description: 'Creamos herramientas para la gestion del medio ambiente y para la sostenibilidad de tu empresa.',
    },
  ];

  const galleryImages = [
    {
      url: '/assets/images/keyboard2.jpg',
      text: 'Accede al formulario para empezar a trabajar juntos',
    },
    {
      url: '/assets/images/namibia-5087365_1280.jpg',
      text: 'Informate de tus requisitos para ser sostenible',
    },
  ];

  const cardImages = [
    '/assets/images/hearts-9388196_1280.jpg',
    '/assets/images/penguin-9475470_1280.jpg',
    '/assets/images/walk-9479264_1280.jpg',
  ];

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);

    const timer = setTimeout(() => setShowAlert(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Content className="home-content">
        {/* Welcome Alert */}
        {showAlert && (
          <Alert
            message={`Welcome, ${username || 'User'}! 🎉`}
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
                <Button type="primary">Contactanos</Button>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Row of 3 Cards */}
        <div className="card-row">
          {cardImages.map((image, index) => (
            <Card
              key={index}
              title={`Card ${index + 1}`}
              className="card"
              cover={<img alt={`Card ${index + 1}`} src={image} />}
              style={{
                border: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p>Card content goes here.</p>
            </Card>
          ))}
        </div>
        <FloatingInput />
      </Content>
    </Layout>
  );
};

export default Home;