import { isNullOrUndefined } from '@arpansaha13/utils'
import { memo } from 'react'
import type { Image } from '~/types'

interface PictureProps {
  picture: Image
  alt: string
}

const Picture = memo(
  ({ picture, alt }: PictureProps) => {
    return (
      <picture className='w-full h-full object-cover'>
        {!isNullOrUndefined(picture.sources) &&
          picture.sources.map((source, i) => (
            <source key={i} media={source.media} srcSet={source.srcSet} type={source.type} />
          ))}
        <img src={picture.src} alt={alt} className='w-full h-full object-cover' />
      </picture>
    )
  },
  (prev, next) => prev.picture.src === next.picture.src
)

export default Picture
