import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import { config as dotenvConfig } from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenvConfig()

const port = process.env.PROXY_PORT || 5173
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(compression())
app.use('/assets', sirv('./dist/assets', { extensions: [] }))
app.use('/images', sirv('./dist/images', { extensions: [] }))
app.use('/logos', sirv('./dist/logos', { extensions: [] }))
app.use('/moksha', sirv('./dist/moksha', { extensions: [] }))

app.use(
  '/api',
  createProxyMiddleware({
    // Use '127.0.0.1' instead of localhost
    target: process.env.PROXY_REDIRECT_ORIGIN,
    changeOrigin: true,
  })
)

app.use('*', (_, res) => {
  res.sendFile(resolve(__dirname, 'index.html'))
})

app.listen(port, () => {
  if (process.env.PROXY_ENV === 'production') {
    console.log(`Server started at port ${port}`)
  } else {
    console.log(`Server started at http://localhost:${port}`)
  }
})
