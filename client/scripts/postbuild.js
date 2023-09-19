import { copyFile } from 'node:fs'

copyFile('server.js', 'dist/server.js', err => {
  if (err) throw err
  console.log('dist/server.js')
})
