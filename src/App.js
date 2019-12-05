import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout } from 'antd';

import { Menu, Icon } from 'antd';

import Home from './pages/Home';
import User from './pages/User';
import SignUp from './components/SignUp';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ToS from './pages/ToS';

const { Content, Footer } = Layout;


function App() {
  return (
    <Router>
      <Layout>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Link to="/">
              <Icon type="gitlab" />
            </Link>
          </Menu.Item>
          <Menu.Item key="explore">
            <Icon type="bulb" />
            Explore
      </Menu.Item>
          <Menu.Item>
            <Link to="/?signup=true">
              <Icon type="user" />
              Login/Signup
            </Link>
          </Menu.Item>
        </Menu>
        <Content>
          <Switch>
            <Route path="/privacy">
              <PrivacyPolicy />
            </Route>
            <Route path="/terms">
              <ToS />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>
        <SignUp />
        <Footer>
          <span>imstocks 2019</span>
          <span style={{ width: 50 }}></span>
          <Link to="/privacy">Privacy</Link>
          <span style={{ width: 50 }}></span>
          <Link to="/terms">Terms of service</Link>
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
