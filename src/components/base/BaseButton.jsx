import { memo } from "react"
import classNames from "../../utils/classNames"

const BaseButtonLoader = () => (
  <div className="absolute w-6 aspect-square border-y-2 border-gray-50 rounded-full animate-spin" />
)

const BaseButton = memo(({
  children,
  type = 'button',
  loading = false,
  disabled = false,
  stretch = false,
  secondary = false,
  ...attrs
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading} // disable while loading
      {...attrs}
      className={classNames(
        'inline-flex justify-center rounded-md border py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2 transition-colors relative',
        !secondary
        ? 'text-white bg-amber-700 hover:bg-amber-800 border-transparent'
        : 'text-amber-600 bg-transparent hover:bg-amber-600/20 border-amber-600',
        disabled && 'opacity-70',
        stretch && 'w-full',
      )}
    >
      <span className={loading ? 'text-transparent': ''}>{ children }</span>
      { loading && <BaseButtonLoader /> }
    </button>
  )
})
export default BaseButton
