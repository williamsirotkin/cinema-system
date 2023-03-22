import React, { useEffect, useState } from "react";
import Results from "./Results";
import "./styles.css";
import "./CheckoutPage.css"

export default function CardForm(props) {
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [submittedData, setSubmittedData] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const [error, setError] = useState('')

    function handleSubmit(e) {
      e.preventDefault();
      if (!name) {
        setError("You must enter a cardholder name")
      } if (!cardNumber) {
        setError("You must enter a valid cardnumber")
      } if (!expiry) {
        setError("You must enter a valid expiration date in MM/YY format")
      } if (!cvc) {
        setError("You must enter a valid cvc")
      } else {
        e.preventDefault();
        setSubmittedData({ name, cardNumber, expiry, cvc });
        props.isClicked(true)
      }
    }
  useEffect(()=>{
    props.sendData(submittedData)
  })
  return (
    <form className="card-form">
      <h2 className="text-center">Credit Card Form</h2>
      <div class = "error">{error}</div>
      <div className="form-group mt-4">
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Cardholder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <div className="expiry-and-cvc-container mt-3">
          <input
            type="text"
            className="form-control expiration-date-field"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <input
            type="text"
            className="form-control cvc-field ml-3"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2 " onClick={handleSubmit}>
        Submit
      </button>
      <hr />
    </form>
  )
}
