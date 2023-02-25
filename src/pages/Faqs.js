import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useHashLink } from '../hooks/useHashLink'
import { Icon } from '@iconify/react'
import poundIcon from '@iconify-icons/mdi/pound'
import Sheet from '../components/common/Sheet'
import Container from '../components/common/Container'

// Fake data for now
const faqs = [
  ...(() => {
    const array = []
    for (let i = 0; i < 20; i++) {
      array.push({
        id: `moksha-faq-${i + 1}`,
        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate??',
        answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate? Ad enim dicta provident deleniti vitae! Ratione cumque reprehenderit animi error. Aliquam numquam, maiores atque obcaecati rem animi? Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate? Ad enim dicta provident deleniti vitae! Ratione cumque reprehenderit animi error. Aliquam numquam, maiores atque obcaecati rem animi?',
      })
    }
    return array
  })(),
]

function Faqs() {
  const hashRef = useHashLink()

  return (
    <Container className="py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 markdown" id='moksha-faqs'>
          <h1>Frequently Asked Questions</h1>

          <div className='space-y-6'>
            {
              faqs.map(faq => (
                <Sheet
                  innerRef={hashRef(faq.id)}
                  className="group p-4 sm:p-6 bg-amber-900/30"
                  key={ faq.id }
                  id={ faq.id }
                >
                  <Faq faq={faq} />
                </Sheet>
              ))
            }
          </div>
        </section>

        <aside className="hidden lg:block lg:col-span-1" id='moksha-faqs-table-of-contents'>
          <Sheet className="p-4 bg-amber-900/30 markdown sticky top-4">
            {
              faqs.slice(0, 5).map(faq => (
                <p key={faq.id}>
                  <Link
                    to={{ hash: faq.id }}
                    className="line-clamp-2 no-underline text-[inherit] hover:text-amber-500 font-normal transition-colors"
                  >
                    { faq.question }
                  </Link>
                </p>
              ))
            }
          </Sheet>
        </aside>
      </div>
    </Container>
  )
}

export default Faqs

const Faq = memo(({faq}) => (
  <>
    <div className="not-prose flex flex-col-reverse gap-2 lg:flex-row lg:items-center">
      <h2 className="flex-grow text-xl font-semibold">
        { faq.question }
      </h2>
      <Link
        className="flex-shrink-0 block w-max text-amber-600 hover:text-amber-500 lg:opacity-0 lg:group-hover:opacity-100 transition-[opacity,_color]"
        to={{ hash: faq.id }}
      >
        <Icon icon={poundIcon} color="inherit" width='1.5rem' height='1.5rem' />
      </Link>
    </div>
    <p className="mb-0">{ faq.answer }</p>
  </>
))
