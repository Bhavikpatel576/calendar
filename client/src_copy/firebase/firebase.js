import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyB1WxkLDq1-2uL_mByuG0F4rGMtO9tdOOQ",
  authDomain: "spotify-calendar-45c43.firebaseapp.com",
  databaseURL: "https://spotify-calendar-45c43.firebaseio.com",
  projectId: "spotify-calendar-45c43",
  storageBucket: "spotify-calendar-45c43.appspot.com",
  messagingSenderId: "955372591531"
};
firebase.initializeApp(config);

export default firebase;
