import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {

  return (
    <header className='header'>
        <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/upload">File Upload</Link></li>
          </ul>

        </nav>
    </header>
  )
}

export default Header