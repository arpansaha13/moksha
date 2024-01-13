import MokshaLogo from './pictures/MokshaLogo'

export default function AppLoader() {
  return (
    <div className='py-16 lg:py-12 fixed w-screen h-screen flex flex-col items-center justify-between space-y-4'>
      <div />
      <MokshaLogo />
      <div className='text-center'>
        <p className='text-amber-600 text-lg font-semibold'>Moksha 2024</p>
        <p className='text-gray-400'>NIT Agartala</p>
      </div>
    </div>
  )
}
