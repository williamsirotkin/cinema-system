import logo from './logo.svg';
import './App.css';
import MainNavbar from './components/Navbar/Navbar'; 
import EmailConfirmationPage from './components/EmailConfirmationPage/EmailConfirmationPage';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import React,{useState, useEffect} from 'react';
import Login from './components/Login/Login';
import OrderSummary from './components/OrderSummary/OrderSummary';
import AdminHomePage from './components/AdminHomePage/AdminHomePage';
import EditProfile from './components/EditProfile/EditProfile';
import AddPromotions from './components/AddPromotions/AddPromotions';
import ManageUsers from './components/ManageUsers/ManageUsers';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import ManageMovies from './components/ManageMovies/ManageMovies';
import {CheckoutPage} from './components/CheckoutPage/CheckoutPage';
import RegistrationConfirmationPage from './components/RegistrationConfirmationPage/RegistrationConfirmationPage';
import SelectAge from './components/SelectAge/SelectAge';
import SelectMovie from './components/SelectMovie/SelectMovie';
import SelectSeats from './components/SelectSeats/SelectSeats';
import SelectShowtime from './components/SelectShowtime/SelectShowtime';
import Homepage from './components/Homepage/Homepage';
import Signup from './components/Signup/Signup';
import EditMovie from './components/EditMovie/EditMovie';
import ResetPassword from './components/ResetPassword/ResetPassword';
import {getMoviesUtility} from './utility/getMoviesUtility.js';
import {jwtLoginUtility} from './utility/jwtLoginUtility.js';
import ScheduleMoviePage from './components/ScheduleMoviePage/ScheduleMoviePage';
import AddOrRemoveMovie from './components/AddOrRemoveMovie/AddOrRemoveMovie';
import RemoveMoviesPage from './components/RemoveMoviesPage/RemoveMoviesPage';
import axios from 'axios';
import OrderHistory from './components/orderHistory/OrderHistory';

