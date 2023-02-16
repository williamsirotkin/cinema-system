import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {Navbar as BootNav} from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

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

export default Navbar;