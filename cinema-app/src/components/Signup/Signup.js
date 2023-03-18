import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Signup.css'
import {createProfile} from '../../utility/signupUtility.js'
import {useNavigate} from 'react-router-dom'
import { checkEmailInUse } from '../../utility/checkEmailInUseUtility';
import Collapse from 'react-bootstrap/Collapse';
import CardForm from "../CheckoutPage/CardForm.js";



const RegistrationPage = (props) => {
  let nav = useNavigate()
  const [errorMessage, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [cardInfo, setCardInfo] = useState('')
  const [birthday, setBirthday] = useState('')
  const [promos, setPromos] = useState(false)
  const [switchState, setSwitchState] = useState(false);



  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [open, setOpen] = useState(false);


  const handleChange=(e)=>{
    setSwitchState(!switchState)
    setPromos(e.target.checked)
 } 

  const sendData = (cardInfo) =>{
    setCardInfo(cardInfo)

  }
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(firstName,lastName,email,password));
    setIsSubmit(true);
    setErrorMessage("")
    console.log('Registration form submitted!');
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(firstName,lastName,email,password);
    }
  
  }, [formErrors]);

  useEffect(()=> {
    checkEmail(firstName, lastName, email, password, billingAddress, promos, cardInfo,birthday)
  },[formErrors])
  
  const validate = (firstName,lastName,email,password) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!firstName) {
      errors.firstName = "first name is required!";
    }
    if (!lastName) {
      errors.lastName = "last name is required!";
    }
    if (!email) {
      errors.email = "email is required!";
    }else if(!regex.test(email)){
      errors.email = "Valid email format is required";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (password.length > 16) {
      errors.password = "Password cannot exceed more than 16 characters";
    }
    return errors;
  };


async function checkEmail(firstName, lastName, email, password, billingAddress, promos, cardInfo, birthday) {

  //puts in the data to database

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const check = await checkEmailInUse(email)

      if(check){
        createProfile(firstName, lastName, email, password, billingAddress, promos, cardInfo, birthday); 
        props.setUserData(firstName,lastName,email, "customer", billingAddress, promos, cardInfo, birthday);
        nav('/registrationConfirmationPage', {replace: true})
      } else {
        setErrorMessage("Email is already in use, please login with that email or use another email address to sign up")
        

    }

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
        <p className='error'>{formErrors.firstName}</p>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <p className='error'>{formErrors.lastName}</p>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <p className='error'>{formErrors.email}</p>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p className='error'>{formErrors.password}</p>
        <Form.Group controlId="formBasicBillingAddress">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Billing Address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group controlId="formBirthday" className='mt-3'>
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

          Add new credit card
        </Button>
        <Collapse in={open}>
        <div id="example-collapse-text">
          <CardForm sendData = {sendData}></CardForm>
        </div>
        </Collapse>
        <br></br>
       <Button variant="btn btn-danger mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationPage;