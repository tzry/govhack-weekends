import React from 'react';
import logo from './logo.svg';
import { Button, Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './component/footer'
import Header from './component/header'
import Index from './pages/index'
import Merchant from './pages/merchant/merchant'
const { Content } = Layout;

function App() {
  return (
      <Layout>
        <Header />
        <Content className="content-section">
          <Router>
            <Switch>
              <Route path='/' exact component={Index} />
              <Route path='/merchant/:id' component={Merchant} />
            </Switch>
          </Router>
        </Content>
        <Footer />
      </Layout>
  );
}

export default App;
