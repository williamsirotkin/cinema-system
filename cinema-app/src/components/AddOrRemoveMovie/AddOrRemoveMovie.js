import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import './AddOrRemoveMovie';
import {createProfile} from '../../utility/signupUtility.js'
import {isRouteErrorResponse, useNavigate, useParams} from 'react-router-dom'
import { checkEmailInUse } from '../../utility/checkEmailInUseUtility';
import Collapse from 'react-bootstrap/Collapse';
import CardForm from "../CheckoutPage/CardForm.js";
import emailjs from '@emailjs/browser';
import {getTimesByRoomNumberUtility} from '../../utility/getTimesByRoomNumberUtility';
import { scheduleMovieAsAdminUtility } from '../../utility/scheduleMovieAsAdminUtility';
import { getMovieSchedule } from '../../utility/getMovieScheduleUtility';
import { Link } from 'react-router-dom'
import Select from 'react-select';

export default function AddOrRemoveMovie() {
let params = useParams()  
  return (
    <div className="container">
        <h1 className='register'>Schedule {params.movie} </h1>
        <br></br>
    <div className = "admin-page">
        <Link to  = {"/scheduleMovie/" + params.movie}><Button variant="primary">Add Times</Button></Link>
        &nbsp; &nbsp; &nbsp;
        <Link to  = {"/removeMovie/" + params.movie}><Button variant="secondary">Remove Times</Button></Link>
    </div>
    </div>

  )
}