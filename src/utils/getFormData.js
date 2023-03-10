export default function getFormData(formEl, options) {
  const format = options?.format ?? 'formdata'

  const formData = new FormData(formEl)

  switch (format) {
    case 'formdata':
      return formData
    case 'object':
      return formDataToObject(formData)
    case 'json':
      const object = formDataToObject(formData)
      return JSON.stringify(object)
    default:
      throw new Error(`Invalid format: ${format} in getFormData() options.`)
  }
}

function formDataToObject(formData) {
  var object = {}
  formData.forEach((value, key) => object[key] = value)
  return object
}
