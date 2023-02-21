import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './SelectAge.css'
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'


//should maybe be changed to decide how many tickets per age and then choose the seats rather than choose age after choosing the seats already
export default function SelectAge() {
  const[childTickets, setChildTickets] = useState(0)
  const[adultTickets, setAdultTickets] = useState(0)
  const[seniorTickets, setSeniorTickets] = useState(0)

  const handleTicketChange = (age, change) => {
    if (age == "child") {
      setChildTickets(Math.max(childTickets + change, 0))
    }
    if (age == "adult") {
      setAdultTickets(Math.max(adultTickets + change, 0))
    }
    if (age == "senior") {
      setSeniorTickets(Math.max(seniorTickets + change, 0))
    }
  }

  return (
    <div className = "select-ages-page">
      <h1 className = "select-ages">
        Select Ages 
      </h1>
      <br></br>
      <br></br>
      <div className = "select-ages">
      <h2 > <strong>Adult:</strong> &nbsp;&nbsp;  </h2>
      <Button variant="primary" onClick={() => handleTicketChange("adult", -1)}> - </Button>
        <h2>&nbsp;{adultTickets}&nbsp;</h2>
      <Button variant="primary" onClick={() => handleTicketChange("adult", 1)}> + </Button>
    </div>
    <br></br>
      <br></br>
      <div className = "select-ages">
      <h2><strong>Child:</strong> &nbsp;&nbsp; </h2>
      <Button variant="primary" onClick={() => handleTicketChange("child", -1)}> - </Button>
      <h2>&nbsp;{childTickets}&nbsp;</h2>
      <Button variant="primary" onClick={() => handleTicketChange("child", 1)}> + </Button>
    </div> 
    <br></br>
      <br></br>
      <div className = "select-ages">
      <h2><strong>Senior:</strong> &nbsp; </h2>
      <Button variant="primary" onClick={() => handleTicketChange("senior", -1)}> - </Button>
      <h2>&nbsp;{seniorTickets}&nbsp;</h2>
      <Button variant="primary" onClick={() => handleTicketChange("senior", 1)}> + </Button>
    </div> 
    <br></br>
    <br></br>
    <Link className = "select-ages" to  = "/selectSeats"><Button variant="dark"> Choose seats </Button></Link>
      </div>
  )
}
