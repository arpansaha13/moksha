export default function getPathFromURL(url: string) {
  return new URL(url).pathname
}
