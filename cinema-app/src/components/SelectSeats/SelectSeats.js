
import React, { Children, useState, useEffect } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom'
import { getTakenSeatsUtility } from '../../utility/getTakenSeatsUtility';
import './SelectSeats.css';

const SelectedSeats = (props) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [disabledSeats, setDisabledSeats] = useState([])
  //const [length, setLength] = useState(0)
  const [errorMsg, setErrorMsg] = useState("")
  const [length, setLength] = useState(localStorage.getItem('length') || props.adult + props.child + props.senior);
  
  console.log("bug")
  console.log(length)

  let nav = useNavigate()
  let params = useParams()
  // useEffect(()=>{
  //   (async()=>{
  //     const result = await getTakenSeatsUtility(props.room, props.showtime)
  //     console.log(result)
  //     setTakenSeats(result)
      
  //   })();
  // },[])

  useEffect(() => {
    // Calculate the new value of length based on props
    const newLength = (props.adult || 0) + (props.child || 0) + (props.senior || 0);
    console.log("newLength: " + newLength);
    console.log("length: " + length);
    // Update length only if it has changed

    if (newLength !== length && newLength !== 0) {
      setLength(newLength);
      console.log("hello")
      localStorage.setItem('length', newLength);
    }
    if (!length){
      nav('/')
    }

  }, [props.adult, props.child, props.senior]); // Only run effect when these props change
  
  const handleSubmit = () =>{
     console.log(selectedSeats.length)
    if (selectedSeats.length != length){
      setErrorMsg("Please select the appropiate number of tickets you chose")
    }else{
      props.handleSeatsSelected(selectedSeats)
      nav('/orderSummary/' + params.movie,{replace:"true"})
      
    }
  }
  useEffect(()=>{
    setErrorMsg("")
  },[selectedSeats.length])

  const handleSeatClick = async (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    if (selectedSeats.length == length - 1) {
      let temp = []
      for (let i =1 ; i <= 38; i++) {
        if (!selectedSeats.includes(i) && i != seatNumber) {
          temp.push(i)
        }
      }
      setDisabledSeats(temp)
    } else {
      setDisabledSeats([1, 2, 3])
    }
  };
  useEffect(()=> {
    getTaken()
  },[])
  async function getTaken() {
    const takenSeats = await getTakenSeatsUtility(props.room, props.showtime);
    const incrementedSeats = takenSeats.map(seat => seat + 1);
    setTakenSeats(incrementedSeats);
  }
  // async function getTaken() {
  //   setTakenSeats(await getTakenSeatsUtility(props.room, props.showtime))
  // }

  const renderSeat =  (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);
    let isDisabled = takenSeats.includes(seatNumber)
    if (selectedSeats.length == length && !selectedSeats.includes(seatNumber)) {
      isDisabled = true
    }
    //let disabledSeats = await getTakenSeatsUtility(props.room, props.showtime)

    return (
      <Button
        key={seatNumber}
        variant={isSelected ? 'primary' : 'outline-secondary'}
        onClick={() => handleSeatClick(seatNumber)}
        disabled={isDisabled}
        className={`seat ${isDisabled ? 'disabled' : ''}`}
      >
        {seatNumber}
      </Button>
    );
  };

  const renderSeatRow = (startSeatNumber, numberOfSeats) => {
    const seats = [];
    for (let i = 0; i < numberOfSeats; i++) {
      seats.push(renderSeat(startSeatNumber + i));
    }
    return (
      <ButtonGroup aria-label={`Seats ${startSeatNumber} - ${startSeatNumber + numberOfSeats - 1}`}>
        {seats}
      </ButtonGroup>
    );
  };

  return (
    <Container className="seat-selection-container">
      <Row>
        <Col>
          <h2>Select your seats</h2>
          <p>Click on a seat to select it. Disabled seats cannot be selected.</p>
          <div className="seat-grid">
            <div className="screen">SCREEN</div>
            <div className="seats">
              <div className="seat-row">{renderSeatRow(1, 6)}</div>
              <div className="seat-row">{renderSeatRow(7, 8)}</div>
              <div className="seat-row">{renderSeatRow(15, 10)}</div>
              <div className="seat-row">{renderSeatRow(25, 8)}</div>
              <div className="seat-row">{renderSeatRow(33, 6)}</div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="selected-seats">
            <h3>Your selected seats</h3>
            <h3 className='error'>{errorMsg}</h3>
            {selectedSeats.length === 0 ? <p>No seats selected.</p> : (
              <ul>
                {selectedSeats.map(seat => <li key={seat}>Seat {seat}</li>)}
              </ul>
            )}
            <Button variant="primary" onClick={handleSubmit}> Select Seats </Button>
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default SelectedSeats;
