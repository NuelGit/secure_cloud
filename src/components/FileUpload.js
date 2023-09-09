import React, { useState } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import './FileUpload.css'

const FileUpload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState(''); // AES encryption key
  const [publicKey, setPublicKey] = useState(''); // RSA public key

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEncryptionKeyChange = (event) => {
    setEncryptionKey(event.target.value);
  };

  const handlePublicKeyChange = (event) => {
    setPublicKey(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !encryptionKey || !publicKey) {
      alert('Please select a file, provide an AES encryption key, and a recipient RSA public key.');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async (event) => {
      const fileData = event.target.result;

      // Generate a random AES key
      const aesKey = CryptoJS.lib.WordArray.random(16); // 128 bits (16 bytes)

      // Encrypt the file using AES
      const encryptedFile = CryptoJS.AES.encrypt(fileData, aesKey, {
        mode: CryptoJS.mode.CFB, // Use the CFB mode
      });

      // Encrypt the AES key using RSA
      const rsaEncryptedAesKey = crypto.publicEncrypt(publicKey, aesKey.toString(CryptoJS.enc.Utf8));

      // Convert the encrypted file and AES key to base64
      const encryptedFileBase64 = encryptedFile.toString(CryptoJS.enc.Base64);
      const encryptedAesKeyBase64 = rsaEncryptedAesKey.toString('base64');

      // Send the encrypted file and AES key to the server
      try {
        const response = await axios.post('/api/upload', {
          encryptedFile: encryptedFileBase64,
          encryptedAesKey: encryptedAesKeyBase64,
        });

        if (response.status === 200) {
          alert('File uploaded successfully.');
        } else {
          alert('File upload failed. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file.');
      }
    };

    fileReader.readAsDataURL(selectedFile);
  };

  return (
    <div className='container'>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <br />
      <input
        type="text"
        placeholder="AES Encryption Key"
        value={encryptionKey}
        onChange={handleEncryptionKeyChange}
      />
      <br />
      <textarea
        placeholder="Recipient's RSA Public Key"
        value={publicKey}
        onChange={handlePublicKeyChange}
      />
      <br />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
    
}

export default FileUpload

//     const [selectedFile, setSelectedFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadMessage, setUploadMessage] = useState('');

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       return;
//     }

//     try {
//       setUploading(true);

//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//           setUploadProgress(progress);
//         },
//       });

//       if (response.status === 201) {
//         setUploadMessage('File uploaded successfully.');
//       }
//     } catch (error) {
//       console.error('Error during file upload:', error);
//       setUploadMessage('File upload failed. Please try again.');
//     } finally {
//       setUploading(false);
//       setSelectedFile(null);
//     }
//   };
//   return (

//     <div className='file-upload-container'>
//     <h1>File Upload</h1>
//       <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
//       <button onClick={handleFileUpload} disabled={uploading || !selectedFile}>
//         Upload
//       </button>
//       {uploading && <p>Uploading... {uploadProgress}%</p>}
//       {uploadMessage && <p>{uploadMessage}</p>}

//     </div>
//   )