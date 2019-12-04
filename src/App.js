import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Layout } from 'antd';

import { Menu, Icon } from 'antd';

import Home from './pages/Home';
import SignUp from './components/SignUp';

const { Content } = Layout;


function App() {
  return (
    <Router>
      <Layout>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Icon type="gitlab" />
          </Menu.Item>
          <Menu.Item key="explore">
            <Icon type="bulb" />
            Explore
      </Menu.Item>
          <Menu.Item>
            <Icon type="user" />
            Login/Signup
      </Menu.Item>
        </Menu>
        <Content>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>]
        <SignUp />
      </Layout>
    </Router>
  );
}

export default App;
