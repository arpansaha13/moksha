export default function getFormData(formEl: HTMLFormElement) {
  const formData = new FormData(formEl)

  const object: any = {}
  formData.forEach((value, key) => (object[key] = value))
  return object
}
