import { Link } from 'react-router-dom'
import {useNavigate, useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './OrderSummary.css'
import React, { useState, useEffect } from 'react';
import { round } from 'lodash';
import SelectedSeats from '../SelectSeats/SelectSeats';


function OrderSummary(props) {
  let nav = useNavigate()
  let params = useParams()

  let priceMap = {
    adult: 13.99,
    child: 10.99, 
    senior: 6.99
  }

  var BOOKING_FEE_PERCENTAGE = 0.0962;

  const[total, setTotal] = useState(props.adult * 13.99 + props.child * 10.99 + props.senior * 6.99)

  console.log("total: " + total);

  if (isNaN(total)) {
    nav('/')
  }

  const [tickets, setTickets] = useState([
    // { id: 2, name: 'Ticket', type: "Adult", price: 13.99},
    // { id: 3, name: 'Ticket', type: "Adult", price: 13.99},
  ]);

  useEffect(() => {
    formatTickets()
  }, [])

  function formatTickets()  {
    let count = 0
    let tempTickets = []
    let seatSet = new Set()
    for (let i = 0; i < props.adult; i++) {
      let tempTicket = { id: Math.floor(Math.random() * 1000000), name: 'Ticket', seats: props.seats[count], type: "Adult", price: priceMap["adult"]}
      if (!seatSet.has(tempTicket.seats)) {
        setTickets((prevState) => {
          const ticketExists = prevState.find((ticket) => ticket.seats === tempTicket.seats);
        
          if (!ticketExists) {
            return [...prevState, tempTicket];
          } else {
            return prevState;
          }
        });
        seatSet.add(tempTicket.seats)
      }
      console.log(tickets)
      count++;
    }
    console.log(tickets)
    for (let i = 0; i < props.child; i++) {
      let tempTicket = { id:  Math.floor(Math.random() * 1000000), name: 'Ticket', seats: props.seats[count], type: "Child", price: priceMap["child"]}
      if (!seatSet.has(tempTicket.seats)) {
        setTickets((prevState) => {
          const ticketExists = prevState.find((ticket) => ticket.seats === tempTicket.seats);
        
          if (!ticketExists) {
            return [...prevState, tempTicket];
          } else {
            return prevState;
          }
        });
        seatSet.add(tempTicket.seats)
      }
      count++;
    }
    for (let i = 0; i < props.senior; i++) {
      let tempTicket = { id:  Math.floor(Math.random() * 1000000), name: 'Ticket', seats: props.seats[count], type: "Senior", price: priceMap["senior"]}
      if (!seatSet.has(tempTicket.seats)) {
        setTickets((prevState) => {
          const ticketExists = prevState.find((ticket) => ticket.seats === tempTicket.seats);
        
          if (!ticketExists) {
            return [...prevState, tempTicket];
          } else {
            return prevState;
          }
        });
        seatSet.add(tempTicket.seats)
      }
      count++;
    }

    console.log(tickets)
    console.log(tickets.length)
    props.setTickets(props.adult, props.child, props.senior)
  }

  const handleDelete = (id) => {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].id == id) {
        setTotal(total - round(tickets[i].price ,2));
      }
    }
    let deletedType = ""
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i].id == id) {
        deletedType = tickets[i].type
      }
    }
    console.log(deletedType)
    const updatedTickets = tickets.filter(ticket =>
      ticket.id !== id
    );
    setTickets(updatedTickets);
    let newArray = [...tickets].filter((ticket) => ticket.id !== id)
    newArray = newArray.map(obj => {
      if (id != obj.id)
      {
        return obj.seats
      } else {
        return -1
      }
    });

    props.setTickets(newArray)
    if (deletedType == "Adult") {
      console.log(props.adult, props.child, props.senior)
      console.log(props.seats)
      console.log(props.tickets)
      props.setTickets(props.adult - 1, props.child, props.senior)
    }
    if (deletedType == "Child") {
      props.setTickets(props.adult, props.child - 1, props.senior)
    }
    if (deletedType == "Senior") {
      props.setTickets(props.adult, props.child, props.senior - 1)
    }
    console.log(newArray)
  };
  if (tickets) {
    return (
      <div className = "movieCard">
        <br></br>
        <Card  style={{ width: '68rem' }}>
      <Card.Header as="h5">Order Summary</Card.Header>
      <Card.Body>
        <Card.Text>
        {tickets.map(ticket => (
        <div key={ticket.id}>
          <span>{"Seat "} {ticket.seats} &nbsp;{ticket.type}&nbsp;-&nbsp;{ticket.price}</span>
          &nbsp;
          <Button  onClick={() => handleDelete(ticket.id)} variant="danger" size="sm">Delete </Button>
          <br></br>
          <br></br>
        </div>
      ))}
        <br></br>
        <Link to  = "/selectMovie"><Button  className="confirmOrder" variant="dark" size="lg">Add to Order</Button> </Link>
        <hr />
        <div class="d-flex justify-content-between">
        <p class="fs-5">Subtotal</p>
        <p class="fs-5">${parseFloat(total, 2).toFixed(2)}</p>
        </div>

        <div class="d-flex justify-content-between">
        <p class="fs-6">Booking Fee</p>
        <p class="fs-5">${parseFloat(total * BOOKING_FEE_PERCENTAGE, 2).toFixed(2)}</p>
        </div>
        <div class="d-flex justify-content-between">
        <p class="fs-4">TOTAL</p>
        <p class="fs-4">${parseFloat(total + total * BOOKING_FEE_PERCENTAGE, 2).toFixed(2)}</p>
        
        </div>
        <div class="promo-bar">
            <div class="input-group" >
            <input type="promo" class="form-control rounded" placeholder="Enter Promo Code" aria-label="Promo" aria-describedby="promo-addon" />
            <button type="button" class="btn btn-primary">Enter</button>
            </div>
        </div>
        <p class="inline-right">Includes applicable state and local sales taxes.</p>
        <hr/>
        </Card.Text>
      </Card.Body>
      <br></br>
      <Button  onClick = {() => {
        let newArray = tickets
        newArray = newArray.map(obj => {
            return obj.seats
        });
    
        props.setSeats(newArray)
        nav('/checkoutPage/' + params.movie)
      }} className="confirmOrder" variant="primary" size="lg">
          Checkout 
        </Button>{' '}
    </Card>
      </div>
    );
        } else {
          return <h1> Loading Page... </h1>
        }
  }
  
  export default OrderSummary;