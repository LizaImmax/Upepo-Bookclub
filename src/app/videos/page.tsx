import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getVideos() {
  try {
    const sessions = await prisma.liveSession.findMany({
      where: {
        videoUrl: { not: null }
      },
      include: {
        book: {
          select: {
            title: true,
            author: true,
            coverImage: true
          }
        }
      },
      orderBy: { scheduledAt: 'desc' }
    })
    return sessions
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export default async function VideosPage() {
  const videos = await getVideos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-upepo-600 via-wind-600 to-upepo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-display font-extrabold mb-6 tracking-tight">
              🎥 Video Library
            </h1>
            <p className="text-2xl opacity-95 font-light mb-4">
              Replay our live discussions and author conversations
            </p>
            <p className="text-lg opacity-90">
              Catch up on sessions you missed or revisit your favorite moments
            </p>
          </div>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {videos.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {videos.map((session) => (
                <div
                  key={session.id}
                  className="card group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-700 rounded-t-2xl overflow-hidden">
                    {session.videoThumbnail ? (
                      <img
                        src={session.videoThumbnail}
                        alt={session.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-7xl mb-4">🎬</div>
                          <p className="text-white text-xl font-semibold">Video Recording</p>
                        </div>
                      </div>
                    )}
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <div className="text-4xl text-upepo-600">▶️</div>
                      </div>
                    </div>
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                      {session.duration} min
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {session.book.coverImage && (
                        <img
                          src={session.book.coverImage}
                          alt={session.book.title}
                          className="w-16 h-24 object-cover rounded-lg shadow-md"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-upepo-600 transition-colors">
                          {session.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          📚 {session.book.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          by {session.book.author}
                        </p>
                      </div>
                    </div>

                    {session.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {session.description}
                      </p>
                    )}

                    {session.summary && (
                      <div className="mb-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                        <p className="text-sm font-semibold text-gray-800 mb-1">📝 Key Takeaways:</p>
                        <p className="text-sm text-gray-700 line-clamp-3">{session.summary}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-500">
                        📅 {new Date(session.scheduledAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <Link
                        href={session.videoUrl || '#'}
                        target="_blank"
                        className="btn-primary text-sm px-6 py-2"
                      >
                        Watch Now 🎥
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-9xl mb-6">🎥</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">No Videos Yet</h2>
              <p className="text-xl text-gray-600 mb-8">
                Video recordings of our live sessions will appear here
              </p>
              <Link href="/sessions" className="btn-primary">
                View Upcoming Sessions
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center elegant-heading">
              Never Miss a Moment
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-6xl mb-4">⏯️</div>
                <h3 className="text-xl font-bold mb-2">Watch Anytime</h3>
                <p className="text-gray-600">
                  Access recordings 24/7 at your own pace
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-2">Key Insights</h3>
                <p className="text-gray-600">
                  Read summaries before watching
                </p>
              </div>
              <div className="text-center p-6">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-xl font-bold mb-2">Bookmark & Share</h3>
                <p className="text-gray-600">
                  Save your favorites and share with friends
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
