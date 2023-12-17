import { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import TzFloatingWindow from '@tranzis/react-layouts/TzFloatingWindow'
import { useScrollToTop } from '~/hooks/common/useScrollToTop'
import Sidebar from '../components/Sidebar'
import '@tranzis/react-layouts/styles/TzFloatingWindow'

const FloatingWindow = () => {
  const floatingWindowRef = useRef(null)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  useScrollToTop(isTabletOrMobile ? floatingWindowRef : null)

  return isTabletOrMobile ? (
    <TzFloatingWindow.Wrapper sidebar={<Sidebar />} sidebarWidth={200}>
      <div className='w-screen h-screen'>
        <TzFloatingWindow ref={floatingWindowRef} className='bg-darkBrown shadow-xl shadow-amber-900/70'>
          {Outlet}
        </TzFloatingWindow>
      </div>
    </TzFloatingWindow.Wrapper>
  ) : (
    <Outlet />
  )
}
export default FloatingWindow
