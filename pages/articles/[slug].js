import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import client from '../../lib/sanity'
import urlFor from '../../lib/imageUrl'
import slugify from '../../lib/slugify'
import { useNavigation } from '../../context/NavigationContext'
import Footer from '../../components/Footer'
import styles from '../../components/ArticlePage.module.css'

function getVideoEmbedUrl(url) {
  if (!url) return null

  try {
    const parsedUrl = new URL(url)
    const host = parsedUrl.hostname.toLowerCase()

    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      const videoId = parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').filter(Boolean).pop()
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (host.includes('vimeo.com')) {
      const match = parsedUrl.pathname.match(/\/(\d+)(?:\/|$)/)
      return match ? `https://player.vimeo.com/video/${match[1]}` : null
    }
  } catch {
    return null
  }

  return null
}

const portableTextComponents = {
  block: {
    normal: ({ children }) => <p className={styles.rtParagraph}>{children}</p>,
    h2: ({ children }) => <h2 className={styles.rtH2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.rtH3}>{children}</h3>,
    blockquote: ({ children }) => <blockquote className={styles.rtBlockquote}>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className={styles.rtLink}>
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = urlFor(value).width(1000).auto('format').url()
      return (
        <figure className={styles.rtFigure}>
          <img src={src} alt={value.alt || ''} className={styles.rtImage} />
          {value.caption && <figcaption className={styles.rtCaption}>{value.caption}</figcaption>}
        </figure>
      )
    },
    video: ({ value }) => {
      const embedUrl = getVideoEmbedUrl(value?.url)

      if (embedUrl) {
        return (
          <div className={styles.rtVideoWrapper}>
            <iframe
              src={embedUrl}
              title={value.caption || 'Video'}
              className={styles.rtVideoEmbed}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {value.caption && <p className={styles.rtCaption}>{value.caption}</p>}
          </div>
        )
      }

      if (value?.url) {
        return (
          <div className={styles.rtVideoWrapper}>
            <video controls className={styles.rtVideoNative} src={value.url} />
            {value.caption && <p className={styles.rtCaption}>{value.caption}</p>}
          </div>
        )
      }

      return null
    },
  },
}

const queryBySlug = `*[_type == "article" && slug.current == $slug][0]{
  _id, title, excerpt, body, publishedAt, mainImage, author->{name, slug, image}, playlist->{title, url, platform}
}`

const queryMore = `*[_type == "article" && slug.current != $slug] | order(publishedAt desc)[0...3]{
  _id, title, slug, publishedAt, mainImage, author->{name, slug}
}`

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function formatShortDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const ARTICLES_NAV = [
  { href: '/', label: 'Главная' },
  { href: '/interviews', label: 'Интервью' },
  { href: '/playlists', label: 'Плейлисты' },
  { href: '/meropriyatiya', label: 'Мероприятия' },
  { href: '/about', label: 'О нас' },
]

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "article" && defined(slug.current)]{ "slug": slug.current }`)
  const paths = (slugs || []).map((s) => ({ params: { slug: s.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const slug = params.slug
  const [article, moreArticles] = await Promise.all([
    client.fetch(queryBySlug, { slug }),
    client.fetch(queryMore, { slug }),
  ])

  if (!article) {
    return { notFound: true }
  }

  return {
    props: { article, moreArticles: moreArticles || [], slug },
  }
}

export default function ArticlePage({ article, moreArticles = [], slug }) {
  const { setNavLinks } = useNavigation()
  const imageUrl = article.mainImage
    ? urlFor(article.mainImage).width(1600).height(900).auto('format').url()
    : null

  useEffect(() => {
    setNavLinks(ARTICLES_NAV)
  }, [setNavLinks])

  return (
    <>
      <Head>
        <title>{article.title} — Clure</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://clure.ru/" },
                { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://clure.ru/articles" },
                { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://clure.ru/articles/${slug}` }
              ]
            })
          }}
        />
      </Head>
      <div className={styles.page}>
        <main className={styles.body}>
          {/* ── Header ── */}
          <header className={styles.header}>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <div className={styles.metaRow}>
              {article.author?.name && (
                <Link href={`/authors/${slugify(article.author.name)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {article.author.name}
                </Link>
              )}
              {article.author?.name && article.publishedAt && <span>·</span>}
              {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
            </div>
          </header>

          {/* ── Hero image ── */}
          {imageUrl && (
            <section className={styles.heroImage}>
              <img
                src={imageUrl}
                alt={article.mainImage?.alt || article.title}
                className={styles.heroImg}
              />
            </section>
          )}

          {/* ── Intro ── */}
          {article.excerpt && (
            <section className={styles.intro}>
              <p className={styles.introText}>{article.excerpt}</p>
            </section>
          )}

          {/* ── Playlist ── */}
          {article.playlist?.url && (
            <section className={styles.playlistSection}>
              <a
                href={article.playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.playlistLink}
              >
                <span className={styles.playlistIcon}>♫</span>
                <span className={styles.playlistText}>
                  <span className={styles.playlistTitle}>{article.playlist.title}</span>
                  <span className={styles.playlistCta}>Слушать плейлист →</span>
                </span>
              </a>
            </section>
          )}

          {/* ── Article body ── */}
          <article className={styles.articleSection}>
            <div className={styles.articleContent}>
              <div className={styles.richText}>
                {article.body && <PortableText value={article.body} components={portableTextComponents} />}
              </div>
            </div>
          </article>

          {/* ── More articles ── */}
          {moreArticles.length > 0 && (
            <aside className={styles.moreSection}>
              <h2 className={styles.moreLabel}>Больше статей</h2>
              <div className={styles.moreList}>
                {moreArticles.map((item) => {
                  const img = item.mainImage
                    ? urlFor(item.mainImage).width(600).height(760).auto('format').url()
                    : null
                  return (
                    <Link
                      key={item._id}
                      href={`/articles/${item.slug?.current || ''}`}
                      className={styles.moreCard}
                    >
                      <div className={styles.moreCardImage}>
                        {img && (
                          <img src={img} alt={item.title} className={styles.moreCardImg} />
                        )}
                      </div>
                      <div className={styles.moreCardContent}>
                        <span className={styles.moreCardTitle}>{item.title}</span>
                        <div className={styles.moreCardMeta}>
                          {item.author?.name && <span>{item.author.name}</span>}
                          {item.author?.name && item.publishedAt && <span>·</span>}
                          {item.publishedAt && <span>{formatShortDate(item.publishedAt)}</span>}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </aside>
          )}
        </main>
      </div>

      <Footer />
    </>
  )
}
