import React, { useState } from "react";
import './dashboard.css';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () =>{
    const location = useLocation();
    const{id} = location.state || {};
    

    const [userData,setUserData] = useState({
        firstName : "",
        lastName: "",
        contact: "",
        email:"",
        username:"",
        photo:""

    })

    const fetchData= async () =>{
        
            await fetch(`http://localhost:8080/user/${id}`) 
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData({
                    firstName : data.firstName,
                    lastName: data.lastName,
                    contact: data.contact,
                    email:data.email,
                    username:data.username,
                    photo:data.photo
                })
            })
    }
    useEffect(()=>{
        try{
          fetchData();
        }catch(err){
          console.log(err.message)
        }
       },[])
    
return (
<>
    <nav className="navbar bg-dark">
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 text-white">Welcome! {userData.firstName}</span>
            <button className="btn btn-dark">Logout</button>
        </div>
    </nav>
    <section id="settings" className="settings bg-dark text-light">
        <img src={userData.photo}></img>
            <div className="setting-heading bg-dark text-light">
                <h1>General Profile Settings</h1>
            </div>
            <table className="table">
                <tbody>
                 
                    <tr>
                    <td>Full Name</td>
                    <td>{userData.firstName} {userData.lastName}</td>
                    <td><button className='btn btn-dark'>Edit</button></td>
                  </tr>
                    <tr>
                    <td>Username</td>
                    <td>{userData.username}</td>
                    <td><button className='btn btn-dark'>Edit</button></td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>{userData.contact}</td>
                    <td><button className='btn btn-dark' >Edit</button></td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userData.email}</td>
                    <td><button className='btn btn-dark' >Edit</button></td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>**********</td>
                    <td><button className='btn btn-dark' >Edit</button></td>
                  </tr>
                </tbody>
              </table>
       </section>

</>
)
}

export default Dashboard;