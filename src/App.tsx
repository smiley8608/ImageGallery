import React from 'react';
import Navbar from './Components/navbar';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import { SignIn } from './pages/signin';
import { LogIn } from './pages/login';
import { Home } from './pages/home';
import { AllImages } from './pages/allimages';
import { MyImages } from './pages/myimages';

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/'  element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/allimages' element={<AllImages />} />
        <Route path='/myimages' element={<MyImages />} />
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
