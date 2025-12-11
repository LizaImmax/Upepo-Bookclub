import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'

export default async function SessionsPage() {
  const upcomingSessions = await prisma.liveSession.findMany({
    where: {
      scheduledAt: {
        gte: new Date()
      }
    },
    include: {
      book: {
        select: {
          id: true,
          title: true,
          author: true,
          coverImage: true,
        }
      }
    },
    orderBy: { scheduledAt: 'asc' }
  })

  const pastSessions = await prisma.liveSession.findMany({
    where: {
      scheduledAt: {
        lt: new Date()
      }
    },
    include: {
      book: {
        select: {
          id: true,
          title: true,
          author: true,
          coverImage: true,
        }
      }
    },
    orderBy: { scheduledAt: 'desc' },
    take: 6
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 decorative-pattern">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-display font-extrabold mb-4 elegant-heading">
            🎯 Live Sessions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Connect, reflect, and grow together in our monthly gatherings</p>
        </div>

        {/* Upcoming Sessions */}
        <section className="mb-20">
          <h2 className="text-4xl font-display font-bold mb-8 elegant-heading">Upcoming Sessions</h2>
          {upcomingSessions.length === 0 ? (
            <div className="card cozy-shadow text-center py-16 bg-white">
              <div className="text-7xl mb-6">🗓️</div>
              <p className="text-2xl text-gray-600 mb-4">No upcoming sessions scheduled yet</p>
              <p className="text-gray-500">Check back soon for our next gathering</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="card cozy-shadow bg-gradient-to-br from-white to-upepo-50 border-l-8 border-upepo-600 group hover:border-wind-600 transition-colors">
                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-upepo-600 to-wind-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                      Upcoming
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-upepo-600 transition-colors">{session.title}</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    <span className="font-bold">{session.book.title}</span> by {session.book.author}
                  </p>
                  
                  <div className="space-y-3 mb-6 bg-white p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📅</span>
                      <p className="text-gray-700 font-semibold">
                        {format(session.scheduledAt, 'EEEE, MMMM d, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🕐</span>
                      <p className="text-gray-700 font-semibold">
                        {format(session.scheduledAt, 'h:mm a')} ({session.duration} minutes)
                      </p>
                    </div>
                  </div>

                  {session.description && (
                    <p className="text-gray-600 mb-6 leading-relaxed">{session.description}</p>
                  )}

                  {session.meetingLink && (
                    <a 
                      href={session.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full text-center inline-flex items-center justify-center gap-2"
                    >
                      Join Live Session 🎙️
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Past Sessions */}
        {pastSessions.length > 0 && (
          <section>
            <h2 className="text-4xl font-display font-bold mb-8 elegant-heading">Past Sessions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pastSessions.map((session) => (
                <div key={session.id} className="card cozy-shadow bg-gradient-to-br from-gray-50 to-white group">
                  <div className="mb-4">
                    <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                      Archived
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{session.title}</h3>
                  <p className="text-lg text-gray-700 mb-4">
                    <span className="font-bold">{session.book.title}</span> by {session.book.author}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📅</span>
                    <p className="text-gray-600 font-semibold">
                      {format(session.scheduledAt, 'MMMM d, yyyy')}
                    </p>
                  </div>

                  {session.recordingLink && (
                    <a 
                      href={session.recordingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full text-center inline-flex items-center justify-center gap-2 mb-4"
                    >
                      Watch Recording 🎥
                    </a>
                  )}

                  {session.summary && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">{session.summary}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
