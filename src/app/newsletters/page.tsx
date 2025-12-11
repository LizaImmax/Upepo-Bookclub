import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getNewsletters() {
  try {
    const newsletters = await prisma.newsletter.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 12
    })
    return newsletters
  } catch (error) {
    console.error('Error fetching newsletters:', error)
    return []
  }
}

export default async function NewslettersPage() {
  const newsletters = await getNewsletters()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-upepo-600 via-wind-600 to-upepo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-display font-extrabold mb-6 tracking-tight">
              📧 Monthly Newsletters
            </h1>
            <p className="text-2xl opacity-95 font-light mb-8">
              Curated insights, member spotlights, and community highlights
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/newsletters/subscribe" className="btn-primary bg-white text-upepo-600 hover:bg-gray-50">
                Subscribe for Free 💌
              </Link>
              {/* Only show to admins */}
              <Link href="/admin/newsletters/new" className="btn-secondary">
                Create Newsletter (Admin)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Archive */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {newsletters.length > 0 ? (
              <div className="space-y-6">
                {newsletters.map((newsletter) => (
                  <article
                    key={newsletter.id}
                    className="card group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-gradient-to-r from-upepo-600 to-wind-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                              📧 Newsletter
                            </span>
                            <span className="text-sm text-gray-500">
                              {newsletter.publishedAt
                                ? new Date(newsletter.publishedAt).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })
                                : 'Draft'}
                            </span>
                          </div>
                          <h2 className="text-3xl font-bold mb-2 text-gray-900 group-hover:text-upepo-600 transition-colors">
                            {newsletter.title}
                          </h2>
                          <p className="text-lg text-gray-600 mb-4">
                            {newsletter.subject}
                          </p>
                        </div>
                      </div>

                      {/* Preview Content */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        {newsletter.featured && (
                          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                            <p className="text-sm font-bold text-upepo-700 mb-2">✨ Featured This Month</p>
                            <p className="text-sm text-gray-700 line-clamp-3">{newsletter.featured}</p>
                          </div>
                        )}
                        {newsletter.memberSpotlight && (
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                            <p className="text-sm font-bold text-wind-700 mb-2">🌟 Member Spotlight</p>
                            <p className="text-sm text-gray-700 line-clamp-3">{newsletter.memberSpotlight}</p>
                          </div>
                        )}
                      </div>

                      {newsletter.topQuotes && (
                        <div className="mb-6 p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border-l-4 border-rose-400">
                          <p className="text-sm font-bold text-rose-700 mb-2">💬 Top Quote</p>
                          <p className="text-base text-gray-800 italic line-clamp-2">"{newsletter.topQuotes}"</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex gap-2">
                          {newsletter.upcomingEvents && (
                            <span className="text-sm text-gray-600">
                              📅 Includes upcoming events
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/newsletters/${newsletter.id}`}
                          className="btn-primary text-sm px-6 py-2"
                        >
                          Read Full Newsletter →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-9xl mb-6">📬</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">No Newsletters Yet</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Subscribe to get notified when we publish our first newsletter!
                </p>
                <Link href="/newsletters/subscribe" className="btn-primary">
                  Subscribe Now 💌
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center elegant-heading">
              What's Inside Each Newsletter?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-4xl">📚</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Book Insights</h3>
                  <p className="text-gray-600">
                    Key lessons and actionable takeaways from our monthly read
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-4xl">🌟</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Member Spotlights</h3>
                  <p className="text-gray-600">
                    Celebrating our community's reading journeys and transformations
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-4xl">💬</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Best Quotes</h3>
                  <p className="text-gray-600">
                    The most impactful passages shared by our members
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-4xl">📅</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Upcoming Events</h3>
                  <p className="text-gray-600">
                    Live sessions, discussions, and special author Q&As
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-4xl">🎯</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Action Plans</h3>
                  <p className="text-gray-600">
                    Practical steps to apply what you've learned
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-4xl">📖</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Next Month's Pick</h3>
                  <p className="text-gray-600">
                    Preview of upcoming books and why we chose them
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-upepo-600 via-wind-600 to-upepo-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Never Miss an Update
            </h2>
            <p className="text-xl opacity-95 mb-8">
              Get monthly curated insights delivered to your inbox
            </p>
            <Link
              href="/newsletters/subscribe"
              className="btn-primary bg-white text-upepo-600 hover:bg-gray-50 inline-flex items-center gap-2"
            >
              Subscribe for Free 💌
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
