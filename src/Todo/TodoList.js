import React from 'react';
import { ListItem, ListItemText, IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import {db} from '../firebase_config';
import DoneIcon from '@material-ui/icons/Done';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import firebase from 'firebase';


const TodoList = (props) => {
 
    const toggleinProgress = () => {
        const userId = firebase.auth().currentUser.uid;
        return (
            db.collection("users").doc(userId).collection("todos").doc(props.id).update({
                inprogress: !props.inprogress,
            })
        );
    }

    const deleteTodo = () => {
        const userId = firebase.auth().currentUser.uid;
        db.collection("users").doc(userId).collection("todos").doc(props.id).delete();
        
    }
    
    let statusIcon = (<IconButton aria-label="done"
                        style={{color:"rgb(163, 101, 219)"}}
                        onClick={toggleinProgress}>
                     <EventBusyIcon />
                 </IconButton>)
    
    if(props.inprogress)
    {
        statusIcon = (<IconButton 
                        aria-label="undone" 
                        style={{color:"rgb(163, 101, 219)"}}
                        onClick={toggleinProgress}>
                        <EventAvailableIcon />
                    </IconButton>)
    }

    let prog = (
        <p style={{color:"green",marginTop:"0rem",fontSize:"0.7rem"}}>
            In progress 
            <HourglassEmptyIcon  
            style={{fontSize:"0.8rem",padding:"0rem"}}/>
            </p>
    )

    let comp = (
        <p style={{marginTop:"0rem",color:"red",fontSize:"0.7rem"}}>
            Completed 
            <DoneIcon  
            style={{fontSize:"0.8rem",padding:"0rem"}}/>
            </p>
    )
    return (
        
        <div style={{display:"flex"}}>
            
        <ListItem>
            <ListItemText style={{fontSize:"2rem"}}
                primary={props.todo} 
                secondary={props.inprogress? prog : comp}
                />
        </ListItem>
        
        
            {statusIcon }
            &nbsp;
            &nbsp;
        <IconButton aria-label="delete" style={{color:"rgb(163, 101, 219)"}} onClick={deleteTodo}>
             <DeleteIcon />
        </IconButton> 
        
         
                
        </div>
        
    )
}
export default TodoList;