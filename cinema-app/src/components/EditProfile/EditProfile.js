import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import CardForm from "../CheckoutPage/CardForm.js";
import Results from "../CheckoutPage/Results.js"
import Collapse from 'react-bootstrap/Collapse';



const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [birthday, setBirthday] = useState('')
  const [cardInfo, setCardInfo] = useState('')
  const [open, setOpen] = useState(false);
  const [promos, setPromos] = useState(false)
  const [switchState, setSwitchState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration form submitted!');
  }
  const sendData = (cardInfo) =>{
    setCardInfo(cardInfo)

  }
  const handleChange=(e)=>{
    setSwitchState(!switchState)
    setPromos(e.target.checked)
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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Edit Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="*Password will NOT be displayed*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBillingAddress">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Billing Address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </Form.Group>

       

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="(dd/mm/yyyy)"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        
        
        <br></br>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Register for Promotions"
          defaultChecked={switchState}
          onChange={handleChange}/>
        <Button variant="dark mt-3 " size="lg"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}>

          Edit Credit Card
        </Button>
        <Collapse in={open}>
        <div id="example-collapse-text">
          <CardForm sendData = {sendData}></CardForm>
        </div>
        </Collapse>
        <br></br>
        <br></br>
        
        
        <Button variant="btn btn-danger" type="submit" href="/login">
          Confirm changes
        </Button>
      </Form>
    </div>
  );
}

export default  EditProfile;

