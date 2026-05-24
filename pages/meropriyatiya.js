import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useNavigation } from '../context/NavigationContext'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
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

      <Link href="/poshgnash" style={{ textDecoration: 'none', color: 'inherit' }}>
        <section style={{ width: '100%', background: '#fff', cursor: 'pointer' }}>
          <div className={styles.hero} style={{ background: '#fff', color: '#000', paddingTop: '60px', paddingBottom: '2vw', minHeight: '23vw' }}>
            <p className={poshStyles.headline} style={{ color: '#000', WebkitTextStrokeColor: '#000', textStrokeColor: '#000', display: 'inline-flex', justifyContent: 'center' }}>
              <span className={poshStyles.headlineWord}>ПОШ</span>
              <span className={poshStyles.headlineWide}>ГНАШ</span>
            </p>
            <p className={poshStyles.subtitle} style={{ color: '#000', textTransform: 'uppercase', marginTop: '3em', maxWidth: 'none', letterSpacing: '0.16em' }}>
              20 ИЮНЯ<br />МОСКВА, МЕСТО ЗАНГЕЗИ<br />18+
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
