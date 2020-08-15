import React, {useEffect, useState} from 'react';
import { Row, Col } from 'antd';
import {LeftOutlined} from '@ant-design/icons'
import {withRouter} from 'react-router-dom'
import weekendsLogo from '../assert/weekends-logo.jpeg'
import './header.css';

function Header(props) {

    const [showBack, setShowBack] = useState(false);

    useEffect(()=>{
        if(props.location.pathname=='/'){
            setShowBack(false);
        }
        else{
            setShowBack(true);
        }
    },[props.location.pathname])

  return (
      <Row className="header-row">
          <Col span={2} className="back-nav">
              {showBack?<LeftOutlined onClick={
                  ()=>{
                      props.history.go(-1);
                  }
              }/>:null}
          </Col>
          <Col span={20} style={{textAlign:"center"}}>
             <img className="header-logo" src={weekendsLogo} />
          </Col>
          <Col span={2}>
          </Col>
      </Row>
  );
}

export default withRouter(Header);
