import React from 'react';
import { Typography, Card, Row, Col, Tabs, Descriptions, Collapse } from 'antd';
import './AboutMe.css'; // Import custom styles for the page
import '../../theme/animations.css'; // Import the animations

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

interface AboutMeProps {
  isDarkMode: boolean; // Pass the theme mode as a prop
}

const AboutMe: React.FC<AboutMeProps> = ({ isDarkMode }) => {
  return (
    <div className={`about-me-container ${isDarkMode ? 'light-theme' : 'dark-theme'}`}>
      <Title level={2} className="about-me-title">
        Josep Castells de la Ascension
      </Title>

      <Tabs defaultActiveKey="1" centered>
        {/* Personal Information Tab */}
        <Tabs.TabPane tab="Personal Info" key="1">
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Location">Deltebre, Tarragona, España</Descriptions.Item>
            <Descriptions.Item label="Phone">+34 667376090</Descriptions.Item>
            <Descriptions.Item label="Email">josepcastellsbusiness@gmail.com</Descriptions.Item>
            <Descriptions.Item label="LinkedIn">
              <a
                href="https://www.linkedin.com/in/josepcastells"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.linkedin.com/in/josepcastells
              </a>
            </Descriptions.Item>
          </Descriptions>
        </Tabs.TabPane>

        {/* Education Tab */}
        <Tabs.TabPane tab="Education" key="2">
          <Card bordered={false} className="about-me-card">
            <Paragraph>
              <Text strong>IES Montsià</Text> (Amposta, Catalunya, España)
            </Paragraph>
            <Paragraph>
              Ciclo formativo de grado superior en desarrollo de aplicaciones web.
            </Paragraph>
            <Paragraph>
              <Text strong>Periodo:</Text> Septiembre 2019 - Junio 2021
            </Paragraph>
            <Paragraph>
              <Text strong>GPA:</Text> 7
            </Paragraph>
          </Card>
        </Tabs.TabPane>

        {/* Skills Tab */}
        <Tabs.TabPane tab="Skills" key="3">
          <Card bordered={false} className="about-me-card">
            <ul>
              <li>React.js: Gestión avanzada de estado con Redux, desarrollo de hooks personalizados.</li>
              <li>Javascript: Programación asíncrona avanzada, optimización de fugas de memoria.</li>
              <li>Habilidades técnicas: Comprensión profunda de HTTP, CORS y gateways de API.</li>
              <li>Liderazgo: Proficiencia en metodologías Agile, Scrum o Kanban.</li>
              <li>IA y Machine Learning: Aplicación de técnicas para optimizar procesos de desarrollo.</li>
            </ul>
          </Card>
        </Tabs.TabPane>

        {/* Work Experience Tab */}
        <Tabs.TabPane tab="Work Experience" key="4">
          <Collapse accordion>
            <Panel header="Full Stack Developer - Disi (Tortosa, Catalunya, España)" key="1">
              <Paragraph>
                <Text strong>Periodo:</Text> Septiembre 2020 – Junio 2021
              </Paragraph>
              <ul>
                <li>He desarrollado aplicaciones MVC con C#.</li>
                <li>He implementado scripts y creado interfaces basadas en componentes con Angular.js.</li>
                <li>He elaborado addons para Elementor, Wordpress, con PHP.</li>
              </ul>
            </Panel>
            <Panel header="Full Stack Developer - GOXO (Madrid)" key="2">
              <Paragraph>
                <Text strong>Periodo:</Text> Febrero 2022 – Junio 2022
              </Paragraph>
              <ul>
                <li>Desarrollar hooks y styled componentes para interfaces dinámicas con React en formato JSX.</li>
                <li>Crear peticiones en Postman para bases de datos no relacionales.</li>
                <li>Elaborar scripts, gestión de componentes, routing y props en Next.js.</li>
              </ul>
            </Panel>
            <Panel header="Frontend Developer - Canana Studio (Torredembarra, Tarragona, España)" key="3">
              <ul>
                <li>Crear a partir de diseños interfaces con HTML.</li>
                <li>Desarrollar clases complejas con CSS.</li>
                <li>Implementar animaciones, navegación e interacciones con Javascript.</li>
              </ul>
            </Panel>
            <Panel header="Frontend Developer - ecityclic (Lleida, Catalunya, España)" key="4">
              <Paragraph>
                <Text strong>Periodo:</Text> Noviembre 2022 – Enero 2023 / Abril 2023 – Noviembre 2024
              </Paragraph>
              <ul>
                <li>Creado páginas web basadas en el CMS Plone 6.0, basado en React y Python.</li>
                <li>Personalización de vistas, componentes, scripts basados en React y Javascript.</li>
                <li>Crear estilos con Sass, Flexbox, media queries.</li>
                <li>Uso avanzado de Git.</li>
                <li>Gestión de la información con el state de React, props, eventos.</li>
                <li>Uso de hooks y comunicación de datos entre elementos de la interfaz dinámica.</li>
                <li>Gestioné el estado de aplicaciones mediante Redux, implementando acciones, reducers y un flujo de datos centralizado.</li>
              </ul>
            </Panel>
          </Collapse>
        </Tabs.TabPane>

        {/* Personal Projects Tab */}
        <Tabs.TabPane tab="Personal Projects" key="5">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Proiectus" bordered={false} className="about-me-card">
                <Paragraph>
                  Proyecto grupal desarrollado durante mi curso de formación en 2019, hecho con Laravel, implementación de Vue.js, desde cero Laravel, PHP, Javascript, HTML, CSS, Vue.js.
                </Paragraph>
                <a href="https://proiectus.es/" target="_blank" rel="noopener noreferrer">
                  Visit Proiectus
                </a>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="StellifyIt" bordered={false} className="about-me-card">
                <Paragraph>
                  StellifyIt es un proyecto personal que sirve como una plataforma web para autopromoción, visualización de información útil y planificación de tareas. Desarrollado con tecnologías modernas para mostrar habilidades y gestionar tareas de manera eficiente.
                </Paragraph>
                <a href="https://stellifyit.com/" target="_blank" rel="noopener noreferrer">
                  Visit StellifyIt
                </a>
              </Card>
            </Col>
          </Row>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AboutMe;