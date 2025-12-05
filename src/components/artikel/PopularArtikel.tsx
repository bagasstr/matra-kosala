import { Card, CardContent } from '@/components/ui/card'
import { articles } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

export default function PopularArtikel() {
  const [featuredArticle, ...sideArticles] = articles

  return (
    <section className='py-24'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <h2 className='text-xl font-medium text-primary-dark mb-6'>
          Artikel Terpopuler
        </h2>
        <div className='grid lg:grid-cols-[2fr_1fr] gap-4'>
          {/* Featured Article */}
          <Card className='overflow-hidden bg-white'>
            <Link href={featuredArticle.slug}>
              <div className='relative aspect-video'>
                <Image
                  src={featuredArticle.url_gambar}
                  alt={featuredArticle.judul}
                  fill
                  className='object-cover'
                  priority
                />
              </div>
              <CardContent className='p-4'>
                <time className='text-xs text-muted-foreground'>
                  {featuredArticle.date}
                </time>
                <h3 className='text-xl font-medium text-primary-dark mt-2 mb-2'>
                  {featuredArticle.judul}
                </h3>
                {featuredArticle.konten && (
                  <p className='text-sm text-muted-foreground line-clamp-2'>
                    {featuredArticle.konten}
                  </p>
                )}
              </CardContent>
            </Link>
          </Card>
          {/* Side Articles */}
          <div className='space-y-4'>
            {sideArticles
              .slice(0, 3) // Ambil 3 data pertama
              .map((article) => (
                <Card
                  key={article.id}
                  className='overflow-hidden flex bg-white'>
                  <Link href={article.slug} className='flex'>
                    <div className='relative w-44 h-44 flex-shrink-0'>
                      <Image
                        src={article.url_gambar}
                        alt={article.judul}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <CardContent className='flex-1 p-3'>
                      <time className='text-xs text-muted-foreground'>
                        {article.date}
                      </time>
                      <h3 className='text-sm font-medium text-primary-dark mt-1 '>
                        {article.judul}
                      </h3>
                    </CardContent>
                  </Link>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
