import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './SelectAge.css'
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'

export default function SelectAge() {
  return (
    <div className = "select-ages-page">
      <h1 className = "select-ages">
        Select Ages For Each Ticket
      </h1>
      <br></br>
      <br></br>
      <div className = "select-ages">
      <h2 > Seat A1: &nbsp;  </h2>
      <DropdownButton id="dropdown-basic-button" title="Select Age for Seat">
      <Dropdown.Item> Child</Dropdown.Item>
      <Dropdown.Item> Adult </Dropdown.Item>
      <Dropdown.Item> Senior </Dropdown.Item>
    </DropdownButton>   
    </div>
    <br></br>
      <br></br>
      <div className = "select-ages">
      <h2 > Seat A2: &nbsp;  </h2>
      <DropdownButton id="dropdown-basic-button" title="Select Age for Seat">
      <Dropdown.Item> Child</Dropdown.Item>
      <Dropdown.Item> Adult </Dropdown.Item>
      <Dropdown.Item> Senior </Dropdown.Item>
    </DropdownButton>   
    </div> 
    <br></br>
      <br></br>
      <div className = "select-ages">
      <h2 > Seat A3: &nbsp;  </h2>
      <DropdownButton id="dropdown-basic-button" title="Select Age for Seat">
      <Dropdown.Item> Child</Dropdown.Item>
      <Dropdown.Item> Adult </Dropdown.Item>
      <Dropdown.Item> Senior </Dropdown.Item>
    </DropdownButton>   
    </div> 
    <br></br>
    <br></br>
    <Link className = "select-ages" to  = "/orderSummary"><Button variant="success"> View Order and Checkout </Button></Link>
      </div>
  )
}
