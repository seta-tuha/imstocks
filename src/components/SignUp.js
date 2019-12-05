import React from 'react';
import { Modal, Divider, Avatar, Typography, Tag } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';

import database from '../Firebase';

import { loadJS } from '../utils';

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
      // .then(function (response) {
      //   var files = response.result.files;
      //   console.log(files)
      //   return files
      // }).then(files => {
      //   Promise.all(files.map(file => window.gapi.client.drive.files.get({ fileId: file.id, fields: "*" })))
      //     .then(responses => responses.map(r => console.log(r.result.webViewLink)))
      // window.gapi.client.drive.files.get({ fileId: files[0].id, fields: "*" })
      //   .then(response => {
      //     const newLink = database.ref('links/').push();
      //     newLink.set({
      //       name: response.result.name,
      //       link: response.result.webViewLink
      //     })
      //     console.log(response.result.webViewLink)
      //   })
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