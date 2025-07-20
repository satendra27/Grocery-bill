import React from 'react';
import Products from './Components/Products/Products';
import CalculateBill from './Components/CalculateBill/CalculateBill';
import { Navbar } from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/Bill' element={<CalculateBill />} />
      </Routes>
    </div>
  );
};

export default App;
