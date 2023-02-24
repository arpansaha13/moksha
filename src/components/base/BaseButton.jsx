import { memo } from "react"
import classNames from "../../utils/classNames"

const BaseButton = memo(({ children, type = 'button', stretch = false, secondary = false, ...attrs }) => {
  return (
    <button
      type={type}
      {...attrs}
      className={classNames(
        'inline-flex justify-center rounded-md border py-2 px-4 text-sm font-medium  shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2 transition-colors',
        !secondary
        ? 'text-white bg-amber-700 hover:bg-amber-800 border-transparent'
        : 'text-amber-600 bg-transparent hover:bg-amber-600/20 border-amber-600',
        stretch ? 'w-full' : '',
      )}
    >
      { children }
    </button>
  )
})
export default BaseButton
