import React, {useEffect, useState} from 'react'
import { Link, useParams} from 'react-router-dom'
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

export default function CheckoutPage(props) {
  const [type, setType] = useState("");
  const [number, setNumber] = useState(0);
  const [chosenCard, setChosenCard] = useState(false)
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [cardInfo, setCardInfo] = useState('');
  const [movieImg, setMovieImg] = useState('')
  let params = useParams()
  const sendData = (cardInfo) =>{
    setCardInfo(cardInfo)

  }
  let display;
  if(props.tickets){
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
  if (chosenCard) {
    chosenCardDisplayed = <h1> {type} ending in {number * 10000} selected! </h1>
  }
  useEffect(()=>{
    console.log(props)
  },[])

  let price = {
    adult: 13.99,
    child: 10.99,
    senior: 6.99
  }

  var BOOKING_FEE_PERCENTAGE = 0.0962;

  let subTotal = price["adult"] * props.tickets[0] +price["child"] * props.tickets[1] + price["senior"] * props.tickets[2]
  let total = subTotal + subTotal * BOOKING_FEE_PERCENTAGE
  total = total.toFixed(2)
  useEffect(()=>{
    (async()=>{
      setType(randomTypeOfCard())
      setNumber(Math.floor(Math.random(9999) * 10000)/ 10000)
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
       <p class="subtitle"> Showing on {formatShowtime(props.showtime)} <br></br><b>E-cinema 4</b></p>
       <h4>Screen: 10<br></br>Seats: {display}</h4>
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
          <button class = "tom-did-this" onClick = {() => setChosenCard(!chosenCard)}>
          <CreditCard type = {type} number = {number}/>
          </button>
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
      <Link to  = "/OrderConfirmation"><Button  className="confirmOrder" variant="dark" size="lg">
          Complete Order
        </Button>{' '}</Link>
    </Card>
    </div>
    </div>
  )
}

function formatShowtime(showtime) {
  // Edit this to look more user friendly
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
