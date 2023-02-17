import React from 'react'
import "./EditProfile.css";
import {Link} from 'react-router-dom';
export default function EditProfile() {
  return (
    <div>
      <h1 className = "edit-profile-heading">edit profile</h1>
      <h1>edit profile</h1>
      <Link to  = "/registrationConfirmationPage"><button type="button">Confirm Changes </button></Link>
    </div>
  )
}