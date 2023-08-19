import { Helmet } from 'react-helmet'
import Slider from '../components/Slider/Slider'

export function Component() {
  return (
    <>
      <Helmet>
        <title>Moksha | Home</title>
      </Helmet>

      <Slider />
    </>
  )
}

Component.displayName = 'Home'
