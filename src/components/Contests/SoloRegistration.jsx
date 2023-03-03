import { memo } from "react"
import BaseButton from "../base/BaseButton"
import Sheet from "../common/Sheet"

const SoloRegistration = ({ onSubmit }) => {
  return (
    <Sheet className="bg-amber-900/30 p-6">
      <form className='space-x-4' onSubmit={onSubmit}>
        <BaseButton type="submit">
          Register
        </BaseButton>
      </form>
    </Sheet>
  )
}
export default memo(SoloRegistration)
