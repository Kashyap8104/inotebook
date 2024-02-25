import { useState } from "react";
import NoteContext from "./noteContext";
import { Await } from "react-router-dom";
// import { state} from "mongoose";
// import { useState } from "react";
const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  //get all notes
  const getNotes =  async () => {
    //Api call
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }

    });
    const json =await response.json()
    console.log(json)
    setNotes(json)
  }
  //Add note
  const addNote =  async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        
      },

        body: JSON.stringify({title,description,tag}),
    });
    const note = await response.json();
    setNotes(notes.concat(note))
    // console.log(json)
    
    // const note = json;
    
  }
  const deleteNote = async (id) => {
  //API call
  const response = await fetch(`${host}/api/notes/deletingnote/${id}`, {
      method: "DELETE", 

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }

    });
    const json =response.json()
    console.log(json)
    // setNotes(json) 

    console.log("hello delete" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    const newNotes = notes.map(note => {
      if (note._id === id) {
          return {...note , title , description , tag} ;
      }
      return note;
  });
    // edit logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(prev => newNotes);;
  }
  //delete note
  //edit note
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;