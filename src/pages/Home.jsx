import React from 'react'
import { Helmet } from 'react-helmet'
import Slider from '../components/Slider/Slider'

function Home() {
  return (
    <>
      <Helmet>
        <title>Moksha | Home</title>
      </Helmet>

      <Slider />

      {/* <Timeline /> */}
    </>
  )
}

export default Home
