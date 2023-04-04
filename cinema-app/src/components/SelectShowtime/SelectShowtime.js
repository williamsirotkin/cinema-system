import React, { useEffect, useState} from 'react';
import './SelectShowtime.css'
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom'
import { getMovieSchedule } from '../../utility/getMovieScheduleUtility';
import { searchMovieUtility } from '../../utility/searchMovieUtility';
import { getMovieByTitle } from '../../utility/getMovieByTitleUtility';



const SelectShowtimes = (props) => {
  const {movieTitle} = useParams();
  const [schedule, setSchedule] = useState([])
  const [movieImg,setMovieImg] = useState([])
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
  async function handleGetMovie(result){
    result = await searchMovieUtility(movieTitle)
    console.log(result)
    
  }

async function handleGetSchedule() {
    let schedule = await getMovieSchedule(movieTitle)
    setSchedule(schedule)

  }
useEffect(()=>{
    handleGetSchedule()
},[])

useEffect(()=>{
  (async()=>{
    const result = await getMovieByTitle(movieTitle)
    setMovieImg(result[0].photo_link)
  })();
  
},[])




console.log(schedule)


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
    <div className='box'>


      <Card.Img class = 'movieImage' variant="top" src={movieImg} />
      <h2 className = "center"><strong>{movieTitle} </strong></h2>
      <br></br>
      <div className = "center" >
      <Button variant="outline-danger" onClick={decrementSelectedDay}> Previous Day </Button>
      &nbsp;&nbsp;&nbsp;
        <span><h3>{showtimes[selectedDay].day}</h3></span>
        &nbsp;&nbsp;&nbsp;
        <Button variant="outline-danger" onClick={incrementSelectedDay}> Next Day </Button>
      </div>
      <br></br>
      <br></br>
      <div className = "center">
        {showtimes[selectedDay].times.map((time) => (
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button href = "/selectAges" variant="danger" key  = {time}> {time} </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectShowtimes;
