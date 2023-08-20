export default function MokshaLogo() {
  return (
    <picture>
      <source srcSet='/moksha/moksha-64x64.webp' type='image/webp' />
      <source srcSet='/moksha/moksha-64x64.png' type='image/png' />

      <img src='/moksha/moksha-64x64.png' alt='Moksha logo' className='w-full h-full' />
    </picture>
  )
}
