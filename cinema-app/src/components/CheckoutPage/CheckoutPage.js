import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate} from 'react-router-dom'
import {Image, Form } from 'react-bootstrap';
import './CheckoutPage.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import CardForm from "./CardForm";
import Results from './Results';
import { getMovieByTitle } from '../../utility/getMovieByTitleUtility';
import './CreditCard.css'
import CreditCard from './CreditCard';
import emailjs from '@emailjs/browser';

function CheckoutPage(props) {
  const [type, setType] = useState([""]);
  const [number, setNumber] = useState([0]);
  const [CreditCards, setCreditCards] = useState([{}])
  const [chosenCard, setChosenCard] = useState({})
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [cardInfo, setCardInfo] = useState('');
  const [movieImg, setMovieImg] = useState('')
  const [error, setError] = useState('')
  let params = useParams()
  let nav = useNavigate()
  const sendData = (cardInfo) =>{
    setCardInfo(cardInfo)

  }

  let display;
  if(props.tickets.length > 0){
    let temp = props.seats.sort(function(a, b) {
      return a - b;
    })
    console.log(props.showtime)
    console.log(temp[0].sort(function(a, b) {
      return a - b;
    }))
    display = temp[0].sort(function(a, b) {
      return a - b;
    }).join(",")
  }else{
    display = ""
  }
  let chosenCardDisplayed;
  if (chosenCard.type) {
    chosenCardDisplayed = <h1> {chosenCard.type} ending in {chosenCard.number} selected! </h1>
  }
  useEffect(()=>{
    console.log(props)
  },[])

  let price = {
    adult: 13.99,
    child: 10.99,
    senior: 6.99
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  
//   function sendEmailConfirmation() {
//   let seatString;

//   let temp1 = props.seats.sort(function(a, b) {
//     return a - b;
//   })
//   console.log(props.showtime)
//   console.log(temp1[0].sort(function(a, b) {
//     return a - b;
//   }))
//   seatString = temp1[0].sort(function(a, b) {
//     return a - b;
//   }).join(",")
  
//   emailjs.send('service_96npu8c', 'template_ddsfy0a', {'room': formatRoom(props.room), 'seats': seatString, 'showtime': props.showtime, 'email': props.user.email, 'name': props.user.firstName, 'movie': params.movie}, 'm8yxyvLLbYsPK3HRZ')
//   .then(function(response) {
//   console.log('SUCCESS!', response.status, response.text);
// }, function(error) {
//   console.log('FAILED...', error);
// });
//   }
  ////////////////////////////////////////////////////////////////////////////////////////////

  var BOOKING_FEE_PERCENTAGE = 0.0962;

  let subTotal = price["adult"] * props.tickets[0] +price["child"] * props.tickets[1] + price["senior"] * props.tickets[2]
  let total = subTotal + subTotal * BOOKING_FEE_PERCENTAGE
  total = total.toFixed(2)

  function handleSubmit() {
    console.log(chosenCard.type)
    if (chosenCard.type) {
      props.setTotal(total)
      props.setCreditCard(chosenCard.type, chosenCard.number)
      //sendEmailConfirmation();
      nav("/OrderConfirmation/" + params.movie)
    } else {
      setError("Choose Your Payment Method!")
    }
  }

  useEffect(()=>{
    (async()=>{
      if (props.tickets.length == 0) {
        nav('/')
      }
      let creditCards = []
      let numCards = 3
      for (let i = 0; i < numCards; i++) {
        creditCards.push({
          type: randomTypeOfCard(), 
          number: generateRandomLastFour()
        })
      }
      setCreditCards(creditCards)
      const result = await getMovieByTitle(params.movie)
      setMovieImg(result[0].photo_link)
    })();
  },[])

 
  return (
    <div>
      <h1 className='checkoutHeader'>Checkout Page</h1>
    <div className='header'>
       <Image className='filmImg' src={movieImg} fluid style={{ maxWidth: '300px', padding: '20px' }} />
       <div className='movieInfo'>
       <h1 className='movieTitle'> {params.movie}</h1>
       <p class="subtitle"> Showing on {formatShowtime(props.showtime)} <br></br></p>
       <h4>Room: {formatRoom(props.room)}<br></br>Seats: {display}</h4>
       </div>
    
    </div>
    <div className='movieCard'>
    <Card  style={{ width: '68rem' }}>
      <Card.Header as="h5">Order Summary</Card.Header>
      <Card.Body>
        <Card.Text>
        <div class="d-flex justify-content-between">
        <p class="fs-5">Adult x{props.tickets[0]} Child x{props.tickets[1]} Senior x{props.tickets[2]}</p>
        <p class="fs-5">${ subTotal } </p>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
        <p class="fs-5">Subtotal</p>
        <p class="fs-5"> ${subTotal}</p>
        </div>
        <div class="d-flex justify-content-between">
        <p class="fs-6">Booking Fee</p>
        <p class="fs-5"> ${(subTotal * BOOKING_FEE_PERCENTAGE).toFixed(2)} </p>
        </div>
        <div class="d-flex justify-content-between">
        <p class="fs-4">TOTAL</p>
        <p class="fs-4"> ${total} </p>
        </div>
        <p class="text-end">Includes applicable state and local sales taxes.</p>
        <hr />
        <h2 class ="error"> {error} </h2>
        <p class="fs-3">Payment Method</p>
        </Card.Text>
        <div className="d-grid gap-2">
        {chosenCardDisplayed}
        <Button variant="dark" size="lg"
        onClick={() => setOpen2(!open2)}
        aria-controls="example-collapse-text"
        aria-expanded={open2}>
          Use existing credit card
        </Button>{' '}
        <Collapse in={open2 || chosenCard}>
        <div id="example-collapse-text">
          {CreditCards.map((stuff) => (
          <button class = "tom-did-this" onClick = {() => {if (stuff.type != chosenCard.type){
            setChosenCard({type: stuff.type, number: Math.floor(stuff.number* 10000)})
          } else {
            setChosenCard({})
          }}}>
          <CreditCard type = {stuff.type} number = {stuff.number}/>
          </button>
          ))}
        </div>
        </Collapse>


        <Button variant="dark" size="lg"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}>
          Add new credit card
        </Button>
        <Collapse in={open}>
        <div id="example-collapse-text">
        <CardForm sendData = {sendData}></CardForm>
        </div>
        </Collapse>
        
        <hr />
      
        </div>
      </Card.Body>
      <br></br>
     <Button onClick = {() => handleSubmit()} className="confirmOrder" variant="dark" size="lg">
          Complete Order
        </Button>
    </Card>
    </div>
    </div>
  )
}

