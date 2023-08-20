export default function MokshaLogo() {
  return (
    <picture>
      <source srcSet='/moksha/moksha-64x64.webp, /moksha/moksha-192x192.webp 2x' type='image/webp' />
      <source srcSet='/moksha/moksha-64x64.png, /moksha/moksha-192x192.png 2x' type='image/png' />

      <img src='/moksha/moksha-64x64.png' alt='Moksha logo' className='w-full h-full' />
    </picture>
  )
}
