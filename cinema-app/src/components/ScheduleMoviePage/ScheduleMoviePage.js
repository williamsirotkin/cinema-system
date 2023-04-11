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
import { getMovieSchedule } from '../../utility/getMovieScheduleUtility';
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
        return (props.showingNow[i]._id.$oid)
      }
    }
  }


  function convertShowTimesToObject(showTimes) {
    console.log(showTimes.schedule)
    console.log(showRoom)
    let temp = []
      for (let i  = 0; i < showTimes.schedule.length; i++) {
        if (showTimes.schedule[i].room_name == showRoom.value) {
         temp.push({value: showTimes.schedule[i], label: showTimes.schedule[i]})
        }
      }
      console.log(temp)
      return temp
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
    console.log(await getTimesByRoomNumberUtility(showRoom.value))
    //setShowTimes((await getMovieSchedule(params.movie, getIDByTitle(params.movie)).schedule))
    //console.log(await getMovieSchedule(params.movie, getIDByTitle(params.movie)).schedule)
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
    scheduleMovieAsAdminUtility(convertShowTimes(showTimes), showRoom.value, params.movie, getIDByTitle(params.movie))
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
    return {value: date, label: stringifyDate(date)}
  });

  const roomOptions = 
    [
      { value: "room_one", label: "Room 1"},
      { value: "room_two", label: "Room 2"},
      { value: "room_three", label: "Room 3"},
      { value: "room_four", label: "Room 4"},
      { value: "room_five", label: "Room 5"}
    ]
  
    if (!props.user.admin) {
      return <h1> You are not authorized to view this page </h1>
    }
    

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
      temp.push(showTimes[i].value.year + "-" + inputValue(showTimes[i].value.month + 1) + "-" + inputValue(showTimes[i].value.calendarDay) + " " + inputValue(showTimes[i].value.hours) + ":00:00")
    }
    console.log(temp)
    return temp
}

function getAvailableShowTimes(takenShowTimes) {
  console.log(takenShowTimes)
  let today = new Date()
  console.log(today)
  let hours = today.getHours()
  let dayOfWeek = today.getDay()
  let calendarDay = today.getUTCDay() + 2
  let month = today.getMonth()
  let year = today.getFullYear()
  let numHoursRemoved = Math.max(0, Math.ceil((hours - 12) / 3))
  console.log("hours removed:" + numHoursRemoved)
  console.log(hours, dayOfWeek, calendarDay, month, year)

  let temp = {}
  let availableShowTimesArr = []
  for (let i = 0; i < 60; i++) {
      temp = {
      hours: 12 + (i % 4) * 3,
      calendarDay: dayConversion(calendarDay + Math.floor(i / 4 + numHoursRemoved), new Date(year, month+1, 0).getDate()),
      month: month + Math.floor((calendarDay + Math.floor(i / 4 + numHoursRemoved) - 1) / (new Date(year, month+1, 0).getDate())),
      year: year + Math.floor((month + Math.min(calendarDay, 32)) / 31)
    }
    let tempBool = true
    if (takenShowTimes) {
    for (let i = 0; i < takenShowTimes.length; i++) {
      if (!noConflict(temp, takenShowTimes[i])) {
        tempBool = false
      }
    }
  }
    if (tempBool)
      availableShowTimesArr.push(temp)
  }
  console.log("days in month" + new Date(year, month+1, 0).getDate())

  console.log(availableShowTimesArr)

  return availableShowTimesArr
}

function noConflict(temp, takenDay) {
    console.log(takenDay)
    console.log(JSON.stringify(temp), JSON.stringify(toDateFormat(takenDay)))
    if (JSON.stringify(temp) === JSON.stringify(toDateFormat(takenDay))) {
      return false
    }
  return true
}

function toDateFormat(dateStr) {
  console.log(dateStr)
  let dateString = dateStr.toString()
  let hours = dateString.substring(17, 19)
  let dayOfWeek = "Monday"
  let calendarDays = dateString.substring(5, 7)
  let month = monthInt(dateString.substring(8, 11))
  let year = dateString.substring(12, 16)
  console.log(dateStr)
  let returnValue = {
    hours: parseInt(hours),
    calendarDay: parseInt(calendarDays),
    month: parseInt(month),
    year: parseInt(year)
  }

  console.log(returnValue)
  return returnValue
}

function dayConversion(day, numDaysInMonth) {
  if (day > numDaysInMonth) {
    return day -= numDaysInMonth
  }
  return day
}

function stringifyDate(date) {
  let tempDate = new Date(date.year, date.month, date.calendarDay)
  let month = tempDate.toLocaleString('default', { month: 'long' });
  return month + " " + date.calendarDay + ", " + date.year + " at " + fixHours(date.hours) + "PM"
}

function fixHours(hours) {
  if (hours == 12) {
    return hours 
  } else {
    return hours - 12
  }
}

function inputValue(value) {
  if (value < 10) {
    return "0" + value
  }
  return value
}

function monthInt(monthStr) {
    console.log(monthStr)
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months.indexOf(monthStr)
}


export default ScheduleMoviePage;