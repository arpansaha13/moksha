import { nlc } from './nlc'
import { aaveg } from './aaveg'
import { dzire } from './dzire'
import { malhar } from './malhar'
import { pixels } from './pixels'
import { fineArts } from './fine-arts'
import { collab } from './collab'
import type { ClubSlug, Contest } from '~/types'

const mokshaContests = Object.freeze<{ [key in ClubSlug]?: Contest[] }>({
  nlc: nlc,
  dzire: dzire,
  pixels: pixels,
  aaveg: aaveg,
  malhar: malhar,
  'fine-arts': fineArts,
  collabs: collab,
})

export default mokshaContests
