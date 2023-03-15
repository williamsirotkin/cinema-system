import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Signup.css'
import {createProfile} from '../../utility/signupUtility.js'
import {Link} from 'react-router-dom'


const RegistrationPage = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration form submitted!');
  }



  return (
    <div className="container">
      <h1 className='register'>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br></br>
        
        <Link to='/registrationConfirmationPage'><Button variant="btn btn-danger" onClick = {() => {createProfile(firstName, lastName, email, password); props.setUserData(firstName,lastName,email);}} type="submit">
          Submit
        </Button></Link>
      </Form>
    </div>
  );
}

export default RegistrationPage;