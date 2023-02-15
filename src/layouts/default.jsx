import React from 'react'
import Navbar from "../components/Navbar/Navbar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

export default function DefaultLayout({ children }) {
  return (
    <>
     

      <ScrollToTop />
      <Navbar />
      
      <div>{children}</div>
      
    </>
  )
}
