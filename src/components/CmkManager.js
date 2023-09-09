import React, { useEffect, useState } from "react"
import axios from "axios";
import './CmkManager.css'

const CmkManager = () => {

        const [cmks, setCMKs] = useState([]);
        const [newCMK, setNewCMK] = useState('');
      
        // Fetch CMKs from the server
        useEffect(() => {
          axios.get('/api/cmk')
            .then((response) => {
              setCMKs(response.data);
            })
            .catch((error) => {
              console.error('Error fetching CMKs:', error);
            });
        }, []);
      
        // Handle CMK creation
        const handleCreateCMK = () => {
          axios.post('/api/cmk', { key: newCMK })
            .then((response) => {
              if (response.status === 200) {
                // CMK created successfully, add it to the CMKs list
                setCMKs([...cmks, response.data]);
                setNewCMK('');
              } else {
                alert('CMK creation failed. Please try again.');
              }
            })
            .catch((error) => {
              console.error('Error creating CMK:', error);
              alert('An error occurred while creating the CMK.');
            });
        };
      
        return (
          <div className="cmk-manager">
            <h2>Customer Managed Keys (CMKs)</h2>
            <div className="cmk-list">
              <h3>Available CMKs:</h3>
              <ul>
                {cmks.map((cmk, index) => (
                  <li key={index}>{cmk}</li>
                ))}
              </ul>
            </div>
            <div className="cmk-create">
              <h3>Create a New CMK:</h3>
              <input
                type="text"
                placeholder="Enter a new CMK"
                value={newCMK}
                onChange={(e) => setNewCMK(e.target.value)}
              />
              <button onClick={handleCreateCMK}>Create CMK</button>
            </div>
          </div>
        );
      }


export default CmkManager