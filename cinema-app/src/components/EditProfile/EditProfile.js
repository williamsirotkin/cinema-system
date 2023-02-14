import React from 'react'
import "./EditProfile.css";
import {Link} from 'react-router-dom';
export default function EditProfile() {
  return (
    <div className='App'>
      <h1>edit profile</h1>
      <Link to  = "/"><button type="button">Homepage</button></Link>
    </div>
  )
}