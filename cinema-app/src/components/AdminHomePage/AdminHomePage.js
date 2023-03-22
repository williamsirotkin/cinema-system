import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from "react-bootstrap";
import './AdminHomePage.css'

export default function AdminHomePage(props) {
  return (
    <div>
        <h1 className = "admin-page"> Welcome {props.user.firstName}! </h1>
        <div className = "admin-page">
        <Link  to  = "/manageMovies"><Button variant="primary"> Manage Movies </Button></Link>
        &nbsp; &nbsp; &nbsp;
        <Link  to  = "/addPromotions"><Button variant="success"> Manage Promotions </Button></Link>
        </div>
    </div>
  )
}
