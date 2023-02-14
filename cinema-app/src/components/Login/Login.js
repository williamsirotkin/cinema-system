import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className="App">
     <h1>Login</h1>
     <Link to  = "/"><button type="button">Homepage</button></Link>
    </div>
  );
}

export default Login;