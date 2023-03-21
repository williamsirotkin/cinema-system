import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {loginUtility} from '../../utility/loginUtility.js'
import {checkActive} from '../../utility/activeUtility.js'
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Collapse from 'react-bootstrap/Collapse';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';




const Login = () => {
  let nav = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [open, setOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('')
  const [emptyResetEmail, setEmptyResetEmail] = useState('')
  const [switchState, setSwitchState] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (resetEmail === ''){
      setEmptyResetEmail("Please enter an email")
    }
    else {
      setShow(true);
      setEmptyResetEmail("")
      console.log(resetEmail)
      emailjs.send('service_ofjhgu6', 'template_15yauza', {'resetEmail': resetEmail}, 'DtNOiKN5xVEZfQwFe')
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
    }
    
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  }

  const handleChange=(e)=>{
    setSwitchState(!switchState)
 } 


  const handleLogin = async (email, password, switchState) => {
    let result = await loginUtility(email, password, switchState)

    if (result.token) {
      let activeResult = await checkActive(email)

      if (!activeResult) {
        setErrorMessage("Please click your email confirmation")
      } else {
      if (result.admin) {
        nav("/admin", {replace:true})
      } else {
        nav("/", {replace:true})
      }
      window.location.reload()
    }} else {
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
          <Form.Check
          type="switch"
          id="custom-switch"
          label="Remember me for 30 days"
          defaultChecked={switchState}
          onChange={handleChange}/>
          <br></br>
          <div className='links'>
          <Button variant="btn btn-danger" type="submit" onClick = {() => {handleLogin(email, password, switchState)}}>
            Submit
          </Button>

          <Nav.Link eventKey="link" id="forgotPassword"
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          >Forgot Password?
          </Nav.Link>
          </div>
          <Collapse in={open}>
          <div id="example-collapse-text">
            <br></br>
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Enter email to send reset password</Form.Label>
            <Form.Control type="email" placeholder="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}/>
            <div className='text-center'>
            <p className='emptyEmail'>{emptyResetEmail}</p>
            <Button variant="primary mt-2" onClick={handleShow} type="submit">Send Reset Email</Button>
            </div>

            </Form.Group>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
            <Modal.Header closeButton>
            <Modal.Title>Hooray!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            We have sent an email to reset password to {resetEmail}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
          
        </div>
        </Collapse>
         
        </Form>
      </div>
    </Container>
  );
};

export default Login;