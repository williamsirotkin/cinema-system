import logo from './logo.svg';
import './App.css';
import MainNavbar from './components/Navbar/Navbar'; 
import BackToHomePage from './components/BackToHomePage';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
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
import ResetPassword from './components/ResetPassword/ResetPassword';
import axios from 'axios';

function App() {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState('');

  function setUserData(firstName, lastName, email, role) {
    setUser({
      firstName, lastName, email, role
    })
  }

  
    useEffect(() => {
      if (!(window.location.pathname.substring(0,11)=== '/verifyEmail')) {
        let jwt = localStorage.getItem('jwt');
        console.log(localStorage.getItem('jwt'));
        if (!jwt) {
          jwt = ""
        }
        
        axios({
          url: process.env.REACT_APP_BACKEND_URL + "/profile/jwt/login", 
          data: {
              "jwt": jwt
          },
          method: "post",
          headers: {
              "Content-Type": "application/json"
          }
      })


      .then((response => {
        const firstName = response.data.firstName
        const lastName = response.data.lastName
        const email = response.data.email
        const role = response.data.role
        setUser({
          firstName, lastName, email, role
        })
        setLoggedIn(true)
        setIsLoading(false)
      }))
      .catch((error) => {
          console.log('JWT has expired');
          setIsLoading(false)
      });
      } else {
        let token = window.location.pathname.substring(13)
        
        axios({
          url: process.env.REACT_APP_BACKEND_URL + "/profile/verifyEmail/" + token, 
          method: "patch",
          headers: {
              "Content-Type": "application/json"
          }
        })
        .then((response => {
            console.log(response);
        }))
        .catch((error) => {
        })
      }
    
    }
    , []);
  
  
  if (isLoading) {
    return <div><h1>Loading Page</h1> </div>
  } else {
  return (
    <Router>
       <MainNavbar user={user} loggedIn={loggedIn}/>
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
            <RegistrationConfirmationPage firstName={user.firstName} lastName ={user.lastName} email={user.email}/>
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

      <Route path = "/resetPassword" element={
          <React.Fragment>
            <ResetPassword/>
          </React.Fragment>
      }></Route>

<Route path = "/verifyEmail/:token" element={
    <React.Fragment>
      <h1>HELLOOOO</h1>
          <BackToHomePage/>
</React.Fragment>
      }></Route>

    </Routes>

    

    </Router>
  );
    }
}


export default App;
