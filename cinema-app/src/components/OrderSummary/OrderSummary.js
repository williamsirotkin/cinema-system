import { Link } from 'react-router-dom'

function OrderSummary() {
    return (
      <div className="App">
        <br></br>
        <h1>Order Summary</h1>
       <Link to  = "/"><button type="button">Homepage</button></Link>
      </div>
    );
  }
  
  export default OrderSummary;