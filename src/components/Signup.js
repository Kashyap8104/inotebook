import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {
    let navigate  = useNavigate();
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const handleSubmit = async (e)=>{
        e.preventDefault();
              
       const {name,email,password} = credentials;
              const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },

                body: JSON.stringify({name,email,password})
          
                  
              });
              const json = await response.json();
              console.log(json)
              if(json.success){
                localStorage.setItem('token',json.authtoken);
                navigate('/home'); 
                props.showAlert("Account Created Successfully","success");
            }
              else{
                props.showAlert("Invalid credentiols","Danger");
                // alert("Invalid credentiols");
              }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mx-2 my-2 h1'>Enter Details For Crate  Account</div>
                <div className="form-group mx-2 my-2">
                    <label htmlFor="name">Name </label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter Name" />
                    
                </div>
                <div className="form-group mx-2 my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email"aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mx-2 my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"  onChange={onChange} name="password"  id="password" placeholder="Password" minLength={5} required />
                </div>
                <div className="form-group mx-2 my-2">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name="cpassword" id="cpassword" placeholder="Confirm Password" minLength={5} required />
                </div>
                
                <button type="submit" className="btn btn-primary mx-2 my-2">Submit</button>
            </form>
        </>
    )
}

export default Signup
