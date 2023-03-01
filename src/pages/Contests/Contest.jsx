import { useEffect, lazy, Suspense } from 'react'
import { Link, useParams } from "react-router-dom"
import { Icon } from '@iconify/react'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import { useFetch } from '../../hooks/useFetch'
import Sheet from '../../components/common/Sheet'
import Container from '../../components/common/Container'
import Tz3dCard from '@tranzis/react/Tz3dCard'
import '@tranzis/react/styles/Tz3dCard'

const SoloRegistration = lazy(() => import('../../components/Contests/SoloRegistration'))
const TeamRegistration = lazy(() => import('../../components/Contests/TeamRegistration'))

export default function Contest() {
  const { contest } = useParams()
  const fetchHook = useFetch()

  const isSoloContest = false

  useEffect(() => {
    // Fetch contest details
  }, [])

  return (
    <Container as="section" className='py-4' id={`contest-${contest}`}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
        <div className="lg:col-span-3 h-full space-y-4 sm:space-y-6">
          <Link to="/contests" className="flex items-center font-medium text-amber-600 hover:text-amber-500 cursor-pointer">
            <Icon icon={leftIcon} className="inline-block" color="inherit" width='1.5rem' height='1.5rem' />
            <span>Go to contests</span>
          </Link>

          <Sheet className="p-4 sm:p-6 bg-amber-900/30">
            <article className='markdown'>
              <h1>{isSoloContest ? 'Solo' : 'Team'} contest name</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate? Ad enim dicta provident deleniti vitae! Ratione cumque reprehenderit animi error. Aliquam numquam, maiores atque obcaecati rem animi?
              </p>
            </article>
          </Sheet>

          <Sheet className="p-4 sm:p-6 bg-amber-900/30">
            <article className='markdown'>
              <h2>Instructions</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate? Ad enim dicta provident deleniti vitae! Ratione cumque reprehenderit animi error. Aliquam numquam, maiores atque obcaecati rem animi?
              </p>
            </article>
          </Sheet>

          <Suspense fallback={<div />}>
            { isSoloContest ? <SoloRegistration /> : <TeamRegistration /> }
          </Suspense>
        </div>

        <div className="lg:col-span-2 order-first sm:order-2">
          <div className="sm:sticky sm:top-8">
            <div className="mx-auto w-64 h-64 sm:w-80 sm:h-80">
              <Tz3dCard
                src="https://images-platform.99static.com/J66rJkV_HyDRL8BvSnYAexqqKB8=/500x500/top/smart/99designs-contests-attachments/55/55370/attachment_55370577"
                alt={`moksha-contest-${contest}`}
                rotation={{ base: -30, sm: -30 }}
                elevation={{ base: 8, sm: 10 }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
