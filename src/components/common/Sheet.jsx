import { forwardRef } from "react"
import classNames from "../../utils/classNames"

/** background-color should be provided from parent. */
const Sheet = forwardRef(({ children, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      {...rest}
      className={classNames(
        'bg-amber-900/30 shadow shadow-amber-900/60 rounded-md lg:rounded-lg backdrop-blur-sm',
        className,
      )}
    >
      { children }
    </div>
  )
})

export default Sheet
