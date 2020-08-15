import React from 'react';
import logo from './logo.svg';
import { Button, Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './component/footer'
import Header from './component/header'
import Index from './pages/index'
import Merchant from './pages/merchant/merchant'
import MerchantDetail from './pages/merchant/merchantDetail'
const { Content } = Layout;

function App() {
  return (
      <Layout>
          <Router>
              <Header />
              <Content className="content-section">
                  <Switch>
                      <Route path='/' exact component={Index} />
                      <Route path='/merchant/:id' component={Merchant} />
                      <Route path='/merchant-detail/:id' component={MerchantDetail} />
                  </Switch>
              </Content>
              <Footer />
          </Router>
      </Layout>
  );
}

export default App;
