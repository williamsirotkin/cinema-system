import React, { useState, Redirect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {login} from '../../utility/loginUtility.js'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
  let nav = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  const handleLogin = async (email, password) => {
    let result = await login(email, password)
    if (result) {
      nav("/", {replace:true})
    } else {
      setErrorMessage('Wrong Email/Password Please Try Again')
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="mb-4">Login</h1>
        <p class = "error">{errorMessage}</p>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <br></br>
          <Button variant="btn btn-danger" type="submit" onClick = {() => handleLogin(email, password)}>
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;