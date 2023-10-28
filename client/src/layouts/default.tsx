import { Outlet } from 'react-router-dom'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import DefaultBg from '~/components/pictures/DefaultBg'

export default function DefaultLayout() {
  return (
    <div className='min-w-screen min-h-screen'>
      <DefaultBg />

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
