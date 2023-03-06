import React from "react"
import { Link } from "react-router-dom"
import { Icon } from '@iconify/react'
import instagramIcon from '@iconify-icons/mdi/instagram'
import githubIcon from '@iconify-icons/mdi/github'
import navTabs from '../../data/nav-tabs'

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: instagramIcon,
  },
  {
    name: 'GitHub',
    href: '#',
    icon: githubIcon,
  },
]

const CURRENT_YEAR = new Date().getFullYear()

function Footer() {
  return (
    <footer className="mt-6 py-12 bg-darkBrown/70 backdrop-blur-sm text-gray-400 text-sm flex flex-col items-center gap-y-6 shadow-inner shadow-amber-900/20">
      <div className="w-12 h-12">
        <img src="/moksha-logo.svg" alt="Moksha logo" className="w-full h-full" />
      </div>

      <ul className="hidden sm:flex gap-12">
        {
          navTabs.map(tab => (
            <li key={ tab.to }>
              <Link to={ tab.to } className="hover:text-gray-200 transition-colors">
                { tab.name }
              </Link>
            </li>
          ))
        }
      </ul>

      <ul className="flex gap-8">
        {
          socialLinks.map(socialLink => (
            <li key={ socialLink.href }>
              <a
                href={ socialLink.href }
                className="block w-6 h-6 hover:text-gray-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="sr-only">{ socialLink.name }</p>
                <Icon icon={socialLink.icon} className="block" color="inherit" width='100%' height='100%' aria-hidden />
              </a>
            </li>
          ))
        }
      </ul>

      <p className="text-xs">
        © { CURRENT_YEAR } Moksha, NIT Agartala. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
