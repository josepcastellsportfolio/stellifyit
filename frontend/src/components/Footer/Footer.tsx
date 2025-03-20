import React from 'react';
import { Layout } from 'antd';
import '../../theme/theme.less';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="footer">
      <div className="container">
        <p>&copy; 2023 StellifyIt. All rights reserved.</p>
      </div>
    </AntFooter>
  );
};

export default Footer;
