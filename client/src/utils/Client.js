import { createClient } from '@sanity/client'
import ImageUrlBuilder from '@sanity/image-url'

export const Client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-11-16',
  token: import.meta.env.VITE_SANITY_CLIENT_TOKEN,
})

const builder = ImageUrlBuilder(Client)

export const urlFor = source => builder.image(source)
