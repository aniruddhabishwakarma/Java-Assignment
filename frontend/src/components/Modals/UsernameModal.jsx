import React, { useState } from "react";
import './username.css';

const UsernameModal = ({visibility,hide,id,closeModal}) => {

    const[username,setusername] = useState("");
    const[error,setError] = useState("");
    const updateUsername = async () =>{
        try{
            console.log(id);
            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                "id": id,
                "username" : username
               })
          };
          const response = await fetch('http://localhost:8080/user/update/username', requestOptions);
          if(response.status === 200){
            alert("Update successful")
            setusername("");
            setError("")
            closeModal(username);
          }else if(response.status === 400){
            setError("Username already exists")
          }
          
        }catch(err){
            console.log(err);
        }
    }
    if(!visibility) return null;

return (
<>
    <div className="username-modal">
        <button className='username-btn'onClick={hide}>x</button>
        <h3 className='update-username mb-5'>Update Username</h3>
        <div class="form-floating mb-3 w-75">
            <input type="text" className="form-control"  placeholder="Event Name"
            value = {username}
            onChange={(e)=>setusername(e.target.value)}
                 />
            <label htmlFor="user-name">Username</label>
            <span className = "error">{error}</span>
        </div>
        <button className='btn btn-dark w-50 mt-3' onClick ={updateUsername}>Update</button>
    </div>
</>
)
}

export default UsernameModal;