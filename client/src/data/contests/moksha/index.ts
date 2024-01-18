import { nlc } from './nlc'
import { aaveg } from './aaveg'
import { dzire } from './dzire'
import { malhar } from './malhar'
import { pixels } from './pixels'
import { wecan } from './wecan'
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
  wecan: wecan,
  collabs: collab,
})

export default mokshaContests
