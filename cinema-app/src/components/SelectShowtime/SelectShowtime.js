import React, { useState } from 'react';
import './SelectShowtime.css'
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

const SelectShowtimes = () => {
  // Define an array of days and their corresponding showtimes
  const showtimes = [
    {
      day: "Monday, March 2nd",
      times: ["10:00am", "1:00pm", "4:00pm", "7:00pm"]
    },
    {
      day: "Tuesday, March 3rd",
      times: ["11:00am", "2:00pm", "5:00pm", "8:00pm"]
    },
    {
      day: "Wednesday, March 4th",
      times: ["10:30am", "1:30pm", "4:30pm", "7:30pm"]
    },
    {
      day: "Thursday, March 5th",
      times: ["10:00am", "1:00pm", "4:00pm", "7:00pm"]
    },
    {
      day: "Friday, March 6th",
      times: ["11:00am", "2:00pm", "5:00pm", "8:00pm"]
    },
    {
      day: "Saturday, March 7th",
      times: ["10:30am", "1:30pm", "4:30pm", "7:30pm"]
    }
  ];

  // Define state for the selected day
  const [selectedDay, setSelectedDay] = useState(0);

  // Define a function to increment the selected day
  const incrementSelectedDay = () => {
    if (selectedDay < 5) {
    setSelectedDay(selectedDay + 1);
    }
  };

  // Define a function to decrement the selected day
  const decrementSelectedDay = () => {
    if (selectedDay > 0) {
    setSelectedDay(selectedDay - 1);
    }
  };

  return (
    <div>
      <h2 className = "center">Showtimes for The Batman </h2>
      <br></br>
      <div  className = "center" >
      <Button variant="primary" onClick={decrementSelectedDay}> Previous Day </Button>
      &nbsp;&nbsp;&nbsp;
        <span><h3>{showtimes[selectedDay].day}</h3></span>
        &nbsp;&nbsp;&nbsp;
        <Button variant="primary" onClick={incrementSelectedDay}> Next Day </Button>
      </div>
      <br></br>
      <br></br>
      <div className = "center">
        {showtimes[selectedDay].times.map((time) => (
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button href = "/selectSeats" variant="success" key  = {time}> {time} </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectShowtimes;
/*
export default function SelectShowtime() {
  return (
    <div className = "select-showtime-page">
      <div className = "showtimes-title"><h1>Select Your Showtime For The Batman </h1></div>
      <div className = "dayHeader">
        <h1> March 2nd </h1>
      </div>
      <br></br>
      <div className = "showtimes-row">
      <Link to  = "/selectSeats"><Button variant="success"> 12:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 2:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 4:30 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 6:50 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 8:10 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 9:30 pm </Button></Link>
      </div>
      <br></br>
      <br></br>
      <div className = "dayHeader">
        <h1> March 3rd </h1>
      </div>
      <br></br>
      <div className = "showtimes-row">
      <Link to  = "/selectSeats"><Button variant="success"> 12:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 2:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 5:50 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 6:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 8:10 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 9:30 pm </Button></Link>
      </div>
      <br></br>
      <br></br>
      <div className = "dayHeader">
        <h1> March 4th </h1>
      </div>
      <br></br>
      <div className = "showtimes-row">
      <Link to  = "/selectSeats"><Button variant="success"> 12:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 2:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 4:30 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 6:50 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 8:10 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 9:30 pm </Button></Link>
      </div>
      <br></br>
      <br></br>
      <div className = "dayHeader">
        <h1> March 5th </h1>
      </div>
      <br></br>
      <div className = "showtimes-row">
      <Link to  = "/selectSeats"><Button variant="success"> 12:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 2:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 5:50 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 6:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 8:10 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 9:30 pm </Button></Link>
      </div>
      <br></br>
      <br></br>
      <div className = "dayHeader">
        <h1> March 6th </h1>
      </div>
      <br></br>
      <div className = "showtimes-row">
      <Link to  = "/selectSeats"><Button variant="success"> 12:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 2:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 4:30 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 6:50 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 8:10 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 9:30 pm </Button></Link>
      </div>
      <br></br>
      <br></br>
      <div className = "dayHeader">
        <h1> March 7th </h1>
      </div>
      <br></br>
      <div className = "showtimes-row">
      <Link to  = "/selectSeats"><Button variant="success"> 12:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 2:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 5:50 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 6:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 8:10 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 9:30 pm </Button></Link>
      </div>
      <br></br>
      <br></br>
      <div className = "dayHeader">
        <h1> March 8th </h1>
      </div>
      <br></br>
      <div className = "showtimes-row">
      <Link to  = "/selectSeats"><Button variant="success"> 12:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 2:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 4:30 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 6:50 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 8:10 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 9:30 pm </Button></Link>
      </div>
      <br></br>
      <br></br>
      <div className = "dayHeader">
        <h1> March 9th </h1>
      </div>
      <br></br>
      <div className = "showtimes-row">
      <Link to  = "/selectSeats"><Button variant="success"> 12:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 2:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 5:50 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 6:45 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 8:10 pm </Button></Link>
      <Link to  = "/selectSeats"><Button variant="success"> 9:30 pm </Button></Link>
      </div>
    </div>
  )
}
*/