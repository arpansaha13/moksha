import BaseButton from '~base/BaseButton'
import type { SoloRegisterProps } from './solo-register.types'
import { useSoloRegisterController } from './solo-register.controller'

export default function SoloRegister(props: SoloRegisterProps) {
  const { formRef, loading, soloRegister } = useSoloRegisterController(props)

  return (
    <form ref={formRef} onSubmit={soloRegister}>
      <div className='not-prose'>
        <BaseButton type='submit' loading={loading}>
          Register
        </BaseButton>
      </div>
    </form>
  )
}
