import { Container, Form, Button } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import './resetPassword.css'
import {resetUtility} from '../../utility/resetUtility.js'
import {useNavigate} from 'react-router-dom'



export default function ResetPassword() {
    let nav = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if((passwordsMatch(password,confirmPassword))) {
          resetUtility(password)
          alert("Information successfully changed")
          nav('/login')
        }

      }

    const passwordsMatch = (password, confirmPassword) => {
        if(!password || !confirmPassword){
            setMessage("Please make sure that you fill in all fields")
        }
        else if (password.length < 4) {
          setMessage("Password must be more than 4 characters")
        } else if (password.length > 16) {
          setMessage("Password cannot exceed more than 16 characters")
        }
        else if(password === confirmPassword){
            setMessage("thank you, your changes have been saved")
            return true
        }
        else{
            setMessage("passwords dont match, make sure theyre the same")
            return false
        }
    }
    
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="mb-4">Reset Password</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label type="password">New Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
          <Form.Label >Confirm New Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter new password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </Form.Group>
        <p className='message mt-1'>{message}</p>
          <Button variant="btn btn-danger mt-3" type="submit">
            Confirm Changes
          </Button>
        </Form>
    
      
    </div>
    </Container>
  )
}
