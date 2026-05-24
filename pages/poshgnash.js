import { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useNavigation } from '../context/NavigationContext'
import Footer from '../components/Footer'
import styles from './PoshGnash.module.css'

const NAV_LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/articles', label: 'Статьи' },
  { href: '/interviews', label: 'Интервью' },
  { href: '/playlists', label: 'Плейлисты' },
  { href: '/poshgnash', label: 'PoshGnash' },
  { href: '/meropriyatiya', label: 'Мероприятия' },
  { href: '/about', label: 'О нас' },
]

export default function PoshGnashPage() {
  const { setNavLinks } = useNavigation()

  useEffect(() => {
    setNavLinks(NAV_LINKS)
  }, [setNavLinks])

  return (
    <div className={styles.page}>
      <Head>
        <title>PoshGnash — Clure</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.poster}>
          <h1 className={styles.headline}>
            <span className={styles.headlineWord}>ПОШ</span> <span className={styles.headlineWide}>ГНАШ</span>
          </h1>
          <p className={styles.subtitle}>большой сольный концерт</p>

          <div className={styles.graphic}>
            <div className={styles.photoFrame} aria-hidden="true">
              <div className={styles.photoInner}>
                <div className={styles.photoFace} />
              </div>
              <div className={styles.photoMask} />
            </div>

            <div className={`${styles.badge} ${styles.badgeRight}`}>МОСКВА</div>
            <div className={`${styles.badge} ${styles.badgeLeft}`}>20 ИЮНЯ</div>
            <a href="https://t.me/mestozangezi" target="_blank" rel="noopener noreferrer" className={`${styles.badge} ${styles.badgeBottom}`}>МЕСТО<br />ЗАНГЕЗИ</a>
          </div>
        </section>

        <section className={styles.ticketSection}>
          <button
            type="button"
            className={styles.ticketButton}
            data-tc-event="6a0d5ca4a79dd6341a64ca0f"
            data-tc-token="eyJhbGciOiJIUzI1NiIsImlzcyI6InRpY2tldHNjbG91ZC5ydSIsInR5cCI6IkpXVCJ9.eyJwIjoiNjlhNzI4NWI4YWQwMTllNzFlODljMjliIn0.7Oreh61Lt5J0lbo4pXAw37BV6uokCjEzuLQNCjcs7ZQ"
          >
            Купить билет
          </button>
        </section>
      </main>

      <Script
        src="https://ticketscloud.com/static/scripts/widget/tcwidget.js"
        strategy="afterInteractive"
      />

      <Footer blackWhite />
    </div>
  )
}
