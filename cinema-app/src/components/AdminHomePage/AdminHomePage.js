import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from "react-bootstrap";

export default function AdminHomePage() {
  return (
    <div>
        <h1> Welcome William! </h1>
        <div>
        <Link to  = "/manageMovies"><Button variant="primary"> Manage Movies </Button></Link>
        <br></br>
        <br></br>
        <Link to  = "/addPromotions"><Button variant="success"> Manage Promotions </Button></Link>
        </div>
    </div>
  )
}
