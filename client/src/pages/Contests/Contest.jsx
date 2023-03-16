import { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useParams } from "react-router-dom"
import { Icon } from '@iconify/react'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import Container from '../../components/common/Container'
import Tz3dCard from '@tranzis/react/Tz3dCard'
import { getContestData } from '../../data/contests'
import '@tranzis/react/styles/Tz3dCard'

const SoloRegistration = lazy(() => import('../../components/Contests/SoloRegistration'))
const TeamRegistration = lazy(() => import('../../components/Contests/TeamRegistration'))

export default function Contest() {
  const params = useParams()
  const contest = getContestData(params.club, params.contest)

  return (
    <Container as="section" className='py-4' id={`contest-${contest}`}>
      <Helmet>
        <title>Moksha | Contests</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
        <div className="lg:col-span-3 h-full">
          <Link to="/contests" className="w-max flex items-center font-medium text-sm lg:text-base text-amber-600 hover:text-amber-500 cursor-pointer">
            <Icon icon={leftIcon} className="inline-block" color="inherit" width='1.5rem' height='1.5rem' />
            <span>Go to contests</span>
          </Link>

          <Suspense fallback={null}>
            { ['solo', 'any'].includes(contest.type) ? <SoloRegistration /> : <TeamRegistration /> }
          </Suspense>
        </div>

        <div className="lg:col-span-2 order-first sm:order-2">
          <div className="sm:sticky sm:top-8">
            <div className="mx-auto w-64 h-64 sm:w-80 sm:h-80">
              <Tz3dCard
                src="https://images-platform.99static.com/J66rJkV_HyDRL8BvSnYAexqqKB8=/500x500/top/smart/99designs-contests-attachments/55/55370/attachment_55370577"
                alt={`moksha-contest-${contest}-poster`}
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
