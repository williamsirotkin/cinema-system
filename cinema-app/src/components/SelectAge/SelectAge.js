import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './SelectAge.css'
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'


//should maybe be changed to decide how many tickets per age and then choose the seats rather than choose age after choosing the seats already
export default function SelectAge() {
  return (
    <div className = "select-ages-page">
      <h1 className = "select-ages">
        Select Ages 
      </h1>
      <br></br>
      <br></br>
      <div className = "select-ages">
      <h2 > <strong>Adult:</strong> &nbsp;  </h2>
      <DropdownButton id="dropdown-basic-button" title="Select">
      <Dropdown.Item> 1</Dropdown.Item>
      <Dropdown.Item> 2</Dropdown.Item>
      <Dropdown.Item> 3 </Dropdown.Item>
      <Dropdown.Item> 4</Dropdown.Item>
      <Dropdown.Item> 5 </Dropdown.Item>
    </DropdownButton>   
    </div>
    <br></br>
      <br></br>
      <div className = "select-ages">
      <h2> <strong>Child:</strong> &nbsp;  </h2>
      <DropdownButton id="dropdown-basic-button" title="Select">
      <Dropdown.Item> 1</Dropdown.Item>
      <Dropdown.Item> 2</Dropdown.Item>
      <Dropdown.Item> 3 </Dropdown.Item>
      <Dropdown.Item> 4 </Dropdown.Item>
      <Dropdown.Item> 5 </Dropdown.Item>
    </DropdownButton>   
    </div> 
    <br></br>
      <br></br>
      <div className = "select-ages">
      <h2 > <strong>Senior:</strong> &nbsp;  </h2>
      <DropdownButton id="dropdown-basic-button" title="Select">
      <Dropdown.Item> 1</Dropdown.Item>
      <Dropdown.Item> 2</Dropdown.Item>
      <Dropdown.Item> 3</Dropdown.Item>
      <Dropdown.Item> 4 </Dropdown.Item>
      <Dropdown.Item> 5</Dropdown.Item>
    </DropdownButton>   
    </div> 
    <br></br>
    <br></br>
    <Link className = "select-ages" to  = "/selectSeats"><Button variant="dark"> Choose seats </Button></Link>
      </div>
  )
}
