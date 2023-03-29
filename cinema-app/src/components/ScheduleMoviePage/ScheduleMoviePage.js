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
  const [movie, setMovie] = useState({})
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [showTime, setShowTime] = useState('')
  const [showRoom, setShowRoom] = useState('')

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)
  const [open, setOpen] = useState(false);
 
  const handleDayChange = (event) => {
    setDay(event.target.value);
  };


  useEffect(() => setFormErrors(validate(day, month, showTime, showRoom)), [])
  
  function getFormError() {
    if (!isSubmit) {
        return ""
    }
    if (formErrors.day) {
        return formErrors.day
    } else if (formErrors.month) {
        return formErrors.month
    } else if (formErrors.showTime) {
        return formErrors.showTime 
    } else if (formErrors.showRoom) {
        return formErrors.showRoom
    }

    return "Movie Successfully Scheduled!"
  }

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleShowTimeChange = (event) => {
    setShowTime(event.target.value);
  };

  const handleShowRoomChange = (event) => {
    setShowRoom(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true)
    setFormErrors(validate(day, month, showTime, showRoom));
    if (formErrors.day || formErrors.month || formErrors.showRoom || formErrors.showTime) {
        return
    }
    scheduleMovieAsAdminUtility(day, month, showTime, showRoom, movie.title)
    console.log('Scheduled Movie');
  }

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
  
  const validate = (day, month, showTime, showRoom) => {
    const errors = {};
    
    if (day == "") {
        errors.day = "Please specify the day of this showing"
    }
    if (month == "") {
      errors.month = "Please specify the month of this showing"
    } 
    if (showRoom == "") {
        errors.showRoom = "Please specify the showroom of this showing"
    }
    if (showTime == "") {
        errors.showTime = "Please specify the showtime of this showing"
    }
    return errors;
  };


  return (

    <div className="container">
      <h1 className='register'>Schedule a Movie</h1>
        <h4 className = "error"> {getFormError()} </h4>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicMonth">
          <Form.Label>Select Showing Month*</Form.Label>
          <select class="form-select" onChange = {handleMonthChange} aria-label="Default select example">
            <option selected> Select Month </option>
            <option value="Janurary">Janurary</option>
            <option value="Februrary">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
            </select>
        </Form.Group>
        <br></br>
        <Form.Group controlId="formBasicDay">
          <Form.Label>Select Showing Day*</Form.Label>
          <select class="form-select" onChange = {handleDayChange} aria-label="Default select example">
            <option selected> Select Day </option>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
            <option value="13">13th</option>
            <option value="14">14th</option>
            <option value="15">15th</option>
            <option value="16">16th</option>
            <option value="17">17th</option>
            <option value="18">18th</option>
            <option value="19">19th</option>
            <option value="20">20th</option>
            <option value="21">21st</option>
            <option value="22">22nd</option>
            <option value="23">23rd</option>
            <option value="24">24th</option>
            <option value="25">25th</option>
            <option value="26">26th</option>
            <option value="27">27th</option>
            <option value="28">28th</option>
            <option value="29">29th</option>
            <option value="30">30th</option>
            <option value="31">31st</option>
            </select>
        </Form.Group>
        <br></br>
        <Form.Group controlId="formBasicYear">
          <Form.Label>Select Showing Time*</Form.Label>
          <select class="form-select" onChange = {handleShowTimeChange} aria-label="Default select example">
            <option selected> Select Time </option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="1:30 PM">1:30 PM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="8:30 PM">8:30 PM</option>
            </select>
        </Form.Group>
        <br></br>
        <Form.Group controlId="formBasicYear">
          <Form.Label>Select Showroom*</Form.Label>
          <select class="form-select" onChange = {handleShowRoomChange} aria-label="Default select example">
            <option selected> Select Showroom </option>
            <option value="Room 1">Room 1</option>
            </select>
        </Form.Group>
       <Button variant="btn btn-danger mt-3" onClick = {handleSubmit} type="submit">
          Submit
        </Button>
      </Form>
    </div>
    
  );
  
}

export default ScheduleMoviePage;