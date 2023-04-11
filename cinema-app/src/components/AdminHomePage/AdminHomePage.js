import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from "react-bootstrap";
import './AdminHomePage.css'

export default function AdminHomePage(props) {
  if (props.user.admin) {
  return (
    <div className = "admin-center">
         <div className='homepageTitles'> 
        <h1 > Admin Homepage </h1>
        </div>
        <br></br>
        <div className = "admin-page">
        <Link  to  = "/manageMovies"><Button variant="primary"> Manage Movies </Button></Link>
        &nbsp; &nbsp; &nbsp;
        <Link  to  = "/addPromotions"><Button variant="success"> Manage Promotions </Button></Link>
        &nbsp; &nbsp; &nbsp;
        <Link  to  = "/manageUsers"><Button variant="primary"> Manage Users </Button></Link>
        </div>
    </div>
  )
  } else {
    return (
      <h1> You are not authorized to view this page </h1>
    )
  }
}
