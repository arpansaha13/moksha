import { memo } from 'react'
import { Helmet } from 'react-helmet'
import { slugify } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import Container from '~common/Container'
import faqs from '~/data/faqs'

export function Component() {
  return (
    <Container className='py-4'>
      <Helmet>
        <title>Moksha | FAQs</title>
      </Helmet>

      <section className='markdown' id='moksha-faqs'>
        <div className='mx-auto max-w-2xl'>
          <h1>Frequently Asked Questions</h1>

          <div className='space-y-6'>
            {faqs.map(faq => {
              const slug = slugify(faq.question)

              return <Faq key={slug} faq={faq} slug={slug} />
            })}
          </div>
        </div>
      </section>
    </Container>
  )
}

Component.displayName = 'Faqs'

const Faq = memo(
  ({ faq, slug }) => (
    <Sheet className='p-4 sm:p-6' id={slug}>
      <div className='not-prose'>
        <h2 className='text-xl font-semibold'>{faq.question}</h2>
      </div>
      <p className='mb-0'>{faq.answer}</p>
    </Sheet>
  ),
  (prev, next) => prev.slug === next.slug
)
