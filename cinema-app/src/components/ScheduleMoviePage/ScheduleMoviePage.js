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
import { scheduleMovieAsAdminUtility } from '../../utility/scheduleMovieAsAdminUtility';
import Select from 'react-select';





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
  
  function getIDByTitle() {
    for (let i = 0; i < props.showingNow.length; i++) {
      if (props.showingNow[i].title == params.movie) {
        alert(props.showingNow[i]._id.$oid)
        return (props.showingNow[i]._id.$oid)
      }
    }
  }

  function getShowRoomFormErrors() {
    if (!isSubmit) {
        return ""
    } else if (formErrors.showRoom) {
        return formErrors.showRoom
    }

    return ""
  }

  function getShowTimeFormErrors() {
    if (!isSubmit) {
        return ""
    } else if (formErrors.showTimes) {
        return formErrors.showTimes
    }

    return ""
  }

  const handleShowTimeChange = (options) => {
    setShowTimes(options);
  };
  
  

  const handleShowRoomChange = (room) => {
    setShowRoom(room);
  };

  const handleShowRoomSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(showRoom));
    if (validate(showRoom).showRoom) {
      setIsSubmit(true)
      return
    }
    setAvailableShowTimes(getAvailableShowTimes(await getTimesByRoomNumberUtility(showRoom.value)))
    setDisplay('showtimes')
  }

  const handleShowTimeSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateTimes(showTimes));
    if (validateTimes(showTimes).showTimes) {
      setIsSubmit(true)
      return
    }
    alert("Scheduled Specified Movie Times")
    nav('/admin')
    scheduleMovieAsAdminUtility(convertShowTimes(showTimes), showRoom, params.movie.title, getIDByTitle(params.movie))
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

  const validateTimes = (showTimes) => {
    const errors = {};
    if (showTimes.length == 0) {
        errors.showTimes= "Please specify the showtimes of this showing"
    }
    return errors;
  };

  const timeOptions = availableShowTimes.map((date) => {
    return { value: date, label: date };
  });

  const roomOptions = 
    [
      { value: "room_one", label: "Room 1"},
      { value: "room_two", label: "Room 2"},
      { value: "room_three", label: "Room 3"},
      { value: "room_four", label: "Room 4"},
      { value: "room_five", label: "Room 5"}
    ]
  


  let showRoomDisplay = 
    <div className="container">
      <h1 className='register'>Schedule {params.movie} </h1>
        <h4 className = "error"> {getShowRoomFormErrors()} </h4>
        <label> Select Room* </label>
        <Select
        value={showRoom}
        onChange={handleShowRoomChange}
        options={roomOptions}
        placeholder="Select Showroom"
        />
       <Button variant="btn btn-danger mt-3" onClick = {handleShowRoomSubmit} type="submit">
          Submit
        </Button>
    </div>

    let showTimesDisplay = 
       <div className="container">
      <h1 className='register'>Schedule {params.movie} </h1>
        <h4 className = "error"> {getShowTimeFormErrors()}  </h4>
        <label> Select Showtimes*</label>
        <Select
        isMulti
        value={showTimes}
        onChange={handleShowTimeChange}
        options={timeOptions}
        placeholder="Select showtime(s)"
        />
         <Button variant="btn btn-danger mt-3" onClick = {handleShowTimeSubmit} type="submit">
          Submit
        </Button>
    </div>

    if (availableShowTimes.length == 0) {
      showTimesDisplay = <h1> No Showtimes Available For This Room </h1>
    }

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

function convertShowTimes(showTimes) {
  let temp = []
    for (let i  = 0; i < showTimes.length; i++) {
      temp.append(showTimes[i].value)
    }
    return temp
}

function getAvailableShowTimes(takenShowTimes) {
  let today = new Date("05 October 2011 14:48 UTC");
  let isoDate = today.toISOString(); // Returns 2011-10-05T14:48:00.000Z
  alert(isoDate)
  let availableShowTimes = [

  ]
  for (let i = 0; i < takenShowTimes.length; i++) {

  }

  return takenShowTimes
}


export default ScheduleMoviePage;