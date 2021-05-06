import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyALLkmzn1_bU0gzriSa6Q9mwBowTdwd9nM",
    authDomain: "do--to-do.firebaseapp.com",
    projectId: "do--to-do",
    storageBucket: "do--to-do.appspot.com",
    messagingSenderId: "860626530001",
    appId: "1:860626530001:web:b3cf0d15a7af3af0ee1ff0"
};

  firebase.initializeApp(firebaseConfig);
  const db =firebase.firestore();
  var authProvider = new firebase.auth.GoogleAuthProvider();
  
export {db, authProvider};