/* eslint-disable react-hooks/exhaustive-deps */
import { createElement, createRef, useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { createFocusTrap } from 'focus-trap'
import { useEventListener } from '../../hooks/useEventListener'

const dialogRef = createRef()

function BaseDialog({ children, open, as = 'div', className, onClose }) {
  const overlayRef = useRef(null)

  const htmlEl = document.getElementsByTagName('html')[0]
  const bodyEl = document.getElementsByTagName('body')[0]

  const openDialog = useCallback(() => {
    htmlEl.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
  }, [])

  const closeDialog = useCallback(() => {
    htmlEl.style.overflow = null
    window.removeEventListener('keydown', closeOnEscape)
    onClose()
  }, [])

  const closeOnEscape = useCallback(e => {
    if (e.key === 'Escape') closeDialog()
  }, [])

  useEffect(() => {
    (open ? openDialog : closeDialog)()
  }, [open])

  useEventListener(overlayRef, 'click', e => {
    if (dialogRef.current.contains(e.target)) return
    onClose()
  }, [open])

  return (
    open
    ? createPortal(createElement(as, { ref: overlayRef, className }, children), bodyEl)
    : null
  )
}

const BaseDialogPanel = ({ as = 'div', className, children, initialFocus }) => {
  useEffect(() => {
    const trap = createFocusTrap(dialogRef.current, {
      initialFocus: initialFocus?.current,
      allowOutsideClick: true,
    })
    trap.activate()

    return () => trap.deactivate()
  }, [])

  return createElement(as, { ref: dialogRef, className }, children)
}

BaseDialog.Panel = BaseDialogPanel
export default BaseDialog
