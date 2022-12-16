import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import DigitalStore from './pages/DigitalStore';
import { PaymentsMethodsRoutes } from './components/paymentMethods/routes/PaymentsMethodsRoutes';
import { guestAuthentication, isAuthenticated } from './services/digitalProducts';
import { DigitalProductRoutes } from './components/digitalProductSale/routes/DigitalProductRoutes';

function App() {

  const location = useLocation();
  const [isTokenAuthenticated, setIsTokenAthenticated] = useState(false);

  useEffect(() => {
    !isAuthenticated() && guestAuthentication();
    setIsTokenAthenticated(true);
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    isTokenAuthenticated &&
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/productType/:typeCode" element={<DigitalStore/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment/*" element={< PaymentsMethodsRoutes/>} />
        <Route path="/productType/:typeCode/*" element={<DigitalProductRoutes/>} />
      </Routes>
  
  );
}

export default App;
