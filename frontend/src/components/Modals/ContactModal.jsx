import React from "react"
import './contactmodal.css'
import { useState } from "react";

const ContactModal = ({visibility,hide,id,closeModal}) => {
    const[contact,setContact] = useState("");
    const[error,setError] = useState("");
    const updateContact = async () =>{
        try{
            console.log(id);
            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                "id": id,
                "contact" : contact
               })
          };
          const response = await fetch('http://localhost:8080/user/update/contact', requestOptions);
          if(response.status === 200){
            alert("Update successful")
            setContact("");
            closeModal(contact);
          }
          
        }catch(err){
            console.log(err);
        }
    }
    if(!visibility) return null;

    return(
        <>
        <div className="contact-modal">
        <button className='contact-btn'onClick={hide}>x</button>
        <h3 className='update-contact mb-5'>Update Contact</h3>
        <div class="form-floating mb-3 w-75">
            <input type="text" className="form-control"  placeholder="Event Name"
            value = {contact}
            onChange={(e)=>setContact(e.target.value)}
                 />
            <label htmlFor="contact">Contact</label>
            <span className = "error">{error}</span>
        </div>
        <button className='btn btn-dark w-50 mt-3' onClick ={updateContact}>Update</button>
    </div>
        </>
    )
}
export default ContactModal;