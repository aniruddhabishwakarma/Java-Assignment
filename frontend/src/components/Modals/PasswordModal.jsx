import React, { useState } from "react";
import './passwordmodal.css';

const PasswordModal = ({visibility,hide,id,closeModal}) => {

    const[currentPassword,setCurrentPassword]= useState("");
    const[newPassword,setNewPassword] = useState("");
    const[confirmPassword,setConfirmPassword] = useState("");

    const[error,setError]=useState({
        currentPasswordError:"",
        newPasswordError:"",
        confirmPasswordError:""
    });
       
    const removeErrors = () =>{
        setError({currentPasswordError:"",
                    newPasswordError:"",
                confirmPasswordError:""});
        }
    const updatePassword = async (e) =>{
        if(newPassword !== confirmPassword){
            setError({currentPasswordError: "",
                newPasswordError : "Cant be same",
                confirmPasswordError : "Cant be same" });
            e.preventDefault()
        }
        try{ 
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                  id: id,
                  password: currentPassword,
                  newPassword : newPassword
                 })
            };
            const response = await fetch('http://localhost:8080/user/update/password', requestOptions);
            const data = await response.json();
            console.log(data.message)
            if(data.message === "Your recent password doesnot match"){
                setError({...error,currentPasswordError:data.message});
                setNewPassword("");
                setConfirmPassword("");
                e.preventDefault();
        }else if(data.message === "This is your old password"){
            setError({...error,newPasswordError:data.message})
            e.preventDefault();
           
        }else{
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            closeModal();
            alert('Update Succesful');

        }
    }
        catch(err){
            console.log(err);
        }
    
    }
if(!visibility) return null;
return (
<>
<div className="password-modal" onClick={removeErrors}>
    <button className='username-btn'onClick={hide}>x</button>
    <h3 className='update-password mb-5'>Update Password</h3>
    <div class="form-floating mb-3 w-75">
        <input type="password" className="form-control" placeholder="current-password" value={currentPassword}
            onChange={(e)=>setCurrentPassword(e.target.value)}
        />
        <label htmlFor="password">Current Password</label>
        <span className="error">{error.currentPasswordError}</span>
    </div>
    <div class="form-floating mb-3 w-75">
        <input type="password" className="form-control" placeholder="Event Name" value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
        />
        <label htmlFor="password">New Password</label>
        <span className="error">{error.newPasswordError}</span>
    </div>
    <div class="form-floating mb-3 w-75">
        <input type="password" className="form-control" placeholder="Event Name" value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        <label htmlFor="user-name">Confirm Password</label>
        <span className="error">{error.confirmPasswordError}</span>
    </div>
    <button className='btn btn-dark w-50 mt-3' onClick={updatePassword}>Update</button>
</div>
</>
)
}

export default PasswordModal;