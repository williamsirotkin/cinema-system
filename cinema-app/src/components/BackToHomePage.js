import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';

export default function BackToHomePage() {
const nav = useNavigate()
    useEffect(() => {
        console.log("heelo")
        nav('/')
    })

  return (
    <div>BackToHomePage</div>
  )
}
