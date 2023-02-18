const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

const getVisibleCount = (valuesAtBreakpoint) => {
  const windowWidth = window.screen.width

  const valuesInSequence = [
    { sm: valuesAtBreakpoint.sm },
    { md: valuesAtBreakpoint.md },
    { lg: valuesAtBreakpoint.lg },
    { xl: valuesAtBreakpoint.xl },
    { '2xl': valuesAtBreakpoint['2xl'] },
  ].filter(obj => !!Object.values(obj)[0])

  let effectiveValue = valuesAtBreakpoint.base ?? 5

  for (const obj of valuesInSequence) {
    const bp = Object.keys(obj)[0]
    const value = Object.values(obj)[0]

    if (windowWidth >= breakpoints[bp]) effectiveValue = value
    else break
  }

  return effectiveValue
}

export default getVisibleCount
