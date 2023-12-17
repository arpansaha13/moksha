import { resolve } from 'node:path'
import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import { config as dotenvConfig } from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenvConfig()

const port = process.env.PROXY_PORT || 5173

const app = express()

app.use(compression())
app.use('/assets', sirv('./dist/assets', { maxAge: 86400 })) // 1 day
app.use('/images', sirv('./dist/images', { maxAge: 2592000 })) // 1 month
app.use('/logos', sirv('./dist/logos', { maxAge: 2592000 }))
app.use('/moksha', sirv('./dist/moksha', { maxAge: 2592000 }))

app.use(
  '/api',
  createProxyMiddleware({
    // Use '127.0.0.1' instead of localhost
    target: process.env.PROXY_REDIRECT_ORIGIN,
    changeOrigin: true,
  })
)

app.use('/', sirv('./dist'))

app.use('*', (_, res) => {
  res.sendFile(resolve('./dist/index.html'))
})

app.listen(port, () => {
  if (process.env.PROXY_ENV === 'production') {
    console.log(`Server started at port ${port}`)
  } else {
    console.log(`Server started at http://localhost:${port}`)
  }
})
