import classNames from "../../utils/classNames"

/** background-color should be provided from parent. */
export default function Sheet({ children, innerRef, className }) {
  return (
    <div
      ref={innerRef}
      className={classNames('rounded-md lg:rounded-lg backdrop-blur-sm', className)}
    >
      { children }
    </div>
  )
}