import { Link } from 'react-router-dom'

function OrderSummary() {
    return (
      <div>
        <br></br>
        <h1>Order Summary</h1>
       <Link to  = "/checkoutPage"><button type="button">Checkout</button></Link>
      </div>
    );
  }
  
  export default OrderSummary;