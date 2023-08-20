import { Link } from 'react-router-dom'
import Container from '~common/Container'

export default function GetStarted() {
  return (
    <Container className='py-4 markdown markdown-a text-center'>
      <p className='max-w-lg mx-auto'>
        Dive into the fun! Take a peek at all the awesome <Link to='/events'>events</Link> and{' '}
        <Link to='/contests'>contests</Link> waiting for you. Don&apos;t miss out, Check them out!
      </p>
    </Container>
  )
}
