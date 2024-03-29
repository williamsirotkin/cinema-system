import React, {useEffect, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import CardForm from "../CheckoutPage/CardForm.js";
import Results from "../CheckoutPage/Results.js"
import Collapse from 'react-bootstrap/Collapse';
import { editUserProfile } from '../../utility/editUserProfileUtility';
import {loginUtility} from '../../utility/loginUtility.js'
import {useNavigate} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';


// if (!user) {
//   return <p>No access</p>;
// }

const EditProfile = ({ user }) => {
  let nav = useNavigate()
  const [show, setShow] = useState(false)
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [billingAddress, setBillingAddress] = useState(user.billing_address || '');
  const [birthday, setBirthday] = useState(user.birthday || '');
  const [cardInfo, setCardInfo] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [promos, setPromos] = useState(false);
  const [switchState, setSwitchState] = useState(user.promos);
  const [passwordErrorMsg, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [useCard, setUseCard] = useState(false)
  const email = user.email;



function compileEditedUserJSON() {
     const userJSON = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      oldPassword: password,
      newPassword: newPassword,
      billing_address: billingAddress,
      birthday: birthday,
      registered_for_promos: switchState
    }

    if (useCard) {
      console.log("cardINFO from editProfile not util")
      userJSON['card_info'] = cardInfo
    }

    return userJSON
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("")
    setPasswordError("")
    setFormErrors(validate(firstName,lastName,newPassword));
    setIsSubmit(true);
    console.log('Registration form submitted!');
  }


   useEffect(() => {
    editStuff()
   }

  ,[formErrors]);


async function editStuff(){
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      if(newPassword === ""){
        editUserProfile(compileEditedUserJSON())
        handleShow()
        //setErrorMessage("Information was successfully changed")
          setTimeout(()=>{
            nav('/', {replace: true})
            window.location.reload()
          },2000)
          
      }
      else if(newPassword.length < 4 || newPassword.length > 16){
        setPasswordError("Password must be between 4 to 16 characters")
      }
      else{
        const login = await loginUtility(email,password, false)
        if(login){
          editUserProfile(compileEditedUserJSON())
          handleShow()
          //setErrorMessage("Information was successfully changed")
          setTimeout(()=>{
            nav('/', {replace: true})
            window.location.reload()
          },2000)
          
        }
        else{
          setErrorMessage("Please enter the correct current password to change to new password")
        }
      }
    }
    }


const sendData = (cardInfo) =>{
    setCardInfo(cardInfo)


  }

  const handleChange=(e)=>{
    setSwitchState(!switchState)
    setPromos(e.target.checked)
  }

  const handleClose = () => {
    setShow(false);
    nav('/')
    window.location.reload()
  }

  const handleShow = () => {
      setShow(true);
  }

  const validate = (firstName,lastName) => {
    const errors = {};
    if (!firstName) {
      errors.firstName = "first name is required!";
    }
    if (!lastName) {
      errors.lastName = "last name is required!";
    }
    return errors;
  };

  if(user){
    return (
      <div className="container">
        <h1 className='register'>Edit Profile</h1>
        <p className="error">{errorMessage}</p>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>Edit First Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder= {firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <p className='error'>{formErrors.firstName}</p>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Edit Last Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder= {lastName}
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
              type="password" 
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

            <Form.Group controlId="formBasicFirstName">
            <Form.Label>Enter New Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            </Form.Group>
            <p className='error'>{passwordErrorMsg}</p>
          </div>
          </Collapse>
            <Form.Group controlId="formBasicBillingAddress">
                <Form.Label>Billing Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder= {billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                />
            </Form.Group>



            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                    type="text"
                    placeholder= {birthday}
                  // value={birthday}
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
            <CardForm sendData = {sendData} isClicked={setUseCard}></CardForm>
          </div>
          </Collapse>

          <br></br>
          <br></br>

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
              Your information has been successfully changed
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          
          <div className='text-center'>
            <hr></hr>
          <Button variant="btn btn-danger" type="submit">
            Confirm changes
          </Button>
          </div>
        </Form>
      </div>
    );
  } else { 
    return (
      <h1> You are not authorized to view this page </h1>
    )
  } 
}

export default  EditProfile;