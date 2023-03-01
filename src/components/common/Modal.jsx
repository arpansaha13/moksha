import { Fragment, useEffect, useState } from "react"
import Transition from './Transition'
import BaseDialog from '../base/BaseDialog'

const Modal = ({ open, setOpen, children, initialFocusRef }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => { if (open) setDialogOpen(true) }, [open])

  return (
    <BaseDialog
      as="div"
      open={dialogOpen}
      onClose={() => setOpen(false)}
      className="relative z-40"
      initialFocus={initialFocusRef}
    >
      <Transition
        show={open}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        afterLeave={() => setDialogOpen(false)}
      >
        <div className="fixed inset-0 bg-darkBrown/75 transition-opacity" />
      </Transition>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <Transition
            show={open}
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <BaseDialog.Panel className="relative sm:my-8 sm:w-full sm:max-w-lg overflow-hidden rounded-lg bg-brown text-left shadow-xl transform transition-all">
              <div className="px-4 pt-5 pb-4 sm:p-6 bg-amber-900/30">
                {children}
              </div>
            </BaseDialog.Panel>
          </Transition>
        </div>
      </div>
    </BaseDialog>
  )
}
export default Modal
