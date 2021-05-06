import './App.css';
import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { useState } from 'react';
import { authProvider } from './firebase_config';
import firebase from 'firebase';
import Todo from "./Todo/Todo";
import Auth from './Auth/Auth';

export const AuthContext = React.createContext()

function App() {


  const [isAuth, setAuth] = useState(false);
  const [error, setError] = useState("");


  const authRequest = () => {

    firebase.auth()
      .signInWithPopup(authProvider)
      .then((res) => {

        //console.log(res);
        // db.collection("users").doc(res.user.uid).collection("todos").add(
        //     {
        //     todo: "new todo", 
        //     inprogress: true, 
        //     timestamp:firebase.firestore.FieldValue.serverTimestamp()}
        // ) 
        setAuth(true);
      })
      .catch((error) => {
        setAuth(false);
        setError(error.message);
        //console.log(error.message);
      })
  }


  let content = <Auth authCall={authRequest} error={error} />

  if (isAuth)
    content = <Todo />


  return (
    <StyleRoot>
      <AuthContext.Provider value={{ isAuth }}>
        <div className="App">
          {content}
        </div>
      </AuthContext.Provider>
    </StyleRoot>
  );
}

export default Radium(App);
