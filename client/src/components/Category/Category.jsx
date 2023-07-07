import { useState } from 'react'
import { Tab } from '@headlessui/react'

function Category({ events, filterEvents }) {
  const [, setItems] = useState(events)

  const filter = cetItem => {
    const updatedItems = events.filter(event => {
      return event.category === cetItem
    })
    setItems(updatedItems)
    filterEvents(updatedItems)
  }

  return (
    <div className='w-full max-w-md px-2 mx-auto py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl  p-1'>
          <Tab
            onClick={() => {
              filter('MOKSHA')
            }}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
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
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
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
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                selected
                  ? 'borderGradient bg-ochre/20 text-white border-b-2 border-ochre'
                  : 'border-b-2 border-ochre text-[#c1c1c1]'
              }`
            }
          >
            EDM NIGHTS
          </Tab>
          <Tab
            onClick={() => {
              filter('CLUBS')
            }}
            className={({ selected }) =>
              `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
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
