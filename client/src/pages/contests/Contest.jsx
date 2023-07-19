import { lazy, Suspense, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useLoaderData, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import shareIcon from '@iconify-icons/mdi/share'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import Tz3dCard from '@tranzis/react/Tz3dCard'
import { isNullOrUndefined } from '@arpansaha13/utils'
import NotFound from '../404'
import SocialShare from '~/components/SocialShare'
import Container from '~common/Container'
import '@tranzis/react/styles/Tz3dCard'

const SoloContest = lazy(() => import('../../components/Contests/SoloContest'))
const TeamContest = lazy(() => import('../../components/Contests/TeamContest'))

export default function Contest() {
  const contest = useLoaderData()
  const location = useLocation()

  const shareData = useMemo(
    () => ({
      url: location.pathname,
      title: `Moksha contest - ${contest.name}`,
      text:
        contest.description[0].p.length <= 100
          ? contest.description[0].p.length
          : `${contest.description[0].p.substr(0, 100)}...`, // trim to 100 characters
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  )

  useEffect(() => window.scrollTo({ top: 0 }), [])

  if (isNullOrUndefined(contest)) {
    return <NotFound />
  }

  return (
    <Container as='section' className='py-4' id={`contest-${contest}`}>
      <Helmet>
        <title>Moksha | Contests</title>
      </Helmet>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 h-full'>
        <div className='lg:col-span-3 h-full'>
          <div className='mb-6 flex items-center justify-between'>
            <h1 className='text-4xl font-bold'>{contest.name}</h1>

            <SocialShare data={shareData} className='group flex items-center lg:gap-1'>
              <div className='w-6 h-6 text-amber-700 group-hover:text-amber-600 transition-colors'>
                <Icon icon={shareIcon} className='block' color='inherit' width='100%' height='100%' aria-hidden />
              </div>
              <p className='sr-only lg:not-sr-only text-sm font-medium text-amber-600 group-hover:text-amber-500 transition-colors'>
                Share
              </p>
            </SocialShare>
          </div>

          <Link
            to='/contests'
            className='w-max flex items-center font-medium text-sm lg:text-base text-amber-600 hover:text-amber-500'
          >
            <Icon icon={leftIcon} className='inline-block' color='inherit' width='1.5rem' height='1.5rem' />
            <span>Go to contests</span>
          </Link>

          <Suspense fallback={null}>
            {contest.type.length === 1 && contest.type[0] === 'solo' ? (
              <SoloContest contest={contest} />
            ) : (
              <TeamContest contest={contest} />
            )}
          </Suspense>
        </div>

        <div className='lg:col-span-2 order-first sm:order-2'>
          <div className='sm:sticky sm:top-8'>
            <div className='mx-auto w-64 h-64 sm:w-80 sm:h-80'>
              <Tz3dCard
                src='https://images-platform.99static.com/J66rJkV_HyDRL8BvSnYAexqqKB8=/500x500/top/smart/99designs-contests-attachments/55/55370/attachment_55370577'
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
