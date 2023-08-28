import nprogress from 'nprogress'

export default function loaderWrapper(loader) {
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
