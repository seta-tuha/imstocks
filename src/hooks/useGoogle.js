import React from 'react';
import { loadJS } from '../utils';

const useGoogle = React.useCallback(() => {
  loadJS('https://apis.google.com/js/api.js', 'google-api')
    .then(() => {
      window.gapi.load('auth2', function () {
        const auth2 = window.gapi.auth2.init({
          client_id: '960547056177-mr82l4mm0oobfvmggunc6pdns056q953.apps.googleusercontent.com',
          fetch_basic_profile: false,
          scope: 'profile'
        });

        // Sign the user in, and then retrieve their ID.
        auth2.signIn().then(function () {
          console.log(auth2.currentUser.get().getId());
        });
      });

      // window.gapi.client.init({
      //   clientId: "960547056177-mr82l4mm0oobfvmggunc6pdns056q953.apps.googleusercontent.com",
      //   scope: 'profile'
      // })
      // .then(() => {
      //   window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      // })
    })

}, []);

export default useGoogle;
