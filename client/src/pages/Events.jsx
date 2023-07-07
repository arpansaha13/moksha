import { useEffect, useState } from 'react'
import Container from '../components/common/Container'
import { Client, urlFor } from '../utils/Client'
import { feedQuery } from '../utils/data'
import Category from '../components/Category/Category'
import { Link } from 'react-router-dom'

export default function Events() {
  const [events, setEvents] = useState()
  const [, setEventNew] = useState(events)

  const filterEvents = category => {
    setEventNew(category)
  }

  useEffect(() => {
    Client.fetch(feedQuery).then(data => {
      setEvents(data)
    })
  }, [])

  return (
    <Container className='w-full max-w-md px-2 py-16 sm:px-0'>
      <Category events={events} filterEvents={filterEvents} />

      <div className='grid grid-cols-12 gap-8 mt-10'>
        {events?.map(event => {
          return (
            <div
              key={event.slug}
              className='flex flex-col col-span-12 bg-ochre/25 rounded-lg cursor-pointer md:col-span-6 xl:col-span-3 h-fit'
            >
              <Link to={`/events/${event.slug}`}>
                <div className='flex flex-col bg-white z-30 rounded-md'>
                  <div className='w-full max-h-1/2'>
                    <img
                      className='object-cover w-full rounded-tl-lg rounded-tr-lg aspect-square'
                      src={urlFor(event.image)}
                      alt=''
                    />
                  </div>
                </div>
                <div className='flex flex-col space-y-2 pb-4 items-center justify-between px-3 mt-4'>
                  <h3 className='text-xl font-semibold text-ochre'>{event.name}</h3>
                  <h5>{event.description.slice(0, 250)}</h5>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
