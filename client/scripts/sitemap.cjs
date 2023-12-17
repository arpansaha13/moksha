/* eslint-disable @typescript-eslint/no-var-requires */
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const { writeFileSync } = require('fs')

// An array with your links
const links = [
  { url: '/', lastmod: '2023-12-17', priority: 0.7 },
  { url: '/events', lastmod: '2023-12-17', priority: 0.7 },
  { url: '/contests', lastmod: '2023-12-17', priority: 0.7 },
  { url: '/faqs', lastmod: '2023-12-17', priority: 0.4 },
  { url: '/merch', lastmod: '2023-12-17', priority: 0.4 },
  { url: '/contact', lastmod: '2023-12-17', priority: 0.4 },
  { url: '/auth/login', lastmod: '2023-12-17', priority: 0.4 },
  { url: '/auth/register', lastmod: '2023-12-17', priority: 0.4 },
  { url: '/auth/forgot-password', lastmod: '2023-12-17', priority: 0.2 },
  { url: '/auth/resend-verification-link', lastmod: '2023-12-17', priority: 0.2 },
  { url: '/auth/resend-verification-link', lastmod: '2023-12-17', priority: 0.2 },
  { url: '/account/profile', lastmod: '2023-12-17', priority: 0.2 },
  { url: '/account/teams', lastmod: '2023-12-17', priority: 0.2 },
  { url: '/account/registrations', lastmod: '2023-12-17', priority: 0.2 },
  { url: '/account/settings', lastmod: '2023-12-17', priority: 0.2 },
  { url: '/account/settings/edit-profile', lastmod: '2023-12-17', priority: 0.2 },
  { url: '/account/settings/change-password', lastmod: '2023-12-17', priority: 0.2 },
]

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://moksha23-client.onrender.com' })

streamToPromise(Readable.from(links).pipe(stream)).then(data => writeFileSync('./public/sitemap.xml', data))
