import { memo, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useHashLink } from '../hooks/useHashLink'
import { Icon } from '@iconify/react'
import poundIcon from '@iconify-icons/mdi/pound'
import Sheet from '../components/common/Sheet'
import Container from '../components/common/Container'
import slugify from '../utils/slugify'
import faqs from '../data/faqs'

function Faqs() {
  useHashLink()

  const asideTable = useMemo(() => faqs.slice(faqs.length - 5, faqs.length).map(faq => (
    <p key={slugify(faq.question)}>
      <Link
        to={{ hash: slugify(faq.question) }}
        className="line-clamp-2 hover:text-amber-500 transition-colors"
      >
        { faq.question }
      </Link>
    </p>
  )).reverse(), [])

  return (
    <Container className="py-4">
      <Helmet>
        <title>Moksha | FAQs</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 markdown" id='moksha-faqs'>
          <h1>Frequently Asked Questions</h1>

          <div className='space-y-6'>
            {
              faqs.map(faq => (
                <Sheet
                  className="group p-4 sm:p-6"
                  key={ slugify(faq.question) }
                  id={ slugify(faq.question) }
                >
                  <Faq faq={faq} />
                </Sheet>
              ))
            }
          </div>
        </section>

        <aside className="hidden lg:block lg:col-span-1" id='moksha-faqs-table-of-contents'>
          <Sheet className="p-4 sticky top-4 markdown prose-a:no-underline prose-a:text-[inherit] prose-a:font-normal">
            { asideTable }
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
        to={{ hash: slugify(faq.question) }}
      >
        <Icon icon={poundIcon} color="inherit" width='1.5rem' height='1.5rem' />
      </Link>
    </div>
    <p className="mb-0">{ faq.answer }</p>
  </>
))
