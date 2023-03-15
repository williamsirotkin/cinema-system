import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BsSearch} from "react-icons/bs";


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

          <div class="search-bar" >
            <div class="input-group" >
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <button type="button" class="btn btn-primary">
            <BsSearch/>
            </button>
            </div>
          </div>

            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/selectMovie"> Booking </Nav.Link>
            <Nav.Link href="/orderSummary"> My Cart </Nav.Link>
            <NavDropdown title="Every Page" id="basic-nav-dropdown">
            <NavDropdown.Item href="/addPromotions"> Add Promotions </NavDropdown.Item>
              <NavDropdown.Item href="/admin"> Admin Page </NavDropdown.Item>
              <NavDropdown.Item href="/checkoutPage"> Checkout Page </NavDropdown.Item>
              <NavDropdown.Item href="/editProfile"> Edit Profile </NavDropdown.Item>
              <NavDropdown.Item href="/"> Homepage </NavDropdown.Item>
              <NavDropdown.Item href="/login"> Login </NavDropdown.Item>
              <NavDropdown.Item href="/manageMovies"> Manage Movies </NavDropdown.Item>
              <NavDropdown.Item href="/orderConfirmation"> Order Confirmation </NavDropdown.Item>
              <NavDropdown.Item href="/orderSummary"> Order Summary </NavDropdown.Item>
              <NavDropdown.Item href="/registrationConfirmationPage"> Registration Confirmation </NavDropdown.Item>
              <NavDropdown.Item href="/selectAges"> Select Age </NavDropdown.Item>
              <NavDropdown.Item href="/selectMovie"> Select Movie </NavDropdown.Item>
              <NavDropdown.Item href="/selectShowtime"> Select Showtime </NavDropdown.Item>
              <NavDropdown.Item href="/signup"> Signup </NavDropdown.Item>
            </NavDropdown>
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