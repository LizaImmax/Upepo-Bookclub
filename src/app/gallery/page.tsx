import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

async function getGalleryPosts() {
  try {
    const posts = await prisma.galleryPost.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return posts
  } catch (error) {
    console.error('Error fetching gallery posts:', error)
    return []
  }
}

export default async function GalleryPage() {
  const posts = await getGalleryPosts()

  const categories = ['All', 'Reading Nook', 'Coffee & Wine', 'Book Notes', 'Quotes', 'Other']

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-upepo-600 via-wind-600 to-upepo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-display font-extrabold mb-6 tracking-tight">
              📸 Reading Gallery
            </h1>
            <p className="text-2xl opacity-95 font-light mb-8">
              Share your cozy reading moments, beautiful book notes, and favorite reading spots
            </p>
            <Link href="/gallery/new" className="btn-primary bg-white text-upepo-600 hover:bg-gray-50">
              Share Your Moment ✨
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all
                  bg-gradient-to-r from-upepo-100 to-wind-100 text-upepo-800
                  hover:from-upepo-200 hover:to-wind-200 border border-upepo-300"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="card group overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden rounded-t-2xl">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-upepo-600 to-wind-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {post.category}
                      </span>
                    </div>
                    {/* Likes */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        ❤️ {post.likes}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-upepo-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    {/* User Info */}
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-upepo-400 to-wind-400 flex items-center justify-center text-white font-bold">
                        {post.user.name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{post.user.name || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-9xl mb-6">📷</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">No Posts Yet</h2>
              <p className="text-xl text-gray-600 mb-8">
                Be the first to share your reading moment!
              </p>
              <Link href="/gallery/new" className="btn-primary">
                Share Your First Post ✨
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
