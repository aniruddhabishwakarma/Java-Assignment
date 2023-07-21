import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


import './userlogin.css'
import UserRegister from "./UserRegister";

const UserLogin = () =>{
    const navigate = useNavigate();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState({
        userNameError: "",
        passwordError : ""
    })
    const [modal,setModal] = useState(false);
    const showModal = () => {
        setModal(!modal);
    }
    
    const validate = () =>{
        if(userName == "" && password == ""){
            setError({userNameError:"*Username cannot be empty",
            passwordError:"*Password cannot be empty"});
            e.preventDefault();
        } 
        else if(userName == ""){
            setError({...error,userNameError:"*Username cannot be empty"})
            e.preventDefault()
        } else if(password == ""){
            setError({...error,passwordError:"*Password cannot be empty"})
            e.preventDefault()
        }else if(password.length <= 8) {
            setError({...error,passwordError:"Password must be at least 8 characters"})
            e.preventDefault();
        }

    }
   
    const submit = async (e) =>{
       validate();
       try{
        const userData = {
            "username": userName,
            "password": password 
          };
          const url = "http://localhost:8080/user/login";
          await axios.post(url, userData)
          .then((response) => {
            console.log(response.status)
            if(response.status === 200){
                
                navigate("/dashboard",{state: {id: response.data.id}})
            }
          });
       }catch(err){
        console.log(err);
       }
        
    }
return <>
    <UserRegister
        visibility={modal}
        hide={()=> setModal(false)}
    />
    <section className="login-page bg-dark" >
    <div className="admin bg-light" >
        <h2 className="mb-5 ">Login Here</h2>
        <div class="mb-3 w-100">
            <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter your username" 
            value={userName}
            onChange={(e)=> setUserName(e.target.value)}
            />
            <small className="error">{error.userNameError}</small>
        </div>
        <div class="mb-3 w-100">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)} />
            <small className="error">{error.passwordError}</small>
        </div>
        <button className="register" onClick={showModal}>Click here to register</button>
        <button type="button" className="btn btn-dark mt-3 w-100 "
        onClick={submit}>Login</button>
    </div>
    </section>
   
    
</>
}
export default UserLogin;