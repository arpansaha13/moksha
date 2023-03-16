import { Outlet } from 'react-router-dom'
import TzFloatingWindow from '@tranzis/react-layouts/TzFloatingWindow'
import Sidebar from '../components/Sidebar'
import { useWindowSize } from '../hooks/useWindowSize'
import '@tranzis/react-layouts/styles/TzFloatingWindow'

const FloatingWindow = () => {
  const { windowWidth } = useWindowSize()

  if (windowWidth === null) return <></>

  return (
    windowWidth < 1024 ? (
      <TzFloatingWindow.Wrapper sidebar={<Sidebar />} sidebarWidth={200}>
        <div className="w-screen h-screen">
          <TzFloatingWindow className="bg-darkBrown shadow-xl shadow-amber-900/70">
            { Outlet }
          </TzFloatingWindow>
        </div>
      </TzFloatingWindow.Wrapper>
    ) : (
      <Outlet />
    )
  )
}
export default FloatingWindow
