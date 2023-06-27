import React from 'react';
import './App.css';
import Employee from './components/home/Employee';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './components/home/Signin';
import Signup from './components/home/Signup';
import Reports from './components/home/Reports';
import PaymentGrievances from './components/PaymentGrievances';
import Settings from "./components/home/Settings"




const App = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/paymentgrievances" element={<PaymentGrievances />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>

    {/* <Employee/> */}

  </div>
)


export default App  