import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './ScheduleMoviePage.css'
import {createProfile} from '../../utility/signupUtility.js'
import {isRouteErrorResponse, useNavigate, useParams} from 'react-router-dom'
import { checkEmailInUse } from '../../utility/checkEmailInUseUtility';
import Collapse from 'react-bootstrap/Collapse';
import CardForm from "../CheckoutPage/CardForm.js";
import emailjs from '@emailjs/browser';
import {getTimesByRoomNumberUtility} from '../../utility/getTimesByRoomNumberUtility';





const ScheduleMoviePage = (props) => {
  let params = useParams()  
  let nav = useNavigate()
  const [display, setDisplay] = useState('showroom')
  const [showRoom, setShowRoom] = useState('')
  const [availableShowTimes, setAvailableShowTimes] = useState([])
  const [showTimes, setShowTimes] = useState([])
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
/*
  const handleShowTimeChange = (event) => {
    setShowTime(event.target.value);
  };
  */
  

  const handleShowRoomChange = (event) => {
    setShowRoom(event.target.value);
  };

  const handleShowRoomSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(showRoom));
    if (validate(showRoom).showRoom) {
      setIsSubmit(true)
      return
    }
    setAvailableShowTimes(await getTimesByRoomNumberUtility(showRoom))
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
            <option value="room_one"> Room 1</option>
            <option value="room_two"> Room 2</option>
            <option value="room_three"> Room 3</option>
            <option value="room_four"> Room 4</option>
            <option value="room_five"> Room 5</option>
            </select>
        </Form.Group>
       <Button variant="btn btn-danger mt-3" onClick = {handleShowRoomSubmit} type="submit">
          Submit
        </Button>
      </Form>
    </div>

    let showTimesDisplay = 
       <div className="container">
      <h1 className='register'>Schedule {params.movie} </h1>
        <h4 className = "error"> {availableShowTimes[0]} {availableShowTimes[1]} </h4>
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