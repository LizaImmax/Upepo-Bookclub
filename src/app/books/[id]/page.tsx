import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await prisma.book.findUnique({
    where: { id: params.id },
    include: {
      weeklyPlans: {
        include: {
          prompts: {
            orderBy: { order: 'asc' }
          }
        },
        orderBy: { weekNumber: 'asc' }
      },
      discussions: {
        include: {
          _count: {
            select: { comments: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      },
      liveSession: true,
      monthlySummary: true
    }
  })

  if (!book) {
    notFound()
  }

  const currentWeek = book.weeklyPlans.find(plan => {
    const now = new Date()
    return now >= plan.startDate && now <= plan.endDate
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-upepo-500 to-wind-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {book.coverImage && (
              <Image 
                src={book.coverImage}
                alt={book.title}
                width={400}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            )}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
              <p className="text-2xl mb-6">by {book.author}</p>
              <p className="text-lg mb-6 opacity-90">{book.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {book.themes.split(',').map((theme, idx) => (
                  <span key={idx} className="bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                    {theme.trim()}
                  </span>
                ))}
              </div>
              {book.startDate && book.endDate && (
                <p className="text-lg">
                  {format(book.startDate, 'MMM d')} - {format(book.endDate, 'MMM d, yyyy')}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Week Highlight */}
            {currentWeek && (
              <div className="card border-l-4 border-upepo-600">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">📅 This Week</h2>
                    <h3 className="text-xl font-semibold text-upepo-700">{currentWeek.title}</h3>
                  </div>
                  <span className="bg-upepo-100 text-upepo-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Week {currentWeek.weekNumber}
                  </span>
                </div>
                <p className="text-gray-700 mb-3"><strong>Focus:</strong> {currentWeek.focus}</p>
                <p className="text-gray-700 mb-4"><strong>Chapters:</strong> {currentWeek.chapters}</p>
                
                {currentWeek.prompts.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-3">💭 Discussion Prompts</h4>
                    <ul className="space-y-2">
                      {currentWeek.prompts.map((prompt) => (
                        <li key={prompt.id} className="text-gray-700 pl-4 border-l-2 border-gray-300">
                          {prompt.question}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Weekly Reading Plan */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">📖 Weekly Reading Plan</h2>
              <div className="space-y-4">
                {book.weeklyPlans.map((plan) => (
                  <div 
                    key={plan.id} 
                    className={`p-4 rounded-lg border-2 ${
                      plan.id === currentWeek?.id 
                        ? 'border-upepo-500 bg-upepo-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">Week {plan.weekNumber}: {plan.title}</h3>
                      <span className="text-sm text-gray-600">
                        {format(plan.startDate, 'MMM d')} - {format(plan.endDate, 'MMM d')}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1"><strong>Chapters:</strong> {plan.chapters}</p>
                    <p className="text-gray-600"><strong>Focus:</strong> {plan.focus}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Discussions */}
            {book.discussions.length > 0 && (
              <div className="card">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">💬 Recent Discussions</h2>
                  <Link 
                    href={`/discussions?bookId=${book.id}`}
                    className="text-upepo-600 hover:text-upepo-700 font-semibold"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-4">
                  {book.discussions.map((discussion) => (
                    <Link 
                      key={discussion.id}
                      href={`/discussions/${discussion.id}`}
                      className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{discussion.title}</h3>
                          <p className="text-gray-600 text-sm">
                            {discussion._count.comments} comments · {format(discussion.createdAt, 'MMM d, yyyy')}
                          </p>
                        </div>
                        {discussion.isPinned && (
                          <span className="text-yellow-500">📌</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Session */}
            {book.liveSession && (
              <div className="card bg-gradient-to-br from-wind-50 to-upepo-50">
                <h3 className="text-xl font-bold mb-4">🎯 Live Session</h3>
                <h4 className="font-semibold mb-2">{book.liveSession.title}</h4>
                <p className="text-gray-700 mb-3">
                  {format(book.liveSession.scheduledAt, 'EEEE, MMM d')}
                </p>
                <p className="text-gray-700 mb-4">
                  {format(book.liveSession.scheduledAt, 'h:mm a')} · {book.liveSession.duration} min
                </p>
                {book.liveSession.meetingLink && (
                  <a 
                    href={book.liveSession.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-upepo-600 text-white px-4 py-2 rounded-lg hover:bg-upepo-700 transition-colors"
                  >
                    Join Session
                  </a>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  href={`/discussions?bookId=${book.id}`}
                  className="block text-center bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg transition-colors"
                >
                  💬 Join Discussion
                </Link>
                <Link 
                  href="/sessions"
                  className="block text-center bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg transition-colors"
                >
                  📅 View Sessions
                </Link>
              </div>
            </div>

            {/* Monthly Summary */}
            {book.monthlySummary && (
              <div className="card">
                <h3 className="text-xl font-bold mb-4">📝 Monthly Summary</h3>
                <p className="text-gray-600 mb-4">Key lessons and insights available</p>
                <Link 
                  href={`/books/${book.id}/summary`}
                  className="block text-center bg-upepo-600 text-white px-4 py-2 rounded-lg hover:bg-upepo-700 transition-colors"
                >
                  View Summary
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
