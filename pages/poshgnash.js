import { useEffect } from 'react'
import Head from 'next/head'
import { useNavigation } from '../context/NavigationContext'
import Footer from '../components/Footer'
import styles from './PoshGnash.module.css'

const NAV_LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/articles', label: 'Статьи' },
  { href: '/interviews', label: 'Интервью' },
  { href: '/playlists', label: 'Плейлисты' },
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
          <img
            src="/images/afisha_full.png"
            alt="Постер Posh Gnash — большой сольный концерт 20 июня в Москве, место Зангези"
            className={styles.posterImage}
          />
        </section>

        <section className={styles.photoSection}>
          {[
            '/images/ПошГнаш1.webp',
            '/images/ПошГнаш2.webp',
            '/images/ПошГнаш3.webp',
            '/images/ПошГнаш4.webp',
            '/images/ПошГнаш5.webp',
          ].map((src, index) => (
            <div key={src} className={styles.photoCard}>
              <img src={src} alt={`Фото Posh Gnash ${index + 1}`} />
            </div>
          ))}
        </section>
      </main>

      <Footer blackWhite />
    </div>
  )
}
