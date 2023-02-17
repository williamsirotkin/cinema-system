import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


function MainNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container className = "navbar">
        <img src = {require("../../assets/cinema-logo.png")} alt = "image" height = "60"></img>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <Navbar.Brand href="/"> E-Booking Cinema System </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="/editProfile">
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/signup"> Sign Up </NavDropdown.Item>
              <NavDropdown.Item href="/login">
                Login
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
/*
function Navbar() {
  return (
    <div>
     <nav class="navbar navbar-expand-lg bg-body-tertiary">
   <div class="container-fluid">
     <a class="navbar-brand" href="#">E-Booking</a>
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
       <div class="navbar-nav">
       <a class="nav-link active" aria-current="page" href="/">Home</a>
        <a class="nav-link" href="/orderSummary">Order Summary</a>
        <a class="nav-link" href="/editProfile">Edit Profile</a>
        <a class="nav-link" href="/orderConfirmation">Order Confirmation</a>
        <a class="nav-link" href="/addPromotions">Add Promotions</a>
        <a class="nav-link" href="/admin">Admin Page</a>
        <a class="nav-link" href="/manageMovies">Manage Movies</a>
        <a class="nav-link" href="/checkoutPage">Checkout Page</a>
        <a class="nav-link" href="/registrationConfirmationPage">Registration Confirmation Page</a>
        <a class="nav-link" href="/selectMovie">Select Movie</a>
        <a class="nav-link" href="/selectShowtime">Select Showtime</a>
        <a class="nav-link" href="/selectSeats">Select Seats</a>
        <a class="nav-link" href="/selectAges">Select Ages</a>
        <a class="nav-link" href="/login">Login</a>
        <a class="nav-link" href="/signup">Sign up</a>
       </div>
     </div>
   </div>
    </nav> 
 </div>
  );
}
*/
export default MainNavbar;