import { forwardRef } from "react"
import classNames from "../../utils/classNames"

/** background-color should be provided from parent. */
const Sheet = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      { ...rest }
      className={classNames('rounded-md lg:rounded-lg backdrop-blur-sm', className)}
    >
      { children }
    </div>
  )
})

export default Sheet
