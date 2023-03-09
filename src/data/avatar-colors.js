const avatarColors = [
  'text-red-500',
  'text-indigo-500',
  'text-sky-500',
  'text-fuchsia-500',
  'text-teal-500',
  'text-lime-500',
  'text-pink-500',
  'text-purple-500',
  'text-cyan-500',
  'text-green-500',
]

export const getAvatarIdx = string => {
  let i = 0
  for (let j = 0; j < string.length; j++) {
    i = (i + string.charCodeAt(j) * (7 ** j)) % 59969537
  }
  return i % avatarColors.length
}

export default avatarColors
