import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './ScheduleMoviePage.css'
import {createProfile} from '../../utility/signupUtility.js'
import {isRouteErrorResponse, useNavigate, useParams} from 'react-router-dom'
import { checkEmailInUse } from '../../utility/checkEmailInUseUtility';
import Collapse from 'react-bootstrap/Collapse';
import CardForm from "../CheckoutPage/CardForm.js";
import emailjs from '@emailjs/browser';
import { scheduleMovieAsAdminUtility } from '../../utility/scheduleMovieAsAdminUtility';





const ScheduleMoviePage = (props) => {
  let params = useParams()  
  let nav = useNavigate()
  const [display, setDisplay] = useState('showroom')
  const [showRoom, setShowRoom] = useState('')
  const [showTime, setShowTime] = useState('')
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => setFormErrors(validate(showRoom)), []) 
  
  function getShowRoomFormErrors() {
    if (!isSubmit) {
        return ""
    } else if (formErrors.showRoom) {
        return formErrors.showRoom
    }

    return ""
  }

  const handleShowTimeChange = (event) => {
    setShowTime(event.target.value);
  };
  

  const handleShowRoomChange = (event) => {
    setShowRoom(event.target.value);
  };

  const handleShowRoomSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(showRoom));
    if (validate(showRoom).showRoom) {
      setIsSubmit(true)
      return
    }
    setDisplay('showtimes')
    //scheduleMovieAsAdminUtility(showTime, showRoom, movie.title)
  }
/*
  useEffect(() => {
    for (let i = 0; i < props.showingNow.length; i++) {
        if (props.showingNow[i].title == params.movie) {
            setMovie(props.showingNow[i])
            break
        }
    }
    for (let i = 0; i < props.comingSoon.length; i++) {
        if (props.comingSoon[i].title == params.movie) {
            setMovie(props.comingSoon[i])
            break
        }
    }
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(day, month, showTime, showRoom);
    }
  
  }, [formErrors]);
  */
 
  const validate = (showRoom) => {
    const errors = {};
    if (showRoom == "") {
        errors.showRoom = "Please specify the showroom of this showing"
    }
    return errors;
  };
  
  


  let showRoomDisplay = 
    <div className="container">
      <h1 className='register'>Schedule {params.movie} </h1>
        <h4 className = "error"> {getShowRoomFormErrors()} </h4>
      <Form onSubmit={handleShowRoomSubmit}>   
        <br></br>
        <Form.Group controlId="formBasicYear">
          <Form.Label>Select Room* </Form.Label>
          <select class="form-select" onChange = {handleShowRoomChange} aria-label="Default select example">
            <option selected> Select Showroom </option>
            <option value="Room 1"> Room 1</option>
            <option value="Room 2"> Room 2</option>
            <option value="Room 3"> Room 3</option>
            <option value="Room 4"> Room 4</option>
            <option value="Room 5"> Room 5</option>
            </select>
        </Form.Group>
       <Button variant="btn btn-danger mt-3" onClick = {handleShowRoomSubmit} type="submit">
          Submit
        </Button>
      </Form>
    </div>

    const showTimesDisplay = <div>
        <h1> Showtimes </h1>
    </div>
    
    if (display == "showroom") {
    return (
      showRoomDisplay
    )
    } else {
      return (
        showTimesDisplay
      )
    }
  
}

export default ScheduleMoviePage;