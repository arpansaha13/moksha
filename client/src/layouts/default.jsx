import { Outlet } from 'react-router-dom'
import { useScrollToTop } from '~/hooks/useScrollToTop'
import Navbar from '~/components/Navbar'
import Footer from '~/components/Footer'
import DefaultBg from '~/components/pictures/DefaultBg'

export default function DefaultLayout() {
  useScrollToTop()

  return (
    <div className='min-w-screen min-h-screen'>
      <DefaultBg />
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
