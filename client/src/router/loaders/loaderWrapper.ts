import nprogress from 'nprogress'
import type { LoaderFunction } from 'react-router-dom'

interface LoaderMeta {
  type: 'layout' | 'page'
}

interface Loader {
  meta: LoaderMeta
  fn: LoaderFunction
}

export default function loaderWrapper(loader: Loader): LoaderFunction {
  return async args => {
    if (!nprogress.isStarted()) nprogress.start()

    let loaderData

    try {
      loaderData = await loader.fn(args)
    } catch (e) {
      nprogress.done()
      throw e
    }

    if (loader.meta.type === 'page') nprogress.done()

    return loaderData
  }
}
