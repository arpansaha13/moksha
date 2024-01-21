export interface Contact {
  name: string
  designation: string
  whatsApp: string
  email: string
}

const generalSecretary: Contact = {
  name: 'Pratnadeep Banik',
  designation: 'Vice President Boys',
  whatsApp: '+91 70051 99236',
  email: 'pratnadeepbanik010@gmail.com',
}

const asstGeneralSecretaries: Contact[] = [
  {
    name: 'Raheena Bin Mohammed',
    designation: 'Vice President Girls',
    whatsApp: '+91 90619 69689',
    email: 'raheenabinmohd@gmail.com',
  },
  {
    name: 'Jagreeti Chakraborty',
    designation: 'General Secretary Cultural',
    whatsApp: '+91 88370 38817',
    email: 'jagreetichakraborty@gmail.com',
  },
  {
    name: 'Kallol Barman',
    designation: 'Asst. General Secretary Cultural',
    whatsApp: '+91 87875 61427',
    email: 'kallolbarman251@gmail.com',
  },
  {
    name: 'Kolisetti Rama Rao',
    designation: 'Asst. General Secretary Cultural',
    whatsApp: '+91 81869 16999',
    email: 'kolisettiramarao456@gmail.com',
  },
  {
    name: 'Anirban Ghosh',
    designation: 'Ex - Asst. General Secretary Cultural',
    whatsApp: '+91 97745 92613',
    email: 'anirbanghoshs30@gmail.com',
  },
  {
    name: 'Rumana Akter',
    designation: 'Ex - Asst. General Secretary Cultural',
    whatsApp: '+91 84149 67192',
    email: 'rumanaak321@gmail.com',
  },
  {
    name: 'Santhosh Kemsarapu',
    designation: 'Ex - Asst. General Secretary Cultural',
    whatsApp: '+91 6302 310 473',
    email: 'santhoshkemsarapu02@gmail.com',
  },
]

const contact = Object.freeze({
  generalSecretary,
  asstGeneralSecretaries,
})

export default contact
