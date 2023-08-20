import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function DefaultLayout() {
  return (
    <div className='min-w-screen min-h-screen'>
      <img
        role='presentation'
        src='/images/bg/castle-974x846.png'
        alt=''
        className='fixed w-screen h-screen object-cover'
        aria-hidden={true}
      />
      <span role='presentation' className='fixed w-screen h-screen z-10 bg-darkBrown/70 mix-blend-darken' />

      <div className='relative z-20'>
        <Navbar />

        <div>
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  )
}
