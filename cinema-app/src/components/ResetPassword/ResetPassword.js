import { Container, Form, Button } from 'react-bootstrap';
import React, { useState, useContext } from 'react';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        passwordsMatch(password,confirmPassword)

      }

    const passwordsMatch = (password, confirmPassword) => {
        if(password === confirmPassword){
            alert("thank you, your changes have been saved")
            return true

        }else{
            alert("passwords dont match, make sure theyre the same")
            return false
        }
    }
    
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="mb-4">Reset Password</h1>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>New Password</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter new password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          </Form.Group>

          <Button variant="btn btn-danger mt-3" type="submit">
            Confirm Changes
          </Button>
        </Form>
    
      
    </div>
    </Container>
  )
}