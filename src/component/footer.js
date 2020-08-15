import React from 'react';
import { Row, Col } from 'antd';
import { UserOutlined, VideoCameraOutlined, CalendarOutlined, HomeOutlined } from '@ant-design/icons';
import './footer.css'
import {Link} from 'react-router-dom'

function Footer() {
  return (
      <Row className="footer-row">
          <Col span={6}>
              <Link to='/'>
                  <HomeOutlined />
              </Link>
          </Col>
          <Col span={6}>
              <CalendarOutlined />
          </Col>
          <Col span={6}>
              <VideoCameraOutlined />
          </Col>
          <Col span={6}>
              <UserOutlined />
          </Col>
      </Row>
  );
}

export default Footer;
