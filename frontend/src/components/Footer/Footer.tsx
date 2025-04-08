import React from 'react';
import { Layout } from 'antd';
const { Footer: AntFooter } = Layout;
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <AntFooter className="footerlogin">
      <div className="container">
        <p>&copy; 2023 StellifyIt. All rights reserved.</p>
      </div>
    </AntFooter>
  );
};

export default Footer;
