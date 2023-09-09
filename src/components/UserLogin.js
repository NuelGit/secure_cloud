import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuth } from './AuthProvider'
import './FrontEndAuth.css'



const UserLogin = () => {
  
  const navigate = useNavigate()
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleUsernameChange = (e) =>{
    setUsername(e.target.value)
  }
  
  const handlePasswordChange = (e) =>{
    setPassword(e.target.value)
  }
  
  const handleLogin = async () =>{
    if(!userName || !password){
      setError('Please provide both username and Passowrd')
      return
    }

    try{
      const response = await fetch ('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({userName, password})
      })

      if(response.ok){
        const userData = await response.json()
        login(userData)
        navigate('/profile')
      } else{
        setError('Invalid Username or Password')
      }

    }catch(error) {
      console.error('Error during login:', error)
    }
  }

  return (
  <div className='auth-container'>
    <h1> User Login</h1>
  {error && <p style={{ color: 'red'}}> {error}</p>}

  <div >
    <label>Username: </label>
    <input type='text' placeholder='UserName' value={userName} onChange={handleUsernameChange}/>
  </div>

  <div>

    <label>Password: </label>
    <input type='text' placeholder='Password' value={password} onChange={handlePasswordChange} />
    
  </div>

  <button onClick={handleLogin}> Login </button>
 </div>
  )
}

export default UserLogin