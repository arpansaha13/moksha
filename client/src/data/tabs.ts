interface Tab {
  to: string
  name: string
}

export const navTabs = Object.freeze<Tab[]>([
  {
    to: '/events',
    name: 'Events',
  },
  {
    to: '/contests',
    name: 'Contests',
  },
  {
    to: '/faqs',
    name: 'FAQs',
  },
  {
    to: '/merch',
    name: 'Merch',
  },
  {
    to: '/contact',
    name: 'Contact',
  },
])

export const profileTabs = Object.freeze<Tab[]>([
  {
    name: 'Profile',
    to: '/account/profile',
  },
  {
    name: 'Registrations',
    to: '/account/registrations',
  },
  {
    name: 'Teams',
    to: '/account/teams',
  },
  {
    name: 'Settings',
    to: '/account/settings',
  },
])
