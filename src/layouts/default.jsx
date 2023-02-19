import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Castle from '../assets/castle.svg'

import ScrollToTop from '../components/ScrollToTop/ScrollToTop'

export default function DefaultLayout({ children }) {
  return (
    <div className='min-w-screen min-h-screen'>
    <img src={Castle} alt='' className='fixed w-screen h-screen object-cover' aria-hidden={true} />
    <span className='fixed inset-0 z-10 bg-darkBrown/70 mix-blend-darken' />

    <div className='relative z-20'>
      <div className='w-full'>
        <ScrollToTop />
        <Navbar />
      </div>

      <div className=''>{children}</div>
    </div>
  </div>
  )
}
