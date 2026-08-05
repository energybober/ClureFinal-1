import { useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useNavigation } from '../context/NavigationContext'
import Footer from '../components/Footer'
import styles from '../components/ZhiznBlazhennym.module.css'

const NAV_LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/articles', label: 'Статьи' },
  { href: '/interviews', label: 'Интервью' },
  { href: '/playlists', label: 'Плейлисты' },
  { href: '/meropriyatiya', label: 'Мероприятия' },
  { href: '/about', label: 'О нас' },
]

const TICKET_URL = 'https://t.me/cluremag'

export default function ZhiznBlazhennymPage() {
  const { setNavLinks, setAccentColor } = useNavigation()
  const ACCENT_COLOR = 'rgba(2, 10, 45, 0.95)'

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
            src="/images/ZhiznBlazh.webp"
            alt="Постер Жизнь блаженным — 10 октября в Москве, место Зангези"
            className={styles.posterImage}
          />
        </section>

        <section className={styles.ticketSection}>
          <button
            type="button"
            className={styles.ticketButton}
            data-tc-event="6a723ca79f4fc46862222b3a"
            data-tc-token="eyJhbGciOiJIUzI1NiIsImlzcyI6InRpY2tldHNjbG91ZC5ydSIsInR5cCI6IkpXVCJ9.eyJwIjoiNjlhNzI4NWI4YWQwMTllNzFlODljMjliIn0.7Oreh61Lt5J0lbo4pXAw37BV6uokCjEzuLQNCjcs7ZQ"
          >
            Купить билет
          </button>
        </section>
      </main>

      <Footer overlayColor="rgba(2, 10, 45, 0.95)" shadowColor="rgba(2, 10, 45, 0.45)" />
      <Script src="https://ticketscloud.com/static/scripts/widget/tcwidget.js" strategy="afterInteractive" />
    </div>
  )
}
