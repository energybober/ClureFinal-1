import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import client from '../lib/sanity'
import { useNavigation } from '../context/NavigationContext'
import Hero from '../components/Hero'
import ArticlesList from '../components/ArticlesList'
import News from '../components/News'
import Footer from '../components/Footer'
import tfStyles from '../components/TheoryFest.module.css'
import poshStyles from './PoshGnash.module.css'

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
      <section style={{ background: '#87c1d3' }}>
        <News interviews={interviews} playlists={playlists} max={3} />
      </section>

      <main style={{ background: '#87c1d3' }}>
        <ArticlesList items={articles} />
      </main>

      <Link href="/poshgnash" style={{ textDecoration: 'none', color: 'inherit' }}>
        <section style={{ width: '100%', background: '#fff', cursor: 'pointer' }}>
          <div className={tfStyles.hero} style={{ background: '#fff', color: '#000', paddingTop: '60px', paddingBottom: '2vw', minHeight: '23vw' }}>
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

      <Footer />

      {/* Load tickets widget only on user interaction or idle to avoid blocking the main thread */}
      <script
        dangerouslySetInnerHTML={{ __html: `
          (function(){
            if ('requestIdleCallback' in window) {
              requestIdleCallback(function(){
                var s = document.createElement('script');
                s.src = 'https://ticketscloud.com/static/scripts/widget/tcwidget.js';
                s.async = true;
                document.body.appendChild(s);
              }, {timeout:3000});
            }
          })();
        ` }}
      />
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
