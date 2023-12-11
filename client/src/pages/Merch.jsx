import { useMemo, useRef, useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useMediaQuery } from 'react-responsive'
import { defineCustomElement } from '@tranzis/core/dist/components/tz-gallery-1'
import { classNames } from '@arpansaha13/utils'
import Container from '~common/Container'

defineCustomElement()

export function Component() {
  const tzGallery1Ref = useRef(null)
  const isMobile = useMediaQuery({ query: '(max-width: 639px)' })

  const sizeChart = useMemo(
    () => ({
      head: ['xs', 'sm', 'm', 'l', 'xl', '2xl', '3xl'],
      body: [
        ['Chest', 34, 36, 38, 40, 42, 44, 46],
        ['Length', 24, 25, 26, 27, 28, 29, 30],
        [isMobile ? 'Sleeve' : 'Sleeve length', 7.5, 8, 8, 8.5, 8.5, 9, 10],
        ['Shoulder', 15.5, 16, 17, 17.5, 18, 19, 20],
      ],
    }),
    [isMobile]
  )

  useLayoutEffect(() => {
    tzGallery1Ref.current.pictures = [
      {
        sources: [
          { srcSet: 'images/merch/black-1024x900.webp', type: 'image/webp' },
          { srcSet: 'images/merch/black-1024x900.png', type: 'image/png' },
        ],
        src: 'images/merch/black-1024x900.png',
        alt: 'Moksha 2023 merch (black)',
      },
      {
        sources: [
          { srcSet: 'images/merch/white-1024x900.webp', type: 'image/webp' },
          { srcSet: 'images/merch/white-1024x900.png', type: 'image/png' },
        ],
        src: 'images/merch/white-1024x900.png',
        alt: 'Moksha 2023 merch (white)',
      },
    ]
  }, [])

  return (
    <>
      <Helmet>
        <title>Moksha | Merch</title>
      </Helmet>

      <Container>
        <div className='grid lg:grid-cols-2 gap-y-12 lg:gap-y-16'>
          <div className='markdown'>
            <h1>Merchandise</h1>

            <p>
              Gear up for the ultimate college fest experience with our exclusive merchandise! Get ready to make
              memories, create moments, and celebrate like never before - all with the perfect college fest merch by
              your side. Grab yours today and let the festivity begin!
            </p>
          </div>

          <div className='lg:row-span-2 flex items-center justify-center lg:justify-end'>
            <div className='w-64 h-64 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem]'>
              <tz-gallery-1 ref={tzGallery1Ref} />
            </div>
          </div>

          <div className='overflow-auto scrollbar horizontal'>
            <table className='w-full'>
              <thead>
                <tr className='text-amber-500 border-b border-gray-500'>
                  <th className='p-2 text-left'>Sizes</th>

                  {sizeChart.head.map((rowItem, i) => (
                    <th key={i} className='p-2 uppercase'>
                      {rowItem}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {sizeChart.body.map(row => (
                  <tr key={row[0]} className='text-center'>
                    {row.map((rowItem, i) => (
                      <td key={i} className={classNames(i === 0 ? 'text-left font-medium' : 'text-gray-400', 'p-2')}>
                        {rowItem}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  )
}

Component.displayName = 'Merch'
