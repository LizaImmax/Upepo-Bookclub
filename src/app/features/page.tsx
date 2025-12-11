import Link from 'next/link'

export default function FeaturesPage() {
  const features = [
    {
      emoji: '📸',
      title: 'Photo Gallery',
      description: 'Share your cozy reading nooks, coffee/wine pairings, and beautiful book notes with the community',
      link: '/gallery',
      color: 'from-amber-500 to-orange-500'
    },
    {
      emoji: '💬',
      title: 'Quote Cards',
      description: 'Create beautiful, shareable quote cards from your favorite book passages. Download and share on social media',
      link: '/quotes',
      color: 'from-rose-500 to-pink-500'
    },
    {
      emoji: '🎥',
      title: 'Video Library',
      description: 'Watch recorded live sessions and author Q&As anytime. Never miss an important discussion',
      link: '/videos',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      emoji: '📧',
      title: 'Monthly Newsletter',
      description: 'Curated insights, member spotlights, top quotes, and upcoming events delivered to your inbox',
      link: '/newsletters',
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-upepo-600 via-wind-600 to-upepo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-display font-extrabold mb-6 tracking-tight">
              ✨ New Features
            </h1>
            <p className="text-2xl opacity-95 font-light">
              Exciting ways to engage, share, and grow together
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <Link
                key={idx}
                href={feature.link}
                className="card group hover:shadow-2xl hover:-translate-y-4 transition-all duration-300"
              >
                <div className={`h-2 rounded-t-2xl bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-8">
                  <div className="text-8xl mb-6 animate-float group-hover:scale-110 transition-transform">
                    {feature.emoji}
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900 group-hover:text-upepo-600 transition-colors">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-upepo-600 font-semibold group-hover:gap-4 transition-all">
                    <span>Explore Now</span>
                    <span className="text-2xl">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 elegant-heading">
              More Features Coming Soon
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're constantly improving Upepo Bookclub to create the best reading community experience
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
                <div className="text-5xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2">Reading Challenges</h3>
                <p className="text-sm text-gray-600">Gamified reading goals and achievements</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
                <div className="text-5xl mb-3">🤝</div>
                <h3 className="font-bold text-lg mb-2">Accountability Partners</h3>
                <p className="text-sm text-gray-600">Get matched with reading buddies</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
                <div className="text-5xl mb-3">📊</div>
                <h3 className="font-bold text-lg mb-2">Reading Stats</h3>
                <p className="text-sm text-gray-600">Track your progress and streaks</p>
              </div>
            </div>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
