import React from 'react';
import { Row, Col } from 'antd';
import './header.css';

function Header() {
  return (
      <Row className="header-row">
          <Col span={24}>
              <p style={{textAlign:'center'}}>Weekend</p>
          </Col>
      </Row>
  );
}

export default Header;
