
import React, { useState } from 'react';
import './FrontEndAuth.css'

const UserRegistration=() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              },
            body: JSON.stringify({ username, password }),
            });


      if (response.status === 200) {
        setMessage('Registration successful.');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div className=".auth-container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );

}

export default UserRegistration;

//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleUsernameChange = (e) => {
//     setUserName(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//   };

//   const handleRegistration = async () => {
//     if ( password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     try {
//       const response = await fetch('/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userName, password }),
//       });

//       if (response.ok) {
//         setRegistrationSuccess(true);
//       } else {
//         setError('Registration failed.');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setError('An error occurred.');
//     }
//   };

//   return (
//     <div className='auth-container'>
//       <h1>User Registration</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {registrationSuccess ? (
//         <p>Registration successful. You can now log in.</p>
//       ) : (
//         <div>
//           <div>
//             <label> Username: </label>
//             <input type="text" value={userName} onChange={handleUsernameChange} placeholder='Enter Username'/>
//           </div>
//           <div>
//             <label>     Password: </label>
//             <input type="password" value={password} onChange={handlePasswordChange} placeholder='Enter Password'/>
//           </div>
//           <div>
//             <label> Confirm Password: </label>
//             <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Confirm Password'/>
//           </div>
//           <button onClick={handleRegistration} >Register</button>
//         </div>
//       )}
//     </div>
//   );