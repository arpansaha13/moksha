import Sheet from '../components/common/Sheet'
import Container from '../components/common/Container'
import { Icon } from '@iconify/react'
import gmailIcon from '@iconify-icons/mdi/gmail'
import whatsappIcon from '@iconify-icons/mdi/whatsapp'
import contact from '../data/contact'

export default function Contact() {
  return (
    <Container as='main'>
      <section id='moksha-2023-general-secretaries'>
        <h1 className='pt-6 pb-12 text-4xl text-center font-bold text-gray-50'>Contact us</h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <Card data={contact.generalSecretary} />

          {contact.asstGeneralSecretaries.map(data => (
            <Card key={data.email} data={data} />
          ))}
        </div>
      </section>
    </Container>
  )
}

const Card = ({ data }) => (
  <Sheet className='p-4 overflow-hidden'>
    <p className='text-lg sm:text-xl text-amber-500 font-semibold'>{data.name}</p>
    <p className='text-xs xs:text-sm text-gray-400 uppercase'>{data.designation}</p>

    <div className='mt-4 flex items-center'>
      <div className='flex-shrink-0 mr-2 w-5 h-5 xs:w-6 xs:h-6 text-emerald-500'>
        <Icon icon={whatsappIcon} className='block' color='inherit' width='100%' height='100%' />
      </div>
      <p className='text-sm xs:text-base text-gray-200'>{data.whatsApp}</p>
    </div>

    <div className='mt-2 flex items-center text-rose-500'>
      <div className='flex-shrink-0 mr-2 w-5 h-5 xs:w-6 xs:h-6'>
        <Icon icon={gmailIcon} className='block' color='inherit' width='100%' height='100%' />
      </div>
      <div className='text-gray-200'>
        <p className='inline-block text-sm xs:text-base'>{data.email.split('@')[0]}</p>
        <p className='inline-block text-xs xs:text-sm text-gray-400'>@{data.email.split('@')[1]}</p>
      </div>
    </div>
  </Sheet>
)