function formatShowtime(showtime) {
  // Edit this to look more user friendly
  console.log(showtime)
  const dayOfWeek = showtime.substring(0,3)
  const month = showtime.substring(8,11)
  const day = showtime.substring(5,7)
  const year = showtime.substring(12,16)
  let timeMin = showtime.substring(19,22)
  let timeHour = showtime.substring(17,19)

  if( (parseInt(timeHour) - 12) >= 0 ) {
    if(parseInt(timeHour) != 12) {
      timeHour = (parseInt(timeHour) - 12)
    }
    timeMin += " PM"
  } else {
    timeMin += " AM"
  }

  showtime = dayOfWeek + " " + month + "/" + day + "/" + year + " " + timeHour + timeMin
  return showtime
}

function randomTypeOfCard() {
  let rando = Math.random()

  if (rando < 0.25) {
    return "AMEX"
  } else if (rando < 0.5) {
    return "VISA"
  } else if (rando < 0.75) {
    return "MASTERCARD"
  } else {
    return "DISCOVER"
  }
}

function formatRoom(room) {
  if (room.substring(5) === "one") {
    return 1
  } 
  if (room.substring(5) === "two") {
    return 2
  } 
  if (room.substring(5) === "three") {
    return 3
  } 
  if (room.substring(5) === "four") {
    return 4
  } 
  if (room.substring(5) === "five") {
    return 5
  } 
  return 6
}

function generateRandomLastFour() {
  let random = 0
  do {
    console.log(random)
    random = Math.floor(Math.random(9999) * 10000) / 10000
  } while (random < 0.1)
  return random
}

export {CheckoutPage, formatShowtime}
