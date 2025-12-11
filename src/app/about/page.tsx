export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 decorative-pattern">
      {/* Hero Section */}
      <section className="wind-gradient text-white py-32 relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">🌬️</div>
        <div className="absolute top-20 right-20 text-5xl opacity-20 animate-float" style={{animationDelay: '1s'}}>📖</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 animate-float" style={{animationDelay: '2s'}}>💫</div>
        <div className="absolute bottom-10 right-1/3 text-5xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>🌱</div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-display font-extrabold mb-6 tracking-tight">
              About Upepo Bookclub
            </h1>
            <p className="text-3xl md:text-4xl font-light opacity-90 max-w-4xl mx-auto">
              Books that move with the wind, ideas that expand the mind
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <section className="card cozy-shadow bg-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-upepo-400 to-upepo-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🌬️
              </div>
              <h2 className="text-4xl font-display font-bold elegant-heading">Our Mission</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Upepo Bookclub is the reading arm of the Upepo Ecosystem — a calm, inspiring space 
              where books become portals to growth, community, clarity, and creativity. We help 
              readers, especially in tech and personal development, evolve through shared learning, 
              deep reflection, and guided discussions.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We're not just a traditional book club — we're a learning ecosystem inside the 
              larger Upepo universe. Every month is intentional. Every discussion is purposeful. 
              Every reader is a contributor.
            </p>
          </section>

          {/* Core Purpose */}
          <section className="card cozy-shadow bg-gradient-to-br from-white to-wind-50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-wind-400 to-wind-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🌱
              </div>
              <h2 className="text-4xl font-display font-bold elegant-heading">Core Purpose</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card bg-white group hover:bg-gradient-to-br hover:from-white hover:to-upepo-50">
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="text-xl font-bold text-upepo-700 mb-3">Expand the Mind</h3>
                <p className="text-gray-700 leading-relaxed">
                  Introduce readers to ideas that shift perspectives, sharpen thinking, and open the soul.
                </p>
              </div>
              <div className="card bg-white group hover:bg-gradient-to-br hover:from-white hover:to-wind-50">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-xl font-bold text-wind-700 mb-3">Build Community</h3>
                <p className="text-gray-700 leading-relaxed">
                  Members read together, reflect together, and grow together through shared journeys.
                </p>
              </div>
              <div className="card bg-white group hover:bg-gradient-to-br hover:from-white hover:to-upepo-50">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="text-xl font-bold text-upepo-700 mb-3">Structured Learning</h3>
                <p className="text-gray-700 leading-relaxed">
                  Clear plans, gentle guidance, and beautiful content so the process never feels overwhelming.
                </p>
              </div>
              <div className="card bg-white group hover:bg-gradient-to-br hover:from-white hover:to-wind-50">
                <div className="text-4xl mb-3">✨</div>
                <h3 className="text-xl font-bold text-wind-700 mb-3">Personal Transformation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Reflection questions and live conversations help members apply lessons to their real lives.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="card">
            <h2 className="text-3xl font-bold mb-6">📖 How It Works</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">1️⃣</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Monthly Book Selection</h3>
                    <p className="text-gray-700">One transformative book each month aligned with personal growth and development.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">2️⃣</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Weekly Reading Plans</h3>
                    <p className="text-gray-700">Structured chapters with clear focus points to keep you on track.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">3️⃣</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Deep Discussions</h3>
                    <p className="text-gray-700">Thoughtful prompts and community conversations that spark insight.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl">4️⃣</span>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Live Sessions</h3>
                    <p className="text-gray-700">End-of-month gatherings for reflection, takeaways, and connection.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Book Themes */}
          <section className="card cozy-shadow bg-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                📚
              </div>
              <h2 className="text-4xl font-display font-bold elegant-heading">What We Read</h2>
            </div>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Every book we select aligns with themes that elevate and transform:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-upepo-100 to-upepo-50 p-5 rounded-xl border border-upepo-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-upepo-700 text-lg">Personal Development</p>
              </div>
              <div className="bg-gradient-to-br from-wind-100 to-wind-50 p-5 rounded-xl border border-wind-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-wind-700 text-lg">Career Growth</p>
              </div>
              <div className="bg-gradient-to-br from-upepo-100 to-upepo-50 p-5 rounded-xl border border-upepo-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-upepo-700 text-lg">Technology & Innovation</p>
              </div>
              <div className="bg-gradient-to-br from-wind-100 to-wind-50 p-5 rounded-xl border border-wind-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-wind-700 text-lg">Mindset & Self-Mastery</p>
              </div>
              <div className="bg-gradient-to-br from-upepo-100 to-upepo-50 p-5 rounded-xl border border-upepo-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-upepo-700 text-lg">Emotional Intelligence</p>
              </div>
              <div className="bg-gradient-to-br from-wind-100 to-wind-50 p-5 rounded-xl border border-wind-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-wind-700 text-lg">Creativity & Leadership</p>
              </div>
              <div className="bg-gradient-to-br from-upepo-100 to-upepo-50 p-5 rounded-xl border border-upepo-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-upepo-700 text-lg">Soul & Spirituality</p>
              </div>
              <div className="bg-gradient-to-br from-wind-100 to-wind-50 p-5 rounded-xl border border-wind-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-wind-700 text-lg">Inner Work</p>
              </div>
              <div className="bg-gradient-to-br from-upepo-100 to-upepo-50 p-5 rounded-xl border border-upepo-200 hover:shadow-md transition-shadow">
                <p className="font-bold text-upepo-700 text-lg">Transformation</p>
              </div>
            </div>
          </section>

          {/* Community Values */}
          <section className="card cozy-shadow bg-gradient-to-br from-white via-wind-50 to-upepo-50">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-600 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                💫
              </div>
              <h2 className="text-4xl font-display font-bold elegant-heading">Community Values</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <span className="text-3xl">✨</span>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">Intention</p>
                  <p className="text-gray-700">Every month, every discussion, every moment has purpose</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <span className="text-3xl">🌱</span>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">Growth</p>
                  <p className="text-gray-700">We embrace learning, change, and evolution</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <span className="text-3xl">🤝</span>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">Connection</p>
                  <p className="text-gray-700">We support each other's journeys with empathy and care</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <span className="text-3xl">📖</span>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">Depth</p>
                  <p className="text-gray-700">We go beyond surface-level reading to real understanding</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <span className="text-3xl">🎯</span>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">Action</p>
                  <p className="text-gray-700">We bridge reading with practical transformation</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
                <span className="text-3xl">🌬️</span>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">Flow</p>
                  <p className="text-gray-700">We move with ease, like the wind that guides us</p>
                </div>
              </div>
            </div>
          </section>

          {/* Join CTA */}
          <section className="card cozy-shadow bg-gradient-to-br from-upepo-600 via-wind-600 to-upepo-700 text-white text-center py-16 relative overflow-hidden">
            <div className="absolute top-10 right-10 text-7xl opacity-20 animate-float">🚀</div>
            <div className="absolute bottom-10 left-10 text-6xl opacity-20 animate-float" style={{animationDelay: '1s'}}>⭐</div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">Ready to Begin Your Journey?</h2>
              <p className="text-2xl mb-10 max-w-2xl mx-auto font-light">
                Join a community of readers committed to growth, learning, and transformation.
              </p>
              <a 
                href="/auth/signup"
                className="bg-white text-upepo-700 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/50 transform hover:-translate-y-2 transition-all duration-300 inline-block border-4 border-white hover:scale-105"
              >
                Join Upepo Bookclub ✨
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
