import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHomePage() {
  return (
    <div>
        <h1>Admin Homepage</h1>
     <Link to  = "/"><button type="button">Homepage</button></Link>
    </div>
  )
}
