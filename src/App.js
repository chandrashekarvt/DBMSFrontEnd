import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';





function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/admin' element={<Admin/>} />
    </Routes>
  );
}

export default App;
