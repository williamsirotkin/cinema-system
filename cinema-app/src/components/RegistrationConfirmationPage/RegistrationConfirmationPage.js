import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// import RegistrationPage from '../Signup.js';
import './RegistrationConfirmationPage.css'

const RegistrationConfirmationPage = () => {
  return (
    <Container className = 'container1'>
      <br></br>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Thank you for registering with us!</h1>
          <p>You are now part of our movie community.</p>
          <hr />
          <h4>Your registration details:</h4>
          <p><strong>Name:</strong> Marc Silverman</p>
          <p><strong>Email:</strong> marc123@aol.net</p>
          <Button variant="btn btn-danger" href="/">Continue</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationConfirmationPage;
