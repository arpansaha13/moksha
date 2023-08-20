import Container from '~common/Container'
import styles from './styles.module.css'

const media = {
  mobile: '(max-width: 639px)',
  aboveMobile: '(min-width: 640px)',
}
const type = {
  webp: 'image/webp',
  png: 'image/png',
}

const ProNightTeaser = () => (
  <div className='relative z-10 origin-top-right sm:origin-top-left scale-125 sm:scale-110'>
    <picture>
      <source
        srcSet='/images/home/teaser-pro/poster-256x256.webp, /images/home/teaser-pro/poster-512x512.webp 2x, /images/home/teaser-pro/poster-1080x1080.webp 3x'
        type={type.webp}
      />
      <source
        srcSet='/images/home/teaser-pro/poster-256x256.png, /images/home/teaser-pro/poster-512x512.png 2x, /images/home/teaser-pro/poster-1080x1080.png 3x'
        type={type.png}
      />

      <img
        src='/images/home/teaser-pro/poster-1080x1080.png'
        alt='Teaser poster for Pro Night'
        className='object-cover shadow-lg'
      />
    </picture>
  </div>
)

const EdmNightTeaser = () => (
  <div className='relative z-20 sm:z-0 sm:-translate-y-8 sm:scale-90'>
    <picture>
      <source
        media={media.mobile}
        srcSet='/images/home/teaser-edm/poster-256x256.webp, /images/home/teaser-edm/poster-512x512.webp 2x, /images/home/teaser-edm/poster-1080x1080.webp 3x'
        type={type.webp}
      />
      <source
        media={media.mobile}
        srcSet='/images/home/teaser-edm/poster-256x256.png, /images/home/teaser-edm/poster-512x512.png 2x, /images/home/teaser-edm/poster-1080x1080.png 3x'
        type={type.png}
      />
      <source media={media.aboveMobile} srcSet='/images/home/teaser-edm/poster-1200x628.webp' type={type.webp} />
      <source media={media.aboveMobile} srcSet='/images/home/teaser-edm/poster-1200x628.png' type={type.png} />

      <img
        src='/images/home/teaser-edm/poster-1200x628.png'
        alt='Teaser poster for EDM Nights'
        className='object-cover shadow-lg'
      />
    </picture>
  </div>
)

const EleganciaTeaser = () => (
  <div className='translate-x-4 -translate-y-4 sm:translate-x-0 sm:translate-y-0 sm:origin-bottom-right sm:scale-110'>
    <picture>
      <source
        media={media.mobile}
        srcSet='/images/home/teaser-elegancia/poster-256x455.webp, /images/home/teaser-elegancia/poster-607x1080.webp 2x'
        type={type.webp}
      />
      <source
        media={media.mobile}
        srcSet='/images/home/teaser-elegancia/poster-256x455.png, /images/home/teaser-elegancia/poster-607x1080.png 2x'
        type={type.png}
      />
      <source
        media={media.aboveMobile}
        srcSet='/images/home/teaser-elegancia/poster-256x256.webp, /images/home/teaser-elegancia/poster-512x512.webp 2x, /images/home/teaser-elegancia/poster-1080x1080.webp 3x'
        type={type.webp}
      />
      <source
        media={media.aboveMobile}
        srcSet='/images/home/teaser-elegancia/poster-256x256.png, /images/home/teaser-elegancia/poster-512x512.png 2x, /images/home/teaser-elegancia/poster-1080x1080.png 3x'
        type={type.png}
      />

      <img
        src='/images/home/teaser-elegancia/poster-1080x1080.png'
        alt='Teaser poster for Elegancia fashion show'
        className='object-cover shadow-lg'
      />
    </picture>
  </div>
)

export default function Specials() {
  return (
    <section className={styles['specials-bg']}>
      <Container className='lg:h-cover pt-8 pb-4 sm:py-4 md:py-12 flex items-center justify-center'>
        <div className='grid grid-rows-[repeat(4,_minmax(0,_min-content))] grid-cols-2 sm:grid-rows-none sm:grid-cols-5'>
          <div className='col-span-2 sm:col-span-3 sm:col-start-1'>
            <h2 className='mb-4'>
              <p className='text-lg sm:text-xl font-light'>The</p>
              <p className='text-5xl lg:text-6xl font-bold'>Specials</p>
            </h2>
            <div className='!max-w-lg pb-4 sm:pb-0 markdown'>
              <p>
                Embark on a journey of creativity, passion, and excitement during the first three days of our cultural
                fest, as we unveil extraordinary events that redefine entertainment.
              </p>
            </div>
          </div>

          <div className='col-start-2 sm:col-start-auto'>
            <ProNightTeaser />
          </div>

          <div className='row-start-3 col-start-2 sm:col-span-2 sm:row-start-2 sm:col-start-3'>
            <EdmNightTeaser />
          </div>

          <div className='row-start-3 col-start-1 row-span-2 sm:row-start-2 sm:col-start-5 sm:row-span-1'>
            <EleganciaTeaser />
          </div>
        </div>
      </Container>
    </section>
  )
}
