export default function locationNeedsAuth(path) {
  if (path.startsWith('/account/')) return true
  if (path.startsWith('/teams/')) return true

  return false
}
