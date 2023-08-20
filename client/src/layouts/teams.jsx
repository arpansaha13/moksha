import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TeamsLayout() {
  return (
    <div className='min-w-screen min-h-screen'>
      <img
        role='presentation'
        src='/images/bg/castle-974x846'
        alt=''
        className='fixed w-screen h-screen object-cover'
        aria-hidden={true}
      />
      <span role='presentation' className='fixed w-screen h-screen z-10 bg-darkBrown/70 mix-blend-darken' />

      <div className='min-w-screen min-h-screen flex flex-col relative z-20'>
        <Navbar />

        <div className='flex-grow'>
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  )
}
