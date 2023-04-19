import React, { useEffect, useState } from "react";
import Results from "./Results";
import "./styles.css";
import "./CreditCard.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreditCard(props) {
  return (
    <div>
          <button className="credit-card-btn">
          <div className="card-type">{props.type}</div>
          <div className="last-four">**** **** **** {Math.floor(props.number * 10000)}</div>
          </button>
    </div>
  )
}
