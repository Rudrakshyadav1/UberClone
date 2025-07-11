import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start.jsx';
import Home from './pages/Home.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserSignup from './pages/UserSignup.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import UserProtectedWrapper from './pages/UserProtectedWrapper.jsx';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper.jsx';
import UserLogout from './pages/UserLogout.jsx';
import CaptainLogout from  './pages/CaptainLogout.jsx'
import Riding from './pages/Riding.jsx';
import CaptainHome from './pages/CaptainHome.jsx';
import CaptainRiding from './components/CaptainRiding.jsx';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-home" element={ <CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>} />
      <Route path="/captain-riding" element={<CaptainRiding/>}/>
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/home" element={<UserProtectedWrapper><Home /></UserProtectedWrapper>} />
      <Route path="/user/logout" element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>} />
      <Route path="/captain/logout" element={<CaptainProtectedWrapper><CaptainLogout/></CaptainProtectedWrapper>} />
      <Route path="/riding" element={<Riding/>} />
    </Routes>
  );
};

export default App;
