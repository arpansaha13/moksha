import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import '../App.css';
import './css/home.css';



function Home() {

  
  return (
    <div className="home">
      

      <ScrollToTop />
      <Navbar />
      <Slider />
      {/* <Footer /> */}
      
    </div>
  );
}

export default Home;
