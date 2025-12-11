import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

export default async function DiscussionsPage({ 
  searchParams 
}: { 
  searchParams: { bookId?: string } 
}) {
  const discussions = await prisma.discussion.findMany({
    where: searchParams.bookId ? { bookId: searchParams.bookId } : undefined,
    include: {
      book: {
        select: {
          id: true,
          title: true,
          author: true,
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    },
    orderBy: [
      { isPinned: 'desc' },
      { createdAt: 'desc' }
    ]
  })

  const currentBook = searchParams.bookId 
    ? await prisma.book.findUnique({
        where: { id: searchParams.bookId },
        select: { id: true, title: true }
      })
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 decorative-pattern">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-6xl font-display font-extrabold mb-3 elegant-heading">
                💬 Community Discussions
              </h1>
              {currentBook && (
                <p className="text-xl text-gray-600">For: <span className="font-semibold">{currentBook.title}</span></p>
              )}
            </div>
            <Link 
              href="/discussions/new"
              className="btn-primary inline-flex items-center gap-2 whitespace-nowrap"
            >
              Start Discussion ✨
            </Link>
          </div>

          {discussions.length === 0 ? (
            <div className="card cozy-shadow text-center py-16 bg-white">
              <div className="text-7xl mb-6">💭</div>
              <p className="text-2xl text-gray-600 mb-6">No discussions yet</p>
              <Link 
                href="/discussions/new"
                className="btn-primary inline-flex items-center gap-2"
              >
                Be the first to start one →
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {discussions.map((discussion) => (
                <Link 
                  key={discussion.id}
                  href={`/discussions/${discussion.id}`}
                  className="card cozy-shadow hover:shadow-2xl transition-all duration-300 block bg-white group hover:bg-gradient-to-br hover:from-white hover:to-upepo-50 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {discussion.isPinned && <span className="text-3xl">📌</span>}
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-upepo-600 transition-colors">{discussion.title}</h2>
                      </div>
                      <p className="text-gray-600 mb-2 text-lg">
                        <span className="font-semibold">{discussion.book.title}</span> by {discussion.book.author}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider whitespace-nowrap ${
                      discussion.type === 'WEEKLY' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700' :
                      discussion.type === 'MIDMONTH' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700' :
                      discussion.type === 'ENDMONTH' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700' :
                      'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'
                    }`}>
                      {discussion.type}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2 text-lg leading-relaxed">{discussion.content}</p>
                  <div className="flex items-center gap-6 text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💬</span>
                      <span className="font-semibold">{discussion._count.comments} comments</span>
                    </div>
                    <span>•</span>
                    <span className="font-semibold">{format(discussion.createdAt, 'MMM d, yyyy')}</span>
                  </div>
                  </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
