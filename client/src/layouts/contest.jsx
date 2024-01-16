import { useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { Icon } from '@iconify/react'
import shareIcon from '@iconify-icons/mdi/share'
import leftIcon from '@iconify-icons/mdi/chevron-left'
import { defineCustomElement } from '@tranzis/core/dist/components/tz-3d-card'
import Sheet from '~common/Sheet'
import Container from '~common/Container'
import SocialShare from '~/components/SocialShare'
import ContestTabs from '~/components/Contests/ContestTabs'

defineCustomElement()

export default function ContestLayout() {
  const contest = useLoaderData()
  const location = useLocation()

  const shareData = useMemo(
    () => ({
      url: location.pathname,
      title: `Moksha contest - ${contest.name}`,
      text: contest.description[0].p,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  )

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
                <Icon
                  icon={shareIcon}
                  className='block'
                  color='inherit'
                  width='100%'
                  height='100%'
                  aria-hidden='true'
                />
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

          <ContestTabs contestType={contest.type} isOpen={contest.badges.includes('open')} />

          <Outlet />
        </div>

        <div className='lg:col-span-2 order-first lg:order-2'>
          <div className='sm:sticky sm:top-8 space-y-6'>
            <div className='mx-auto w-64 h-64 sm:w-80 sm:h-80'>
              <tz-3d-card
                src={contest.image.src}
                alt={`moksha-contest-${contest}-poster`}
                rotation='-30'
                elevation='120'
              />
            </div>

            {!contest.badges.includes('open') && (
              <Sheet className='lg:mx-6 p-4 sm:p-6'>
                <h2 className='mb-4 text-xl font-bold'>Registration Deadline</h2>

                <div className='markdown'>
                  <ul>
                    <li className='text-sm sm:text-base'>
                      <strong>Date:</strong> {format(contest.deadline, 'do LLL yyyy')}
                    </li>
                    <li className='text-sm sm:text-base'>
                      <strong>Time:</strong> {format(contest.deadline, 'hh:mm a')}
                    </li>
                  </ul>
                </div>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
