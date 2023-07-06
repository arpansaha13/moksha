import { memo } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useHashLink } from '../hooks/useHashLink'
import { slugify } from '@arpansaha13/utils'
import { Icon } from '@iconify/react'
import poundIcon from '@iconify-icons/mdi/pound'
import Sheet from '../components/common/Sheet'
import Container from '../components/common/Container'
import faqs from '../data/faqs'

function Faqs() {
  useHashLink()

  return (
    <Container className='py-4'>
      <Helmet>
        <title>Moksha | FAQs</title>
      </Helmet>

      <section className='markdown' id='moksha-faqs'>
        <div className='mx-auto max-w-2xl'>
          <h1>Frequently Asked Questions</h1>

          <div className='space-y-6'>
            {faqs.map(faq => (
              <Sheet className='group p-4 sm:p-6' key={slugify(faq.question)} id={slugify(faq.question)}>
                <Faq faq={faq} />
              </Sheet>
            ))}
          </div>
        </div>
      </section>
    </Container>
  )
}

export default Faqs

const Faq = memo(({ faq }) => (
  <>
    <div className='not-prose flex flex-col-reverse gap-2 lg:flex-row lg:items-center'>
      <h2 className='flex-grow text-xl font-semibold'>{faq.question}</h2>
      <Link
        className='flex-shrink-0 block w-max text-amber-600 hover:text-amber-500 lg:opacity-0 lg:group-hover:opacity-100 transition-[opacity,_color]'
        to={{ hash: slugify(faq.question) }}
      >
        <Icon icon={poundIcon} color='inherit' width='1.5rem' height='1.5rem' />
      </Link>
    </div>
    <p className='mb-0'>{faq.answer}</p>
  </>
))
