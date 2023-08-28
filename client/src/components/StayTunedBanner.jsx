export default function StayTunedBanner() {
  return (
    <div className='flex items-center justify-center'>
      <div className='p-10 w-64 h-64 relative flex items-center justify-center'>
        <span className='absolute inset-0 bg-amber-950/90 blur-xl rounded-full' />
        <picture className='w-full h-full mix-blend-overlay'>
          <source srcSet='/moksha/moksha-256x256.webp, /moksha/moksha-512x512.webp 2x' type='image/webp' />
          <source srcSet='/moksha/moksha-256x256.png, /moksha/moksha-512x512.png 2x' type='image/png' />

          <img src='/moksha/moksha-512x512.png' alt='Moksha Logo' />
        </picture>
      </div>

      <div className='absolute z-10 text-center mix-blend-difference translate-y-12'>
        <p className='text-white text-4xl sm:text-5xl font-bold tracking-widest uppercase'>
          Stay <span className='text-stroke'>Tuned</span>...
        </p>
        <p className='text-white text-sm font-semibold tracking-widest'>Coming soon</p>
      </div>
    </div>
  )
}
