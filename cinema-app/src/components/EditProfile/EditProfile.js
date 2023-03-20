import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import CardForm from "../CheckoutPage/CardForm.js";
import Results from "../CheckoutPage/Results.js"
import Collapse from 'react-bootstrap/Collapse';
import { editUserProfile } from '../../utility/editUserProfileUtility';



const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [billingAddress, setBillingAddress] = useState(user.billing_address || '');
  const [birthday, setBirthday] = useState(user.birthday || '');
  const [cardInfo, setCardInfo] = useState(  '');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [promos, setPromos] = useState(false);
  const [switchState, setSwitchState] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const email = user.email;

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
      console.log(firstName,lastName,password);
    }

  }, [formErrors]);

  useEffect(()=> {
    updateProfileNames();
  },[formErrors])

  function updateProfileNames(firstName, lastName, email) {
    editUserProfile(firstName,lastName, email);
  }

  const sendData = (cardInfo) =>{
    setCardInfo(cardInfo)

  }

  const handleChange=(e)=>{
    setSwitchState(!switchState)
    setPromos(e.target.checked)
    
  }

  const validate = (firstName,lastName,password) => {
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

  return (
    <div className="container">
      <h1 className='register'>Edit Profile</h1>
      <p className="error">{errorMessage}</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Edit First Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter First Name"
            value= {firstName}
            onChange={(e) => console.log(e.target.value)}
          />
        </Form.Group>
        <p className='error'>{formErrors.firstName}</p>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Edit Last Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <p className='error'>{formErrors.lastName}</p>

        <Button variant="btn btn-secondary mt-3 " size="md"
        onClick={() => setOpen2(!open2)}
        aria-controls="example-collapse-text"
        aria-expanded={open2}>

          Edit password
        </Button>
        <Collapse in={open2}>
        <div id="example-collapse-text">
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Current password</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </Form.Group>

          <Form.Group controlId="formBasicFirstName">
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          </Form.Group>
        </div>
        </Collapse>
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
      <hr></hr>
        
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
        
        <div className='text-center'>
          <hr></hr>
        <Button variant="btn btn-danger" type="submit" href="/login">
          Confirm changes
        </Button>
        </div>
      </Form>
    </div>
  );
}

export default  EditProfile;

