export default function getFormData(formEl: HTMLFormElement) {
  const formData = new FormData(formEl)
  return Object.fromEntries(formData.entries())
}
