import React, { useEffect, useState} from 'react';
import './SelectShowtime.css'
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getMovieSchedule } from '../../utility/getMovieScheduleUtility';
import { searchMovieUtility } from '../../utility/searchMovieUtility';
import { getMovieByTitle } from '../../utility/getMovieByTitleUtility';
import { getDatesByTitle } from '../../utility/getDatesByTitle';



const SelectShowtimes = (props) => {
  let nav = useNavigate()
  const {movieTitle} = useParams();
  const [length,setLength] = useState(0)
  const [finalSchedule,setFinalSchedule] = useState([{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},
  {day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},
  {day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},
  {day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},
  {day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]},{day:"",times:[]}])

  const [schedule, setSchedule] = useState([{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""}
,{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},
{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""},{room_name:"",showtime:""}])
  const [movieImg,setMovieImg] = useState([])
  // Define an array of days and their corresponding showtimes


useEffect(()=>{
  (async()=>{
    const result = await getMovieByTitle(movieTitle)
    setMovieImg(result[0].photo_link)
  })();
},[])

useEffect(()=>{
  (async()=>{
    const result = await getDatesByTitle(movieTitle)
    console.log(result.schedule)
    setSchedule(result.schedule)
    let tempMap = {}
    let seen = new Set()
    for (let i = 0; i < result.schedule.length; i++) {
      if (!seen.has(result.schedule[i].showtime)) {
        if (!tempMap[result.schedule[i].showtime.substring(0, 11)]) {
          seen.add(result.schedule[i].showtime)
          tempMap[result.schedule[i].showtime.substring(0, 11)] = []

        }
        tempMap[result.schedule[i].showtime.substring(0, 11)].push({
          hours: result.schedule[i].showtime.substring(17, 19),
          room: result.schedule[i].room_name,
          showtime: result.schedule[i].showtime
        })
      }
      console.log(tempMap)
    }
    
    const reformattedData = [];

    for (const key in tempMap) {
      const [dayName, day] = key.split(", ");
      const times = tempMap[key];
      
      // const convertedTimes = times.map(time => {
      //   const easternTime = new Date(`2023-01-01T${time}:00Z`);
      //   const localTime = easternTime.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour12: true, hour: "2-digit", minute: "2-digit" });
      //   return localTime.toLowerCase().replace('am', 'am').replace('pm', 'pm');
      // });
      reformattedData.push({
        day: `${dayName}, ${day}`,
        times: times.map(time => ({
          hours: `${time.hours} PM`, 
          room: time.room,
          showtime: time.showtime
        }))
      });
    }
    let retArr = []
    for (let i = 0; i < reformattedData.length; i++) {
      let tempSet = new Set()
      let tempHourArr = []
      console.log(reformattedData[0].times[0])
      for (let j = 0; j < reformattedData[i].times.length; j++) {
        if (!tempSet.has(reformattedData[i].times[j])) {
          tempHourArr.push(reformattedData[i].times[j])
        }
        tempSet.add(reformattedData[i].times[j])
      }
      reformattedData[i].times = tempHourArr
      retArr.push(reformattedData[i])
    }
    setLength(retArr.length)
    console.log(retArr)
    setFinalSchedule(retArr)
  })();
},[])
// console.log(scheduleMap)
console.log(finalSchedule)




  // Define state for the selected day
  const [selectedDay, setSelectedDay] = useState(0);

  // Define a function to increment the selected day
  const incrementSelectedDay = () => {
    if (selectedDay < length-1) {
    setSelectedDay(selectedDay + 1);
    }
  };

  // Define a function to decrement the selected day
  const decrementSelectedDay = () => {
    if (selectedDay > 0) {
    setSelectedDay(selectedDay - 1);
    }
  };

  function handleTimeSelection(time) {
    props.setMovieRoomFunc(time.room);
    props.setMovieShowtimeFunc(time.showtime)
    nav('/selectAges/' + movieTitle, {replace: true})
  }
 
  if (props.user) {
  return (
    <div className='box'>

      <div className='showtimeImg'> <Card.Img class = 'movieImage' variant="top" src={movieImg} /></div>
      <h2 className = "center"><strong>{movieTitle} </strong></h2>
      <br></br>
      <div className = "center" >
      <Button variant="outline-danger" onClick={decrementSelectedDay}> Previous Day </Button>
      &nbsp;&nbsp;&nbsp;
        <span><h3>{finalSchedule[selectedDay].day}</h3></span>
        &nbsp;&nbsp;&nbsp;
        <Button variant="outline-danger" onClick={incrementSelectedDay}> Next Day </Button>
      </div>
      <br></br>
      <br></br>
      <div className = "center">
        {finalSchedule[selectedDay].times.map((time) => (
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button  onClick = {() => handleTimeSelection(time)} variant="danger" key  = {time} size="lg" > {formatTime(time.hours)} </Button>
          </div>
        ))}
      </div>
    </div>
  );
} else {
  return (
    <h1> You are not authorized to view this page </h1>
  )
}
};
function formatTime(time) {
  let temp = parseInt(time.substring(0, 2))
  if (temp > 12) {
    temp -= 12
  }
  return temp + ":00 PM"
}

export default SelectShowtimes;
