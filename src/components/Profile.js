import React from 'react'
import { useAuth } from './AuthProvider'
import './Profile.css'

const Profile = () => {
    const currentAuthUser = useAuth()

  return (
<div className='profile-container'>
    <h1> User Profile </h1>

    {currentAuthUser ? ( 
    
    <div> 
        <p> Welcome, {currentAuthUser.username}!</p> 
        <p> Your ID: {currentAuthUser.id}</p>
    </div>

    ): ( <p>You are not logged in. Please log in to view your profile.</p>) }
    
    
</div>
  )
}

export default Profile


// const { currentUser } = useAuth();

// return (
//   <div>
//     <h2>User Profile</h2>
//     {currentUser ? (
//       <div>
//         <p>Welcome, {currentUser.username}!</p>
//         <p>Your user ID: {currentUser.id}</p>
//         {/* Display additional user information as needed */}
//       </div>
//     ) : (
//       <p>You are not logged in. Please log in to view your profile.</p>
//     )}
//   </div>
