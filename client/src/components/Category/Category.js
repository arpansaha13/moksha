import React, { useState } from 'react'
import { Tab } from '@headlessui/react'

function Category({ events, filterEvents, resetEvents }) {
  const [items, setItems] = useState(events)

  const filter = cetItem => {
    const updatedItems = events.filter(event => {
      return event.category === cetItem
    })
    setItems(updatedItems)
    filterEvents(updatedItems)
  }
  return (
    <div>
      <Tab.Group>
        <Tab.List className='my-4 sm:my-6 grid grid-cols-5 rounded-t-lg bg-amber-900/30 text-gray-200 text-sm font-medium divide-x divide-amber-900/70 overflow-hidden'>
          <Tab
            onClick={() => {
              resetEvents()
            }}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-xs sm:text-sm flex justify-center items-center font-light outline-none md:py-4 md:px-6 md:text-base ${
                selected
                  ? 'borderGradient bg-ochre/20 text-white border-b-2 border-ochre'
                  : 'border-b-2 border-ochre text-[#c1c1c1]'
              }`
            }
          >
            ALL
          </Tab>
          <Tab
            onClick={() => {
              filter('MOKSHA')
            }}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-xs sm:text-sm flex justify-center items-center font-light outline-none md:py-4 md:px-6 md:text-base ${
                selected
                  ? 'borderGradient bg-ochre/20 text-white border-b-2 border-ochre'
                  : 'border-b-2 border-ochre text-[#c1c1c1]'
              }`
            }
          >
            MOKSHA
          </Tab>
          <Tab
            onClick={() => {
              filter('UDAAN')
            }}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-xs sm:text-sm flex justify-center items-center font-light outline-none md:py-4 md:px-6 md:text-base ${
                selected
                  ? 'borderGradient bg-ochre/20 text-white border-b-2 border-ochre'
                  : 'border-b-2 border-ochre text-[#c1c1c1]'
              }`
            }
          >
            UDAAN
          </Tab>
          <Tab
            onClick={() => {
              filter('EDM NIGHTS')
            }}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-xs sm:text-sm flex justify-center items-center font-light outline-none md:py-4 md:px-6 md:text-base ${
                selected
                  ? 'borderGradient bg-ochre/20 text-white border-b-2 border-ochre'
                  : 'border-b-2 border-ochre text-[#c1c1c1]'
              }`
            }
          >
            EDM <span className='hidden sm:inline'>NIGHTS</span>
          </Tab>
          <Tab
            onClick={() => {
              filter('CLUBS')
            }}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-xs sm:text-sm flex justify-center items-center font-light outline-none md:py-4 md:px-6 md:text-base ${
                selected
                  ? 'borderGradient bg-ochre/20 text-white border-b-2 border-ochre'
                  : 'border-b-2 border-ochre text-[#c1c1c1]'
              }`
            }
          >
            CLUBS
          </Tab>
        </Tab.List>
      </Tab.Group>
    </div>
  )
}

export default Category
