import React, { useState, useEffect, useContext } from 'react';
import Radium, { StyleRoot } from 'radium';
import { Route } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Icon from '@material-ui/core/Icon';
import firebase from 'firebase';
import { db } from '../firebase_config';
import TodoList from "./TodoList";
import { AuthContext } from '../App';
import App from '../App';

function Todo(props) {
  const context = useContext(AuthContext);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLogout, setLogout] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    if (context.isAuth) {
      getTodos();
    }
  }, [context.isAuth]);

  const getTodos = () => {
    const userId = firebase.auth().currentUser.uid;
    //console.log(firebase.auth().currentUser.uid);
    db.collection("users").doc(userId).collection("todos").onSnapshot((querySnapshot) => {
      setTodos(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        inprogress: doc.data().inprogress,
      })))
      //console.log(querySnapshot);
    })
  }


  const addTodo = (event) => {
    event.preventDefault();
    const userId = firebase.auth().currentUser.uid;
    if (todoInput.trim() !== "") {
      //console.log(firebase.auth().currentUser.uid);
      db.collection("users").doc(userId).collection("todos").add({
        inprogress: true,
        todo: todoInput,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    // console.log(todoInput);
    setTodoInput("");
  }

  const logOut = () => {
    // console.log(firebase.auth().signOut());
    firebase.auth().signOut()
      .then(() => {
       // console.log(context.isAuth);
        context.isAuth = false

        // props.isAuthenticated= false;
        //console.log("islogin:" + `${context.isAuth}` + "signOut successfully")
        setLogout(true);
      }
      ).catch((err) => {
        //console.log(err.message);
        setLogoutError(err.message);
      }
      )
  }


  let content = (<>

    <div style={{ width: "100%", backgroundColor: "rgb(115, 62, 163)", height: "3.5rem" }}>
      <div
        style={{
          marginTop: "0.5rem",
          float: "right",
          marginRight: "7rem",
          color: "white",
          '@media (max-width: 500px)': {
            marginRight: "0.5rem"
          },
          '@media (max-width: 800px) and ( min-width:500px)': {
            marginRight: "3.5rem"
          }
        }}>
        <ExitToAppIcon
          fontSize="large"
          onClick={logOut}>Sign Out</ExitToAppIcon>
      </div>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}>
      <form onSubmit={addTodo} >
        <h1 style={{
          color: "rgb(115, 62, 163)", fontFamily: "Caveat",
          fontSize: "3rem", textAlign: "center"
        }}>TO-DO</h1>

        <span
          style={{
            fontFamily: "Caveat", maxWidth: "450px", width: "100vw", textAlign: "left",padding:"0.2rem"
          }}>
          <TextField
            label="To do..."
            value={todoInput}
            onChange={e => setTodoInput(e.target.value)}
            style={{  maxWidth: "450px", width: "80vw", textAlign: "center", padding: "0.2rem" }} />
        </span>

        <Icon type="submit"
          fontSize="large"
          style={{ color: "rgb(163, 101, 219)" }}
          onClick={addTodo}>add_circle
        </Icon>

      </form>
      <br />

      <div style={{ width: "90vw", maxWidth: "500px", marginTop: "12px" }}>
        <h2 style={{
          color: "rgb(86, 46, 122)",
          fontSize: "1.2rem"
        }}>Your to-do list...</h2>
        {

          todos.map((data) =>
            <TodoList todo={data.todo} inprogress={data.inprogress} id={data.id} />
          )
        }
      </div>
    </div>
  </>
  );

  if (isLogout && !context.isAuth) {
    content = <Route to='/' exact component={App} />
  }


  return (
    < StyleRoot>
      {content}
    </ StyleRoot>
  );
}
export default Radium(Todo);