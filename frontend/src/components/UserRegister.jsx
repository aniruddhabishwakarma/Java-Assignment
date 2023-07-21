import React, { useState } from "react";
import './userregister.css';
import axios from 'axios';



const UserRegister = ({visibility,hide}) => {

    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName]= useState("");
    const[contact,setContact]= useState("");
    const[email,setEmail]= useState("");
    const[dob,setDob]= useState("");
    const[userName,setUserName]= useState("");
    const[password,setPassword]= useState("");
    const[photo,setPhoto]= useState("");

    const[error,setError] = useState({
       firstNameError:"",
       lastNameError:"",
       contactError:"",
       emailError:"",
       dobError:"",
       userNameError:"",
       passwordError:"",
       photoError:""
    })

    const validate = (e) =>{
        if(firstName== ""|| lastName== ""|| contact == "" || email == "" || dob == "" || userName == "" || password == "" || photo == ""){
            setError({
                firstNameError:"*Compulsary",
                lastNameError:"*Compulsary",
                contactError:"*Compulsary",
                emailError:"Compulsary",
                dobError:"*Compulsary",
                userNameError:"*Compulsary",
                passwordError:"*Compulsary",
                photoError:"*Compulsary"
            })
            e.preventDefault();
        }
        
    }
    const appendFormData = () =>{
        const dateObject = new Date(dob);
        const dateString = dateObject.toLocaleDateString();
        const data = {
            "firstName": firstName,
            "lastName" : lastName,
            "contact" : contact,
            "email" : email,
            "dob" : dateString,
            "username" : userName,
            "password": password
        }
        let formData = new FormData();
        formData.append('user',JSON.stringify(data));
        formData.append('file',photo)
        return formData;
    }
    const submit = async (e) => {
        validate();
        const formData= appendFormData();
        console.log(...formData);
        try{
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const url = 'http://localhost:8080/user/register';
            await axios.post(url, formData,config)
            .then((response)=>{
                
                setFirstName("");
                setLastName("");
                setContact("");
                setDob("");
                setEmail("");
                setUserName("");
                setPassword("");
                setPhoto("");
                alert("User added successfully");
                setError({firstNameError:"",
                lastNameError:"",
                contactError:"",
                emailError:"",
                dobError:"",
                userNameError:"",
                passwordError:"",
                photoError:""
            })
                
            })
            
        }catch(err){
            console.log(err.response.data);
            if(err.response.data === "Username already exists!"){
                setError({...error,userNameError: err.response.data})
            }else if(err.response.data === "Email already exist!"){
                setError({...error,emailError : err.response.data})
            }else if(err.response.data === "File already exists"){
                setError({...error,photoError:err.response.data})
            }else{
                setError({firstNameError:"",
                lastNameError:"",
                contactError:"",
                emailError:"",
                dobError:"",
                userNameError:"",
                passwordError:"",
                photoError:""
            })
            }
        }
        

    }
    if(!visibility) return null;
return (
<>
    <div className='overlay'>
        <button className='close-btn' onClick={hide}>X</button>
        <div className='register-user'>
            <h3 className='mb-5'>Register Here</h3>

            <div class="row mb-2">
                <div class="col-md">
                    <div class="form-floating w-100 ">
                        <input type="text" class="form-control" placeholder="name@example.com"
                        value={firstName} 
                        onChange={(e)=>setFirstName(e.target.value)} />
                        <label for="floatingInputGrid">First Name</label>
                        <small className="error">{error.firstNameError}</small>
                    </div>
                </div>
                <div class="col-md">
                    <div class="form-floating mb-3 w-100">
                        <input type="text" className="form-control" placeholder="Event Name" 
                        value={lastName} 
                        onChange={(e)=>setLastName(e.target.value)}/>
                        <label htmlFor="event-name">Last Name</label>
                        <small className="error">{error.lastNameError}</small>
                    </div>
                </div>
            </div>
            <div class="form-floating w-75 mb-3 ">
                <input type="text" class="form-control" placeholder="name@example.com"
                value={contact} 
                onChange={(e)=>setContact(e.target.value)}/>
                <label for="floatingInputGrid">Contact No.</label>
                <small className="error">{error.contactError}</small>
            </div>
            <div class="form-floating w-75 mb-3 ">
                <input type="email" class="form-control" placeholder="name@example.com" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
                <label for="email">Email</label>
                <small className="error">{error.emailError}</small>
            </div>
            <div class="form-floating w-75 mb-3 ">
                <input type="date" class="form-control" placeholder="name@example.com"
                value={dob}
                onChange={(e)=>setDob(e.target.value)} />
                <label for="dob">Date of Birth</label>
                <small className="error">{error.dobError}</small>
            </div>
            <div class="form-floating w-75 mb-3 ">
                <input type="text" class="form-control" placeholder="name@example.com"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)} />
                <label for="username">Username</label>
                <small className="error">{error.userNameError}</small>
            </div>
            <div class="form-floating w-75 mb-3 ">
                <input type="password" class="form-control" placeholder="name@example.com" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
                <label for="password">Password</label>
                <small className="error">{error.passwordError}</small>
            </div>
            
            <div class="mb-3 w-75">
                <label htmlFor="formFile" className="form-label">Photo</label>
                <input className="form-control" type="file" accept="image/jpg,image/jpeg,image/png,image/svg"
                  onChange={(e)=>setPhoto(e.target.files[0])}
                  />
                  <small className="error">{error.photoError}</small>  
            </div>
           
            <button className='btn btn-primary mt-2 w-75' onClick={submit} >Submit</button>
        </div>
    </div>

</>

)
}
export default UserRegister;