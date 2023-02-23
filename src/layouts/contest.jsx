import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import CastleGate2 from '../assets/castle-gate-2.svg'

export default function ContestLayout() {
  return (
    <div className='relative min-w-screen min-h-screen flex flex-col'>
      <img src={CastleGate2} alt='' className='fixed w-screen h-screen object-cover' aria-hidden={true} />
      <span className='fixed w-screen h-screen z-10 bg-darkBrown/70 mix-blend-darken' />

      <div className='relative z-20'>
        <div className='w-full'>
          <ScrollToTop />
          <Navbar />
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
