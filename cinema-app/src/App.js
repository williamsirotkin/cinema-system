import logo from './logo.svg';
import './App.css';
import MainNavbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import React,{useState, useEffect} from 'react';
import Login from './components/Login/Login';
import OrderSummary from './components/OrderSummary/OrderSummary';
import AdminHomePage from './components/AdminHomePage/AdminHomePage';
import EditProfile from './components/EditProfile/EditProfile';
import AddPromotions from './components/AddPromotions/AddPromotions';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import ManageMovies from './components/ManageMovies/ManageMovies';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import RegistrationConfirmationPage from './components/RegistrationConfirmationPage/RegistrationConfirmationPage';
import SelectAge from './components/SelectAge/SelectAge';
import SelectMovie from './components/SelectMovie/SelectMovie';
import SelectSeats from './components/SelectSeats/SelectSeats';
import SelectShowtime from './components/SelectShowtime/SelectShowtime';
import Homepage from './components/Homepage/Homepage';
import Signup from './components/Signup/Signup';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const setUserData = (firstName, lastName, email)=>{
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(email)
  }
  
  return (
    <Router>
       <MainNavbar />
    <Routes>

    <Route path = "/" element={
      <React.Fragment> 
        <Homepage/>
      </React.Fragment>
    }></Route>

      <Route path = "/login" element={
          <React.Fragment>
            <Login/>
          </React.Fragment>
      }></Route>

      <Route path = "/orderSummary" element={
          <React.Fragment>
            <OrderSummary/>
          </React.Fragment>
      }></Route>

      <Route path ="/editProfile" element={
         <React.Fragment>
         <EditProfile/>
       </React.Fragment>

      }></Route>


      <Route path = "/admin" element={
          <React.Fragment>
            <AdminHomePage/>
          </React.Fragment>
      }></Route>
      
      <Route path = "/addPromotions" element={
          <React.Fragment>
            <AddPromotions/>
          </React.Fragment>
      }></Route>

    <Route path = "/orderConfirmation" element={
          <React.Fragment>
            <OrderConfirmation/>
          </React.Fragment>
      }></Route>

      <Route path = "/manageMovies" element={
          <React.Fragment>
            <ManageMovies/>
          </React.Fragment>
      }></Route>

      <Route path = "/checkoutPage" element={
          <React.Fragment>
            <CheckoutPage/>
          </React.Fragment>
      }></Route>

        <Route path = "/registrationConfirmationPage" element={
          <React.Fragment>
            <RegistrationConfirmationPage firstName={firstName} lastName ={lastName} email={email}/>
          </React.Fragment>
      }></Route>

    <Route path = "/selectMovie" element={
          <React.Fragment>
            <SelectMovie/>
          </React.Fragment>
      }></Route>

      <Route path = "/selectShowtime" element={
          <React.Fragment>
            <SelectShowtime/>
          </React.Fragment>
      }></Route>

        <Route path = "/selectSeats" element={
          <React.Fragment>
            <SelectSeats/>
          </React.Fragment>
      }></Route>

        <Route path = "/selectAges" element={
          <React.Fragment>
            <SelectAge/>
          </React.Fragment>
      }></Route>
      <Route path = "/signup" element={
          <React.Fragment>
            <Signup setUserData={setUserData}/>
          </React.Fragment>
      }></Route>

    </Routes>

    

    </Router>
  );
}

export default App;
