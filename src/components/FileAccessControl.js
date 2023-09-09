import React, { useState } from 'react';
import { useAuth } from './AuthProvider';

const FileAccessControl =() => {
  const { currentUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [accessRights, setAccessRights] = useState({
    read: false,
    write: false,
    delete: false,
  });
  const [accessControlSuccess, setAccessControlSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAccessChange = (event) => {
    const { name, checked } = event.target;
    setAccessRights((prevAccessRights) => ({
      ...prevAccessRights,
      [name]: checked,
    }));
  };

  const handleAccessControl = async () => {
    if (!currentUser) {
      setError('You need to be logged in to manage access control.');
      return;
    }

    if (!selectedFile) {
      setError('Please select a file.');
      return;
    }

    try {
      // Perform access control logic here
      // Example: Update access control settings for the selected file
      // using API calls to your backend server

      setAccessControlSuccess(true);
    } catch (error) {
      console.error('Error during access control:', error);
      setError('An error occurred during access control.');
    }
  };

  return (
    <div>
      <h2>File Access Control</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {accessControlSuccess ? (
        <p>Access control settings updated successfully.</p>
      ) : (
        <div>
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div>
            <label>Access Rights:</label>
            <label>
              <input
                type="checkbox"
                name="read"
                checked={accessRights.read}
                onChange={handleAccessChange}
              />
              Read
            </label>
            <label>
              <input
                type="checkbox"
                name="write"
                checked={accessRights.write}
                onChange={handleAccessChange}
              />
              Write
            </label>
            <label>
              <input
                type="checkbox"
                name="delete"
                checked={accessRights.delete}
                onChange={handleAccessChange}
              />
              Delete
            </label>
          </div>
          <button onClick={handleAccessControl}>Update Access Control</button>
        </div>
      )}
    </div>
  );
}

export default FileAccessControl;
