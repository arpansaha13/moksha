import { classNames } from '@arpansaha13/utils'
import Container from '~common/Container'
import styles from './styles.module.css'

export default function Hero() {
  const imageSizeStyles = 'w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 xl:w-80 xl:h-80'

  return (
    <section className={classNames('-mt-[100px] pt-[100px] pb-4 sm:pb-8', styles['hero-bg'])}>
      <Container className='grid grid-cols-1 gap-y-4 sm:grid-cols-2'>
        <div className='flex items-center'>
          <div>
            <h1 className='mt-1 text-lg text-red-500 font-semibold'>Moksha</h1>
            <p className='text-5xl font-bold'>Rise like a Phoenix</p>

            <div className='mt-4 md:mt-6 markdown'>
              <p>
                Imagine a mythical bird, the Phoenix, that&apos;s about to come back to life. It&apos;s like it&apos;s
                waking up from ashes after burning away.
              </p>
            </div>
          </div>
        </div>

        <div className='py-8 sm:py-16 flex items-center justify-center sm:justify-end xl:justify-center relative mix-blend-lighten'>
          <div
            className={classNames(
              imageSizeStyles,
              styles['hero-img-shadow'],
              'absolute rounded-full bg-black border border-yellow-300'
            )}
          />
          <picture>
            <source srcSet='/moksha/moksha-512x512.webp, /moksha/moksha-1024x1024.webp 2x' type='image/webp' />
            <source srcSet='/moksha/moksha-512x512.png, /moksha/moksha-1024x1024.png 2x' type='image/png' />

            <img
              src='/moksha/moksha-1024x1024.png'
              alt='Moksha logo as hero image'
              className={classNames(imageSizeStyles, 'mix-blend-hard-light')}
            />
          </picture>
        </div>
      </Container>
    </section>
  )
}
