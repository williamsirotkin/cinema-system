import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Signup.css'
import {createProfile} from '../../utility/signupUtility.js'
import {Link, useNavigate} from 'react-router-dom'
import { checkEmailInUse } from '../../utility/checkEmailInUseUtility';



const RegistrationPage = (props) => {
  let nav = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration form submitted!');
  }


async function checkEmail(firstName, lastName, email, password) {
  const check = await checkEmailInUse(email)
  if (check) {
    createProfile(firstName, lastName, email, password); 
    props.setUserData(firstName,lastName,email);
    nav('/registrationConfirmationPage', {replace: true})
  } else {
    setErrorMessage("Email is already in use, please login with that email or use another email address to sign up")
  }
}



  return (
    <div className="container">
      <h1 className='register'>Register</h1>
      <p class = "error" >{errorMessage}</p>
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
        
       <Button variant="btn btn-danger" onClick = {() => checkEmail(firstName, lastName, email, password)} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationPage;