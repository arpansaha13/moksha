import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ScrollToTop from '../components/ScrollToTop/ScrollToTop'
import CastleGate2 from '../assets/castle-gate-2.svg'

export default function ContestLayout() {
  return (
    <>
      <Helmet>
        <title>Moksha | Contests</title>
      </Helmet>

      <div className='relative min-w-screen min-h-screen flex flex-col'>
        <img role="presentation" src={CastleGate2} alt='' className='fixed w-screen h-screen object-cover' aria-hidden={true} />
        <span role="presentation" className='fixed w-screen h-screen z-10 bg-darkBrown/70 mix-blend-darken' />

        <div className='relative z-20'>
          <div className='w-full'>
            <ScrollToTop />
            <Navbar />
          </div>

          <div>
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>
    </>
  )
}
