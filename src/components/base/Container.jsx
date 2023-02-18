import classNames from '../../utils/classNames'

export default function Container({ children, className = '' }) {
  return (
    <div className={classNames("mx-auto max-w-xs lg:max-w-4xl xl:max-w-[84rem] px-2 sm:px-0", className)}>
      { children }
    </div>
  )
}