import React, { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import './SelectSeats.css';

const SelectedSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeat = (seatNumber) => {
    const isSelected = selectedSeats.includes(seatNumber);
    //const isDisabled = Math.random() < 0.3;
    const isDisabled = 0

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
            {selectedSeats.length === 0 ? <p>No seats selected.</p> : (
              <ul>
                {selectedSeats.map(seat => <li key={seat}>Seat {seat}</li>)}
              </ul>
            )}
            <Button href = "/orderSummary" variant="primary"> Select Seats </Button>
          </div>
        </Col>
      </Row>

    </Container>
  );
};

export default SelectedSeats;
