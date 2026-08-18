import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import client from '../lib/sanity'
import { useNavigation } from '../context/NavigationContext'
import Hero from '../components/Hero'
import ArticlesList from '../components/ArticlesList'
import News from '../components/News'
import Footer from '../components/Footer'
import homeEventStyles from '../components/HomeEvent.module.css'

const DEFAULT_NAV = [
  { href: '/articles', label: 'Статьи' },
  { href: '/interviews', label: 'Интервью' },
  { href: '/playlists', label: 'Плейлисты' },
  { href: '/meropriyatiya', label: 'Мероприятия' },
  { href: '/about', label: 'О нас' },
]

export default function Home({ page, articles = [], interviews = [], playlists = [] }) {
  const title = page?.title || 'Clure.'
  const { setNavLinks } = useNavigation()

  useEffect(() => {
    setNavLinks(DEFAULT_NAV)
  }, [setNavLinks])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Hero scrollTarget="news" />

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
            <p className={homeEventStyles.eventLocation}>Питер — мачты — 16+</p>
          </Link>
        </div>
      </section>

      <section style={{ background: '#87c1d3' }}>
        <News interviews={interviews} playlists={playlists} max={3} />
      </section>

      <main style={{ background: '#87c1d3' }}>
        <ArticlesList items={articles} />
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  let page = null
  let articles = []
  let interviews = []
  let playlists = []
  try {
    page = await client.fetch('*[_type == "page"][0]{title, body}')
    articles = await client.fetch('*[_type == "article"] | order(publishedAt desc)[0...4]{_id, title, excerpt, slug, publishedAt, mainImage, author->{name, slug, image}}')
    interviews = await client.fetch('*[_type == "interview"] | order(publishedAt desc)[0...6]{_id, title, excerpt, slug, publishedAt, guest, interviewer->{name}}')
    playlists = await client.fetch('*[_type == "playlist"] | order(order desc, _createdAt desc)[0...6]{_id, title, url, platform, description, _createdAt, author->{name}}')
  } catch (e) {
    // ignore if Sanity is not configured yet
  }
  return { props: { page: page || null, articles: articles || [], interviews: interviews || [], playlists: playlists || [] } }
}
