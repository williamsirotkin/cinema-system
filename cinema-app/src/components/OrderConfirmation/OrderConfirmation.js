
import {React, useEffect} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { formatShowtime } from '../CheckoutPage/CheckoutPage';
export default function OrderConfirmation(props) {
  let params = useParams()
  let nav = useNavigate()

  useEffect(()=>{
    (async()=>{
      console.log(props.tickets)
      if (props.tickets.length == 0) {
        nav('/')
      }
    })();
  },[])

  let display;
  console.log(props.creditCard)
  if(props.tickets.length > 0){
    console.log(props.seats)
    let temp = props.seats.sort(function(a, b) {
      return a - b;
    })
    console.log(temp)
    console.log(temp.sort(function(a, b) {
      return a - b;
    }))
    display = temp.sort(function(a, b) {
      return a - b;
    }).join(", ")
  }else{
    display = ""
  }

  let seatsArr = [];
  if (props.tickets[0] > 0) {
    seatsArr.push(<div> Adult x {props.tickets[0]}</div>)
  } 
  if (props.tickets[1] > 0) {
    seatsArr.push(<div> Child x {props.tickets[1]}</div>)
  } 
  if (props.tickets[2] > 0) {
    seatsArr.push(<div> Senior x {props.tickets[2]}</div>)
  } 

  let seats;
  seats = <div> {seatsArr.map((seat) => (seat))} </div>


  return (
    <Container className = 'container1'>
      <br></br>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className='fw-bold'>ENJOY YOUR MOVIE</h1>
          <p>You will also receive an email confirmation  with all the details</p>
          <hr />
          <h4>Your order details:</h4>
          <h5><strong>Order number:</strong> #12468</h5>
          <p><strong>Movie title:</strong>  {params.movie} </p>
          <p><strong>Date and time:</strong> {formatShowtime(props.showtime)}</p>
          <p><strong>E-Booking 4</strong> <br></br>1235 Sushi Avenue<br></br>Alpharetta,GA 30009</p>
          <p><strong>Seats:</strong> {seats} <br></br>Reserved Seating: Seat {display}</p>
          <hr />
          <h2 className='fw-bold'>Payment Summary</h2>
          <p><strong>Order total:</strong>${props.total}<br></br>Charged to {props.creditCard.type} ending in {props.creditCard.number}</p>
          <Link to  = "/"><p>Refund/Exchange</p></Link>
          <p><strong>Refundable up until 60 minutes before the screening</strong></p>
          <hr />

      <Link to  = "/"><Button variant="danger"> Return to Homepage</Button></Link>
        </Col>
      </Row>
    </Container>
  )
}