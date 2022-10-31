import React, { useEffect } from 'react';
import Navbar from './Components/navbar';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import { SignUp } from './pages/signup';
import { LogIn } from './pages/login';
import { Home } from './pages/home';
import { AllImages } from './pages/allimages';
import { MyImages } from './pages/myimages';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { setInitialState } from './redux/slice';
import { SignOut } from './pages/signOut';
import { ImageViewer } from './pages/imageviewer';

function App() {
  const dispatch=useAppDispatch()
  const auth=useAppSelector(state=>state.User.Auth)
  useEffect(()=>{
    let token=localStorage.getItem('jwt-token')
    if(token){
    axios.defaults.headers.common['jwt-token']=token
    }
  axios.get('/authstatus')
  .then(responce=>{
    console.log(responce.data.Auth);
    dispatch(setInitialState({User:responce.data.User,Auth:responce.data.Auth}))
  })
  },[dispatch,auth])
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/allimages' element={<AllImages />} />
        <Route path='/myimages' element={<MyImages />} />
        <Route path='/signout' element={<SignOut />}/>
        <Route path='/imageviewer/:id' element={<ImageViewer />} />
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
