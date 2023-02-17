import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const EditProfile = () => {
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
      <h1 className='register'>Edit Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Edit First Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="*Current first name will be displayed*"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Edit Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="*Current last name will be displayed*"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Edit Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="*Current email will be displayed*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Edit Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="*Password will NOT be displayed*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <br></br>
        <Button variant="btn btn-danger" type="submit" href="/login">
          Confirm changes
        </Button>
      </Form>
    </div>
  );
}

export default  EditProfile;