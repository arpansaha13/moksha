import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

// Use '127.0.0.1' instead of localhost
const REDIRECT_ORIGIN = process.env.PROXY_REDIRECT_ORIGIN

const port = process.env.PORT || 5173
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()

const compression = (await import('compression')).default
const sirv = (await import('sirv')).default

app.use(compression())
app.use('/assets', sirv('./assets', { extensions: [] }))
app.use('/images', sirv('./images', { extensions: [] }))
app.use('/logos', sirv('./logos', { extensions: [] }))
app.use('/moksha', sirv('./moksha', { extensions: [] }))

app.use(
  '/api',
  createProxyMiddleware({
    target: REDIRECT_ORIGIN,
    changeOrigin: true,
  })
)

app.use('*', (_, res) => {
  res.sendFile(resolve(__dirname, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
