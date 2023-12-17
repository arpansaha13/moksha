import { defineConfig } from 'unlighthouse'

export default defineConfig({
  site: 'https://moksha23-client.onrender.com',
  scanner: {
    crawler: false,
    sitemap: true,
    robotsTxt: true,
    samples: 1,
    device: 'mobile',
    throttle: false,
    dynamicSampling: 5,
    skipJavascript: true,
    exclude: ['/account/*', '/account/settings/*'],
  },
  debug: true,
})
