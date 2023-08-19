import Container from '~common/Container'
import styles from './styles.module.css'

export default function Hero() {
  return (
    <section className={styles['hero-bg']}>
      <Container className='h-cover flex items-center justify-center'></Container>
    </section>
  )
}
