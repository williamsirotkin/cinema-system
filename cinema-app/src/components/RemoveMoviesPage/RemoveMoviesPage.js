import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './RemoveMoviesPage.css'
import {isRouteErrorResponse, useNavigate, useParams} from 'react-router-dom'
import {getTimesByRoomNumberUtility} from '../../utility/getTimesByRoomNumberUtility';
import { getMovieSchedule } from '../../utility/getMovieScheduleUtility';
import { removeScheduledMovieUtility } from '../../utility/removeScheduledMovieUtility';
import Select from 'react-select';

const RemoveMoviesPage = (props) => {
    let params = useParams()  
    let nav = useNavigate()
    const [display, setDisplay] = useState('showroom')
    const [showRoom, setShowRoom] = useState('')
    const [showTimes, setShowTimes] = useState([])
    //const [availableShowTimes, setAvailableShowTimes] = useState([{value: {hours: 12, calendarDay: 9, month: 3, year: 2023}, label: stringifyDate({hours: 12, calendarDay: 9, month: 3, year: 2023})}])
    const [availableShowTimes, setAvailableShowTimes] = useState([])
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
      let a = await getMovieSchedule(params.movie, getIDByTitle())
      let b = await getAvailableShowTimes(a, showRoom)
      setAvailableShowTimes(b)
     // setAvailableShowTimes(await getAvailableShowTimes(await getMovieSchedule(params.movie, getIDByTitle())))
      console.log(getAvailableShowTimes(await getTimesByRoomNumberUtility(showRoom.value), showRoom))

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
      removeScheduledMovieUtility(convertShowTimes(showTimes)[0], showRoom.value, params.movie)
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
    
  
  
    let showRoomDisplay = 
      <div className="container">
        <h1 className='register'>Remove Times For {params.movie} </h1>
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
       <h1 className='register'> Remove Times For {params.movie} </h1>
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


  
  async function getAvailableShowTimes(takenShowTimes, showRoom) {
    let availableShowTimesArr = []
   // availableShowTimesArr.push({hours: 12, calendarDay: 14, month: 3, year: 2023})
      for (let i = 0; i < takenShowTimes.schedule.length; i++) {
        console.log(showRoom, takenShowTimes.schedule[i].room_name)
        if (showRoom.value == takenShowTimes.schedule[i].room_name) 
            availableShowTimesArr.push(toDateFormat(takenShowTimes.schedule[i].showtime))
      }
      console.log(takenShowTimes.schedule)
     // availableShowTimesArr.push(toDateFormat(takenShowTimes.schedule[0].showtime))
      return availableShowTimesArr

  
  }
  
  function noConflict(temp, takenDay) {
      if (JSON.stringify(temp) === JSON.stringify(toDateFormat(takenDay))) {
        return false
      }
    return true
  }
  
  function toDateFormat(dateStr) {
    let dateString = dateStr.toString()
    let hours = dateString.substring(17, 19)
    let dayOfWeek = "Monday"
    let calendarDays = dateString.substring(5, 7)
    let month = monthInt(dateString.substring(8, 11))
    let year = dateString.substring(12, 16)
    let returnValue = {
      hours: parseInt(hours),
      calendarDay: parseInt(calendarDays),
      month: parseInt(month),
      year: parseInt(year)
    }
  
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
      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return months.indexOf(monthStr)
  }

  const waitForArray = async (array) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (array.length > 0) {
          clearInterval(interval);
          resolve(array);
        }
      }, 100); 
    });
  };

  

export default RemoveMoviesPage;