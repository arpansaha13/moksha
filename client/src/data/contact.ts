interface Contact {
  name: string
  designation: string
  whatsApp: string
  email: string
}

const generalSecretary: Contact = {
  name: 'Pratnadeep Banik',
  designation: 'General Secretary',
  whatsApp: '+91 70051 99236',
  email: 'pratnadeepbanik010@gmail.com',
}

const asstGeneralSecretaries: Contact[] = [
  {
    name: 'Anirban Ghosh',
    designation: 'Asst. General Secretary',
    whatsApp: '+91 97745 92613',
    email: 'anirbanghoshs30@gmail.com',
  },
  {
    name: 'Rumana Akter',
    designation: 'Asst. General Secretary',
    whatsApp: '+91 84149 67192',
    email: 'rumanaak321@gmail.com',
  },
  {
    name: 'Santhosh Kemsarapu',
    designation: 'Asst. General Secretary',
    whatsApp: '+91 6302 310 473',
    email: 'santhoshkemsarapu02@gmail.com',
  },
]

const contact = Object.freeze({
  generalSecretary,
  asstGeneralSecretaries,
})

export default contact
