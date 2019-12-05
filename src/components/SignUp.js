import React from 'react';
import { Modal, Divider, Avatar, Typography, Tag, Form, Input, Icon, Button } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';

import database from '../Firebase';

import { loadJS } from '../utils';

class CreateSignUpForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [ {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }, {
              validator: this.validateToNextPassword,
            },],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: 'Please input your Password!' }, {
              validator: this.compareToFirstPassword,
            },],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Confirm Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign up
          </Button>
        </Form.Item>
        <Divider />
        Or login with <Button onClick={this.props.onGoogle}><Icon type="google" />&nbsp;Google</Button>
      </Form>
    );
  }
}

class CreateSignInForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [ {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }, {
              validator: this.validateToNextPassword,
            },],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Login
          </Button>
        </Form.Item>
        <Divider />
        Or login with <Button onClick={this.props.onGoogle}><Icon type="google" />&nbsp;Google</Button>
      </Form>
    );
  }
}




const SignUpForm = Form.create({ name: 'signup' })(CreateSignUpForm)
const SignInForm = Form.create({ name: 'login'})(CreateSignInForm);


export default function SignUp() {
  const locations = useLocation();
  const history = useHistory();

  const useGoogle = React.useCallback(async () => {
    await loadJS('https://apis.google.com/js/api.js', 'google-api');
    window.gapi.load('client:auth2', async () => {
      await window.gapi.client.init({
        clientId: '960547056177-mr82l4mm0oobfvmggunc6pdns056q953.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
      })
      const auth2 = window.gapi.auth2.getAuthInstance()
      await auth2.signIn()
      let next;
      do {
        const response = await window.gapi.client.drive.files.list({
          q: "mimeType = 'application/vnd.google-apps.folder'",
          'pageSize': 5,
          'fields': "nextPageToken, files(id, name)",
          pageToken: next,
        })
        next = response.result.nextPageToken;
        const fileDetails = await Promise.all(response.result.files.map(file => window.gapi.client.drive.files.get({ fileId: file.id, fields: "*" })))
        fileDetails.forEach(file => {
          const newLink = database.ref('links/').push();
          newLink.set({
            name: file.result.name,
            link: file.result.webViewLink
          })
        })
      } while (next !== null)
    });
  }, []);



  const search = locations.search.slice(1);
  const openModal = search.length > 0 ? search.split("&").reduce((a, q) => ({ ...a, [q.split("=")[0]]: q.split("=")[1] }), {})["signup"] === "true" ? true : false : false;
  const includingUser = locations.pathname.includes('user');

  return (
    <Modal visible={openModal} footer={null} onCancel={() => history.push('/')}>
      {
        includingUser ? (
          <>
            <Avatar style={{ verticalAlign: "middle" }}>
              DD
            </Avatar>
            <Tag>PRO</Tag>
            <Typography style={{marginTop: 50}}>Professional photographer</Typography>
            <div style={{display: "flex"}}>
            <Typography><strong>1.2k</strong>&nbsp;followers</Typography>
            <Typography style={{marginLeft: 70 }}>2 followings</Typography>
            </div>
            <Divider />
            <Typography>User is protected, Signup to see his content</Typography>
            <SignInForm onGoogle={useGoogle} />
          </>
        ) : (
            <>
              <Typography>Signup or login to continue</Typography>
              <SignUpForm onGoogle={useGoogle} />
            </>
          )
      }
    </Modal>
  )
}