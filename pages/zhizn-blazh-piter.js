import { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useNavigation } from '../context/NavigationContext'
import Footer from '../components/Footer'
import styles from '../components/Piter.module.css'

const NAV_LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/articles', label: 'Статьи' },
  { href: '/interviews', label: 'Интервью' },
  { href: '/playlists', label: 'Плейлисты' },
  { href: '/meropriyatiya', label: 'Мероприятия' },
  { href: '/about', label: 'О нас' },
]

const TICKET_URL = 'https://t.me/cluremag'

export default function PiterZhiznBlazhennymPage() {
  const { setNavLinks, setAccentColor } = useNavigation()
  const ACCENT_COLOR = 'rgba(33, 25, 29, 0.96)'

  useEffect(() => {
    setNavLinks(NAV_LINKS)
    setAccentColor(ACCENT_COLOR)
    return () => setAccentColor(undefined)
  }, [setNavLinks, setAccentColor])

  return (
    <div className={styles.page}>
      <Head>
        <title>Жизнь блаженным — Clure</title>
        <meta name="theme-color" content="#020a2d" />
        <style>{`
          @media only screen and (max-width: 900px) {
            html, body { background: #020a2d !important; }
          }
        `}</style>
      </Head>

      <main className={styles.main}>
        <section className={styles.poster}>
          <img
            src="/images/ПИТЕР.webp"
            alt="Постер Жизнь блаженным — Питер"
            className={styles.posterImage}
          />
        </section>

        <section className={styles.ticketSection}>
          <button
            type="button"
            className={styles.ticketButton}
            data-tc-event="6a7f1323f387f1041c7aff7e"
            data-tc-token="eyJhbGciOiJIUzI1NiIsImlzcyI6InRpY2tldHNjbG91ZC5ydSIsInR5cCI6IkpXVCJ9.eyJwIjoiNjlhNzI4NWI4YWQwMTllNzFlODljMjliIn0.7Oreh61Lt5J0lbo4pXAw37BV6uokCjEzuLQNCjcs7ZQ"
          >
            Купить билет
          </button>
        </section>
      </main>

      <Footer overlayColor="rgba(33, 25, 29, 0.92)" shadowColor="rgba(33, 25, 29, 0.6)" />
      <Script src="https://ticketscloud.com/static/scripts/widget/tcwidget.js" strategy="afterInteractive" />
    </div>
  )
}
