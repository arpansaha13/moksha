/* eslint-disable jsx-a11y/alt-text */
import Tilt from 'react-parallax-tilt'
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
        <img
          className='w-full h-full'
          src='https://res.cloudinary.com/djzml9nau/image/upload/v1678712397/MokshaUpdatewithoutbG_nbylcr.png'
          alt=''
        />
      </div>
      <div className='h-screen w-screen flex justify-center items-center'>
        <iframe
          width='100%'
          height='100%'
          src='https://www.youtube.com/embed/Of0Pxz8jd4s'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )
}
