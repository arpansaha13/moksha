import cogIcon from '@iconify-icons/mdi/cog'
import accountIcon from '@iconify-icons/mdi/account'
import accountBoxIcon from '@iconify-icons/mdi/account-box-outline'
import accountGroupIcon from '@iconify-icons/mdi/account-group'
import accountMultipleCheckIcon from '@iconify-icons/mdi/account-multiple-check'
import tshirtCrewIcon from '@iconify-icons/mdi/tshirt-crew'
import faqIcon from '@iconify-icons/mdi/frequently-asked-questions'
import calendarClockIcon from '@iconify-icons/mdi/calendar-clock'
import calendarMultipleIcon from '@iconify-icons/mdi/calendar-multiple'
import type { IconifyIcon } from '@iconify/react'

interface Tab {
  to: string
  name: string
  icon: IconifyIcon
}

export const navTabs = Object.freeze<Tab[]>([
  {
    to: '/events',
    name: 'Events',
    icon: calendarClockIcon,
  },
  {
    to: '/contests',
    name: 'Contests',
    icon: calendarMultipleIcon,
  },
  {
    to: '/faqs',
    name: 'FAQs',
    icon: faqIcon,
  },
  {
    to: '/merch',
    name: 'Merch',
    icon: tshirtCrewIcon,
  },
  {
    to: '/contact',
    name: 'Contact',
    icon: accountBoxIcon,
  },
])

export const profileTabs = Object.freeze<Tab[]>([
  {
    name: 'Profile',
    to: '/account/profile',
    icon: accountIcon,
  },
  {
    name: 'Registrations',
    to: '/account/registrations',
    icon: accountMultipleCheckIcon,
  },
  {
    name: 'Teams',
    to: '/account/teams',
    icon: accountGroupIcon,
  },
  {
    name: 'Settings',
    to: '/account/settings',
    icon: cogIcon,
  },
])
