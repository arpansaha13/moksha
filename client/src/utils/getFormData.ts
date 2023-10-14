import { isNullOrUndefined } from '@arpansaha13/utils'

export default function getFormData(formEl: HTMLFormElement | null) {
  if (isNullOrUndefined(formEl)) {
    console.warn('"formEl" is null or undefined')
    return {}
  }

  const formData = new FormData(formEl)
  return Object.fromEntries(formData.entries())
}