function App() {
  const [user, setUser] = useState('');
  const [movies, setMovies] = useState('')
  const [showingNow, setShowingNow] = useState('');
  const [comingSoon, setComingSoon] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState('');
  const [movieRoom, setMovieRoom] = useState('')
  const [movieShowtime, setMovieShowtime] = useState('')
  const [seats,setSeats] = useState([])
  const [tickets,setTickets] = useState([])
  const [seatsSelected,setSeatSelected] = useState()
  const [total, setTotal] = useState()
  const [creditCard, setCreditCard] = useState({})
  const [promo, setPromo] = useState('')
  const [promoValue, setPromoValue] = useState(0)

  const setPromoFunc = (promo) => {
    setPromo(promo)
  }

  const setPromoValueFunc = (promoValue) => {
    setPromoValue(promoValue)
  }

  const setUserData = (firstName, lastName, email, admin, birthday, card_info, active, billing_address, promos) => {

    setUser({
      firstName, lastName, email, admin, birthday, card_info, active, billing_address, promos
    })
    
  }
  const setSeatAmount = (adultSeats,childSeats, seniorSeats) => {
    setSeats([adultSeats,childSeats,seniorSeats])
    
  }
  const setTotalFunc = (total) => {
    setTotal(total)
    
  }
  const setCreditCardFunc = (type, number) => {
    setCreditCard({type: type, number: number})
    
  }
  
  const setSeatsFunc = (someSeats) => {
    setSeats([someSeats])
    
  }

  const setTicketsFunc = (adult, child, senior) => {
    setTickets([adult, child, senior])
  }

  const handleSeatsSelected = (seatsSelected) => {
    setSeatSelected(seatsSelected)
    
  }
  // useEffect(()=>{
  //   console.log(seats)
  // },[seats])

  function setMovieRoomFunc(room) {
    setMovieRoom(room)
  }

  function setMovieShowtimeFunc(showtime) {
    setMovieShowtime(showtime)
  }


  function setMoviesFunc(movies) {
    setMovies(movies)
  }

  useEffect(() => {
    async function stuff() {
    if (!(window.location.pathname.substring(0,12)=== '/verifyEmail')) {
      let profile = await jwtLoginUtility()
      if (profile) {
        setUserData(
          profile.firstName, profile.lastName, profile.email, profile.admin, profile.birthday, profile.card_info, profile.active, profile.billing_address, profile.promos
        )
        setLoggedIn(true)
      } else {
        console.log('JWT has expired');
      }
      setIsLoading(false)
    
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
          setIsLoading(false)
          console.log(response);
      }))
      .catch((error) => {
        console.log(error)
      })
    }
  }
  stuff()
  }, []);


  
  useEffect(() => {
    async function jwtStuff() {
      let profile = await jwtLoginUtility()
      if (profile) {
        setUserData(
          profile.firstName, profile.lastName, profile.email, profile.admin, profile.birthday,profile.card_info, profile.active, profile.billing_address, profile.promos
        )
        setLoggedIn(true)
      } else {
        console.log('JWT has expired');
      }
      setIsLoading(false)
  }
  jwtStuff()
  }, []);

  useEffect(() => {
    async function setMovieStuff() {
      setShowingNow(await getMoviesUtility("Showing"))
      setComingSoon(await getMoviesUtility("Soon"))
    }
    setMovieStuff()
  } ,[])
  
  if (isLoading || !showingNow || !comingSoon) {
    return <div><h1>Loading Page</h1> </div>
  } else {
  return (
    <Router>
       <MainNavbar user={user} loggedIn={loggedIn} setMovies={setMoviesFunc}/>
    <Routes>

    <Route path = "/" element={
      <React.Fragment> 
        <Homepage user = {user} showingNow = {showingNow} comingSoon = {comingSoon} loggedIn={loggedIn} setMovies={setMoviesFunc}/>
      </React.Fragment>
    }></Route>

      <Route path = "/login" element={
          <React.Fragment>
            <Login/>
          </React.Fragment>
      }></Route>

      <Route path = "/login/:title" element={
        <React.Fragment>
          <Login/>
        </React.Fragment>
      }></Route>

      <Route path = "/orderSummary/:movie" element={
          <React.Fragment>
            <OrderSummary setPromoFunc = {setPromoFunc} setPromoValueFunc = {setPromoValueFunc} adult ={seats[0]} child={seats[1]} senior={seats[2]} seats = {seatsSelected} setSeats = {setSeatsFunc} setTickets = {setTicketsFunc}/>
          </React.Fragment>
      }></Route>

      <Route path ="/editProfile" element={
         <React.Fragment>
         <EditProfile user={user}/>
       </React.Fragment>

      }></Route>
       <Route path ="/orderHistory" element={
         <React.Fragment>
         <OrderHistory user={user}/>
       </React.Fragment>

      }></Route>


      <Route path = "/admin" element={
          <React.Fragment>
            <AdminHomePage user = {user} />
          </React.Fragment>
      }></Route>
      
      <Route path = "/addPromotions" element={
          <React.Fragment>
            <AddPromotions user = {user} />
          </React.Fragment>
      }></Route>

      <Route path = "/manageUsers" element={
          <React.Fragment>
            <ManageUsers user = {user} />
          </React.Fragment>
      }></Route>

      <Route path = "/orderConfirmation/:movie" element={
          <React.Fragment>
            <OrderConfirmation total = {total} creditCard = {creditCard} adult ={seats[0]} child={seats[1]} senior={seats[2]} seats = {seatsSelected} tickets = {tickets} showtime = {movieShowtime} room = {movieRoom}/>
          </React.Fragment>
      }></Route>

      <Route path = "/manageMovies" element={
          <React.Fragment>
            <ManageMovies user = {user} movies={movies} setMovies={setMoviesFunc}/>
          </React.Fragment>
      }></Route>

      <Route path = "/checkoutPage/:movie" element={
          <React.Fragment>

            <CheckoutPage user = {user} promo = {promo} promoValue = {promoValue} setTotal = {setTotalFunc} setCreditCard = {setCreditCardFunc} room = {movieRoom} seats={seats} adult ={seats[0]} child={seats[1]} senior={seats[2]} tickets = {tickets} showtime = {movieShowtime}/>
          </React.Fragment>
      }></Route>

        <Route path = "/registrationConfirmationPage" element={
          <React.Fragment>
            <RegistrationConfirmationPage firstName={user.firstName} lastName ={user.lastName} email={user.email}/>
          </React.Fragment>
      }></Route>

    <Route path = "/selectMovie/filter/:filter" element={
          <React.Fragment>
            <SelectMovie user = {user} comingSoon = {comingSoon} movies={movies} setMovies={setMoviesFunc} admin = {user.admin} loggedIn={loggedIn}/>
          </React.Fragment>
      }></Route>

<Route path = "/selectMovie/showingNow" element={
          <React.Fragment>
            <SelectMovie user = {user} movies={showingNow} setMovies={setMoviesFunc}loggedIn={loggedIn}/>
          </React.Fragment>
      }></Route>

<Route path = "/selectMovie/comingSoon" element={
          <React.Fragment>
            <SelectMovie user = {user} movies={comingSoon} setMovies={setMoviesFunc} />
          </React.Fragment>
      }></Route>

      <Route path = "/selectShowtime/:movieTitle" element={
          <React.Fragment>
            <SelectShowtime user = {user} setMovieRoomFunc = {setMovieRoomFunc} setMovieShowtimeFunc = {setMovieShowtimeFunc} />
          </React.Fragment>
      }></Route>

        <Route path = "/selectSeats/:movie" element={
          <React.Fragment>
            <SelectSeats child={seats[0]} adult ={seats[1]} senior={seats[2]} room = {movieRoom} showtime = {movieShowtime} handleSeatsSelected={handleSeatsSelected}/>

          </React.Fragment>
      }></Route>

        <Route path = "/selectAges/:movie" element={
          <React.Fragment>
            <SelectAge setSeats ={setSeatAmount} />
          </React.Fragment>
      }></Route>
      <Route path = "/signup" element={
          <React.Fragment>
            <Signup setUserData={setUserData}/>
          </React.Fragment>
      }></Route>
      <Route path = "/editmovie" element={
          <React.Fragment>
            <EditMovie user = {user}/>
          </React.Fragment>
      }></Route>

      <Route path = "/resetPassword/:token" element={
          <React.Fragment>
            <ResetPassword/>
          </React.Fragment>
      }></Route>

<Route path = "/verifyEmail/:token" element={
    <React.Fragment>
          <EmailConfirmationPage/>
    </React.Fragment>
      }></Route>

<Route path = "/scheduleMovie/:movie" element={
    <React.Fragment>
          <ScheduleMoviePage user = {user} showingNow = {showingNow}/>
    </React.Fragment>
      }></Route>

  <Route path = "/addOrRemoveMovie/:movie" element={
    <React.Fragment>
          <AddOrRemoveMovie user = {user} />
    </React.Fragment>
      }></Route>

<Route path = "/removeMovie/:movie" element={
    <React.Fragment>
          <RemoveMoviesPage user = {user} showingNow = {showingNow}/>
    </React.Fragment>
      }></Route>
    </Routes>

    

    </Router>
  );
    }
}


export default App;
