import React from 'react';
import { Modal, Divider, Avatar, Typography, Tag } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';

import { loadJS } from '../utils';

export default function SignUp() {
  const locations = useLocation();
  const history = useHistory();

  const useGoogle = React.useCallback(() => {
    loadJS('https://apis.google.com/js/api.js', 'google-api')
      .then(() => {
        window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
          clientId: '960547056177-mr82l4mm0oobfvmggunc6pdns056q953.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/drive',
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
        })
        .then(() => {
          const auth2 = window.gapi.auth2.getAuthInstance()
          auth2.signIn().then(function () {

            window.gapi.client.drive.files.list({
              q: "mimeType = 'application/vnd.google-apps.folder'",
              'pageSize': 20,
              'fields': "nextPageToken, files(id, name)"
            }).then(function (response) {
              var files = response.result.files;
              console.log(files)
            });
          });

        });
      })})
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
            <Typography>Active photographer</Typography>
            <Divider />
            <Typography>User is protected, Signup to see his content</Typography>
            <button onClick={useGoogle}>Google</button>
          </>
        ) : "Signup"
      }
    </Modal>
  )
}