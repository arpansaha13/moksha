import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";


function routes() {
 
  


  return (
    <div className='abc'>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
      <Route exact path="/" element={<Home />}></Route>
       </Routes>
    </BrowserRouter>
    </div>
  );
}

export default routes;
