import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAkYyDVsWhF7p58l2E-X0xL0JPSCHpu-KA",
  databaseURL: "https://my-library-1f63d.firebaseio.com/",
  projectId: "my-library-1f63d",
};

firebase.initializeApp(config);

const database = firebase.database();

export default database;