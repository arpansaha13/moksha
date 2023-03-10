import { memo } from "react"
import BaseButton from "../base/BaseButton"
import Sheet from "../common/Sheet"

const SoloRegistration = ({ onSubmit }) => {
  return (
    <>
      <Sheet className="p-4 sm:p-6">
        <article className='markdown'>
          <h1>Solo contest name</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate? Ad enim dicta provident deleniti vitae! Ratione cumque reprehenderit animi error. Aliquam numquam, maiores atque obcaecati rem animi?
          </p>
        </article>
      </Sheet>

      <Sheet className="p-4 sm:p-6">
        <article className='markdown'>
          <h2>Instructions</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium saepe a voluptate? Ad enim dicta provident deleniti vitae! Ratione cumque reprehenderit animi error. Aliquam numquam, maiores atque obcaecati rem animi?
          </p>
        </article>
      </Sheet>

      <Sheet className="p-6">
        <form className='space-x-4' onSubmit={onSubmit}>
          <BaseButton type="submit">
            Register
          </BaseButton>
        </form>
      </Sheet>
    </>
  )
}
export default memo(SoloRegistration)
