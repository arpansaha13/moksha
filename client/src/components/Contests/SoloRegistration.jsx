import { memo } from 'react'
import BaseButton from '../base/BaseButton'
import Sheet from '../common/Sheet'
import ContestOverview from './ContestOverview'

const SoloRegistration = ({ onSubmit }) => {
  return (
    <>
      <div className='mt-6'>
        <ContestOverview />
      </div>

      <Sheet className='mt-6 p-6'>
        <form className='space-x-4' onSubmit={onSubmit}>
          <BaseButton type='submit'>Register</BaseButton>
        </form>
      </Sheet>
    </>
  )
}
export default memo(SoloRegistration)
