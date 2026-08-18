import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useNavigation } from '../context/NavigationContext'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import homeEventStyles from '../components/HomeEvent.module.css'
import styles from '../components/TheoryFest.module.css'
import poshStyles from './PoshGnash.module.css'

const MEROPRIYATIYA_NAV = [
  { href: '/', label: 'Главная' },
  { href: '/articles', label: 'Статьи' },
  { href: '/interviews', label: 'Интервью' },
  { href: '/playlists', label: 'Плейлисты' },
  { href: '/about', label: 'О нас' },
]

export default function MeropriyatiyaPage() {
  const { setNavLinks } = useNavigation()

  useEffect(() => {
    setNavLinks(MEROPRIYATIYA_NAV)
  }, [setNavLinks])

  return (
    <>
      <Head>
        <title>Мероприятия — Clure</title>
      </Head>
      <Hero title="Мероприятия." fontFamily="sans" scrollTarget="events" />

      <section className={homeEventStyles.highlight}>
        <h2 className={homeEventStyles.title}>Жизнь блаженным</h2>
        <p className={homeEventStyles.support}>+ Макс Мухин</p>
        <div className={homeEventStyles.buttonGroup}>
          <Link href="/zhizn-blazhennym" className={homeEventStyles.eventButton}>
            <p className={homeEventStyles.eventDate}>10 октября</p>
            <p className={homeEventStyles.eventLocation}>Москва — место Зангези — 18+</p>
          </Link>
          <Link href="/zhizn-blazh-piter" className={homeEventStyles.eventButton}>
            <p className={homeEventStyles.eventDate}>18 октября</p>
            <p className={homeEventStyles.eventLocation}>Питер — мачты — 18+</p>
          </Link>
        </div>
      </section>

      <Link href="/poshgnash" style={{ textDecoration: 'none', color: 'inherit' }}>
        <section style={{ width: '100%', background: '#fff', cursor: 'pointer' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5vw', padding: '40px 24px', textAlign: 'center' }}>
            <h2 className={poshStyles.headline} style={{ fontSize: 'clamp(4.2rem, 8vw, 8rem)', margin: 0, cursor: 'pointer', whiteSpace: 'nowrap', overflowWrap: 'normal' }}>ПОШ ГНАШ</h2>
            <p className={poshStyles.subtitle} style={{ color: '#000', margin: 0, marginTop: '1.5em', maxWidth: 'none' }}>
              20 ИЮНЯ<br /><span className={poshStyles.subtitleInline}>МОСКВА, МЕСТО ЗАНГЕЗИ</span><br />18+
            </p>
          </div>
        </section>
      </Link>

      <section className={styles.page} style={{ minHeight: 'auto' }} id="events">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5vw', padding: '40px 24px', textAlign: 'center' }}>
          <Link href="/theory-fest" style={{ textDecoration: 'none' }}>
            <h2 className={styles.title} style={{ fontSize: 'clamp(36px, 7vw, 110px)', margin: 0, cursor: 'pointer' }}>Clure Theory Fest</h2>
          </Link>
          <div className={styles.infoRow} style={{ marginTop: 0 }}>
            <span>18<br className={styles.mobileBr} /> апреля</span>
            <span>москва<span className={styles.serifComma}>,</span><br className={styles.mobileBr} /> <a href="https://t.me/npo_melody" target="_blank" rel="noopener noreferrer" className={styles.infoLink}>нпо мелодия</a></span>
            <span>18+</span>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
