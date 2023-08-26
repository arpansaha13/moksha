import nprogress from 'nprogress'

export default function loaderWrapper(loader) {
  return async args => {
    if (!nprogress.isStarted()) nprogress.start()

    const loaderData = await loader.fn(args)

    if (loader.meta.type === 'page') nprogress.done()

    return loaderData
  }
}
