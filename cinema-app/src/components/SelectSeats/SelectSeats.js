import { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Image } from 'react-bootstrap';

const seats = [
  { id: 1, seatNumber: 'A1', isTaken: false },
  { id: 2, seatNumber: 'A2', isTaken: true },
  { id: 3, seatNumber: 'A3', isTaken: false },
  { id: 4, seatNumber: 'A4', isTaken: false },
  { id: 5, seatNumber: 'B1', isTaken: false },
  { id: 6, seatNumber: 'B2', isTaken: false },
  { id: 7, seatNumber: 'B3', isTaken: true },
  { id: 8, seatNumber: 'B4', isTaken: false },
  { id: 9, seatNumber: 'C1', isTaken: false },
  { id: 10, seatNumber: 'C2', isTaken: false },
  { id: 11, seatNumber: 'C3', isTaken: false },
  { id: 12, seatNumber: 'C4', isTaken: false },
  { id: 13, seatNumber: 'D1', isTaken: false },
  { id: 14, seatNumber: 'D2', isTaken: false },
  { id: 15, seatNumber: 'D3', isTaken: false },
  { id: 16, seatNumber: 'D4', isTaken: false },
];

const SelectSeats = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seat) => {
    if (!seat.isTaken) {
      setSelectedSeat(seat);
    }
  };

  const renderSeat = (seat) => {
    return (
      <Button
        key={seat.id}
        variant={selectedSeat === seat ? 'primary' : seat.isTaken ? 'secondary' : 'success'}
        onClick={() => handleSeatClick(seat)}
        style={{ margin: '5px' }}
        disabled={seat.isTaken}
      >
        {seat.seatNumber}
      </Button>
    );
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <Image src="https://www.freeiconspng.com/uploads/now-showing-cinema-movie-theatre-png-24.png" fluid style={{ maxWidth: '500px', padding: '20px' }} />
      <h1 style> Please select a seat</h1>
      <Row>
        <Col>
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black' }}>
            {['A', 'B', 'C', 'D'].map((row) => (
              <div key={row} style={{ display: 'flex', flexDirection: 'row' }}>
                {seats
                  .filter((seat) => seat.seatNumber.startsWith(row))
                  .map((seat) => renderSeat(seat))}
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SelectSeats;
