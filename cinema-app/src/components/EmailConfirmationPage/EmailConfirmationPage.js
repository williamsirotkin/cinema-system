import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from "react-bootstrap";
import "./EmailConfirmationPage.css"

export default function EmailConfirmation() {
  return (
    <div>
      <h1 class = "email-stuff"> Thank you for confirming your email! </h1>
      <br></br>
      <div class = "email-stuff">
      <Link  to  = "/login"><Button class = "go-to-login" variant="primary"> Go to Login page </Button></Link>
    </div>
    </div>
  )
}
