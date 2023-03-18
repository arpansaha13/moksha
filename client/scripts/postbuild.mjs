import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import ncp from 'ncp'

const REACT_BUILD_DIR = resolve(process.cwd(), 'build')
const DJANGO_ROOT_DIR = resolve(process.cwd(), '..', 'server')

async function postbuild() {
  const templatesDir = resolve(DJANGO_ROOT_DIR, 'templates')

  if (!existsSync(templatesDir)) {
    await mkdir(templatesDir)
  }

  ncp(resolve(REACT_BUILD_DIR, 'index.html'), resolve(templatesDir, 'index.html'), err => {
    if (err) return console.error(err)
    console.log('Copied "build/index.html" to "server/templates/index.html"')
  })

  ncp(resolve(REACT_BUILD_DIR, 'static'), resolve(DJANGO_ROOT_DIR, 'static'), err => {
    if (err) return console.error(err)
    console.log('Copied "build/static" to "server/static"')
  })
}

postbuild()
