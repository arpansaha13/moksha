import { Helmet } from 'react-helmet'
import Hero from '~/components/Home/Hero'
import Specials from '~/components/Home/Specials'
import styles from '~/components/Home/styles.module.css'

export function Component() {
  return (
    <>
      <Helmet>
        <title>Moksha | Home</title>
      </Helmet>

      <main className={styles['home']}>
        <Hero />
        <Specials />
      </main>
    </>
  )
}

Component.displayName = 'Home'
