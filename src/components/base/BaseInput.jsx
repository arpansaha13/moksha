/*
  Props
  id: string
  label: string
  innerRef?: RefObject<HTMLInputElement>
  validationError?: string | null
*/

export default function BaseInput(props) {
  const { id, label, innerRef, validationError = null, ...inputAttrs } = props

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-100">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          ref={innerRef}
          {...inputAttrs}
          className="block w-full appearance-none rounded-md border border-gray-300 bg-amber-900/70 px-3 py-2 text placeholder-gray-400 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500 sm:text-sm"
        />
      </div>
      {validationError !== null && (
        <p className="text-xs text-red-400 absolute -bottom-5 left-0.5">{validationError}</p>
      )}
    </div>
  )
}
