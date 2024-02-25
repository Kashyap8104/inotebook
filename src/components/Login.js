import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    let navigate  = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""});
    const handleSubmit = async (e)=>{
        e.preventDefault();
              
              const response = await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },

                body: JSON.stringify({email:credentials.email,password:credentials. password})
          
                  
              });
              const json = await response.json();
              console.log(json)
              if(json.success){
                localStorage.setItem('token',json.authtoken);
                navigate('/home'); 
                
               props.showAlert("logged in Successfully","success");
            }
              else{
                props.showAlert("Invalid Details ","Danger");
              }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <>
        <div className='h1 mx-2 my-2'>Login</div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mx-2 my-2">
                    <label for="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={credentials.email}  onChange={onChange}aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mx-2 my-2">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" placeholder="Password" />
                </div>
                
                <button type="submit" className="btn btn-primary mx-2 my-2" >Submit</button>
            </form>
        </>
    )
}

export default Login
