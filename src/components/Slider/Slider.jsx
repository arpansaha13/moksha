/* eslint-disable jsx-a11y/alt-text */
import Tilt from 'react-tilt'
import Moksha from '../../assets/moksha.png'

export default function Slider() {
  return (
    <div className='flex flex-col justify-center items-center mt-4 sm:mt-0'>
      <div className='h-28 sm:h-40 w-max flex items-center justify-center'>
        <Tilt className='Tilt w-full h-full' options={{ max: 25 }}>
          <img className='w-full h-full' src={Moksha} />
        </Tilt>
      </div>

      <div className='sm:w-[30rem] sm:h-[30rem] mt-4'>
        <img className='w-full h-full' src='./images/man_with_bird.png' alt='' />
      </div>
    </div>
  )
}
