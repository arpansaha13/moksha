// import { useEffect, useState } from 'react'
// import { useLocation } from "react-router-dom"
import Navbar from '../components/Navbar/Navbar'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
// import CastleGate1 from '../assets/castle-gate-1.svg'
import CastleGate2 from '../assets/castle-gate-2.svg'
// import CastleGate3 from '../assets/castle-gate-3.svg'

// function getBackground(route) {
//   switch (route) {
//     case '/events':
//       return CastleGate3
//     default:
//       return '../assets/castle.png'
//   }
// }

export default function EventLayout({ children }) {
  // const location = useLocation()
  // const [bg, setBg] = useState(getBackground(location.pathname))

  // useEffect(() => setBg(getBackground(location.pathname)), [location])

  return (
    <div className='relative min-w-screen min-h-screen flex flex-col'>
      <img src={CastleGate2} alt='' className='fixed w-full h-full object-cover' aria-hidden={true} />
      <span className='fixed inset-0 z-10 bg-darkBrown/70 mix-blend-darken' />

      <div className='flex-grow flex flex-col relative z-20'>
        <div className='w-full'>
          <ScrollToTop />
          <Navbar />
        </div>

        <div className='flex-grow flex flex-col'>{children}</div>
      </div>
    </div>
  )
}
