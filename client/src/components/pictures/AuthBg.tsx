export default function AuthBg() {
  return (
    <>
      <picture>
        <source media='(max-width: 639px)' srcSet='/images/bg/auth-512x756.webp' type='image/webp' />
        <source media='(max-width: 639px)' srcSet='/images/bg/auth-512x756.png' type='image/png' />

        <img
          role='presentation'
          src='/images/bg/auth-1024x758.png'
          alt=''
          className='fixed w-screen h-screen object-cover'
          aria-hidden={true}
        />
      </picture>
      <span role='presentation' className='fixed w-screen h-screen z-10 bg-darkBrown/90 mix-blend-darken' />
    </>
  )
}
