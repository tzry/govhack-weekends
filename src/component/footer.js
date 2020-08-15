import React from 'react';
import { Row, Col } from 'antd';
import './footer.css'

function Footer() {
  return (
      <Row className="footer-row">
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
      </Row>
  );
}

export default Footer;
