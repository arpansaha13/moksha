export default function slugify(str, separator = '-') {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, separator)
    .replace(/[^\w\-]+/g, "")
    .replace(/\_/g, separator)
    .replace(/\-\-+/g, separator)
    .replace(/\-$/g, "")
}
