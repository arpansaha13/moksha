import { createClient } from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

export const Client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-11-16',
  token: process.env.SANITY_CLIENT_TOKEN,
})

const builder = ImageUrlBuilder(Client)

export const urlFor = source => builder.image(source)
