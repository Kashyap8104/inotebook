import React, { useState ,useContext } from 'react'
import noteContext from '../context/notes/noteContext';
const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addNote } = context;

    const [note, setNote] = useState({title:"", description:" ",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added successfully","success")
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
            <div className="container my-3">
                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="form-group mb-3">
                        <label htmlFor="title"> Title</label>
                        <input type="text" className="form-control" id="title" name="title"   onChange={onChange} minLength={5} required value={note.title}/>
                        
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="desc">Description</label>
                        <input type="text" className="form-control" id="description" name="description"  onChange={onChange} minLength={5} required value={note.description} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" value={note.tag} id="tag" name="tag"  onChange={onChange} minLength={5} required />
                    </div>
                    
                    <button disabled={note.title.length<5 || note.description.length<5}  type="submit" className="btn btn-primary" onClick={handleClick}>Add Note </button>
                </form>
            </div>
        </div>
  )
}

export default Addnote
