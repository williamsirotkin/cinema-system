import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './SelectAge.css'
import { Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'




const SelectAge = () => {
  const [selectedItem1, setSelectedItem1] = useState('');
  const [selectedItem2, setSelectedItem2] = useState('');
  const [selectedItem3, setSelectedItem3] = useState('');

  const handleSelect1 = (eventKey) => {
      setSelectedItem1(eventKey);
  };

  const handleSelect2 = (eventKey) => {
    setSelectedItem2(eventKey);
};
const handleSelect3 = (eventKey) => {
  setSelectedItem3(eventKey);
};


  return (
    <div>
    <h1 className = "center" > Select Ages For Tickets </h1>
    <br></br>
    <br></br>
    <div className = "center">
    <h3 className = "center"> Ticket A1: </h3>
    &nbsp; &nbsp; &nbsp; &nbsp;
    <Dropdown className = "center" onSelect={handleSelect1}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selectedItem1 ? selectedItem1 : 'Select Age '}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Child"> Child </Dropdown.Item>
        <Dropdown.Item eventKey="Adult"> Adult </Dropdown.Item>
        <Dropdown.Item eventKey="Senior"> Senior </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
    <br></br>
    <br></br>
    <div className = "center">
    <h3 className = "center"> Ticket A2: </h3>
    &nbsp; &nbsp; &nbsp; &nbsp;
    <Dropdown className = "center" onSelect={handleSelect2}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selectedItem2 ? selectedItem2 : 'Select Age '}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Child"> Child </Dropdown.Item>
        <Dropdown.Item eventKey="Adult"> Adult </Dropdown.Item>
        <Dropdown.Item eventKey="Senior"> Senior </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
    <br></br>
    <br></br>
    <div className = "center">
    <h3 className = "center"> Ticket A3: </h3>
    &nbsp; &nbsp; &nbsp; &nbsp;
    <Dropdown className = "center" onSelect={handleSelect3}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {selectedItem3 ? selectedItem3 : 'Select Age '}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Child"> Child </Dropdown.Item>
        <Dropdown.Item eventKey="Adult"> Adult </Dropdown.Item>
        <Dropdown.Item eventKey="Senior"> Senior </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
    <br></br>
    <br></br>
    <div  className = "center"><Button href = "/orderSummary" variant="success"> Order Summary and Checkout </Button></div>
    </div>
  );
};

export default SelectAge;

/*
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
*/