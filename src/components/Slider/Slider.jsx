/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react'
import Moksha from '../../assets/moksha.png'
import Tilt from 'react-tilt'

import './Slider.css'
import { motion } from 'framer-motion'

function Slider() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: '#ffbd59',
      mixBlendMode: 'difference',
    },
  }

  const textEnter = () => setCursorVariant('text')
  const textLeave = () => setCursorVariant('default')

  return (
    <div className='flex flex-col justify-center items-center mt-4 sm:mt-0'>
      <div className='h-28 sm:h-40 w-max flex items-center justify-center'>
        <Tilt className='Tilt w-full h-full' options={{ max: 25 }}>
          <img className='w-full h-full' src={Moksha} onMouseEnter={textEnter} onMouseLeave={textLeave} />
        </Tilt>
      </div>
      {/* <motion.div className='cursor' variants={variants} animate={cursorVariant} /> */}

      <div className='sm:w-[30rem] sm:h-[30rem] mt-4'>
        <img className='w-full h-full' src='./images/man_with_bird.png' alt='' />
      </div>
    </div>
  )
}

export default Slider
