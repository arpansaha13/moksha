export default function DefaultBg() {
  return (
    <>
      <picture>
        <source media='(max-width: 639px)' srcSet='/images/bg/default-626x808.webp' type='image/webp' />
        <source media='(max-width: 639px)' srcSet='/images/bg/default-626x808.png' type='image/png' />

        <img
          role='presentation'
          src='/images/bg/default-974x846.png'
          alt=''
          className='fixed w-screen h-screen object-cover'
          aria-hidden={true}
        />
      </picture>

      <span role='presentation' className='fixed w-screen h-screen z-10 bg-darkBrown/70 mix-blend-darken' />
    </>
  )
}
