
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthProvider';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import Profile from './components/Profile';
import FileAccessControl from './components/FileAccessControl';
import Home from './components/Home';
import Header from './components/Header';
import NotFound from './components/NotFound';
import FileUpload from './components/FileUpload';
import CmkManager from './components/CmkManager';

function App() {
  return (

    <AuthProvider>

      <BrowserRouter>
      <Header /> 

      <Routes>
      <Route exact path='/' element={<Home/>} /> 
      <Route path='/register' element={<UserRegistration/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/fileaccesscontrol' element={<FileAccessControl/>}/>
      <Route path='/upload' element={<FileUpload/>}/>
      <Route path='/cmk' element={<CmkManager/>}/>
      <Route path='/*' element={<NotFound/>}/>



      </Routes>
      </BrowserRouter>
      
    </AuthProvider>
  );
}

export default App;
