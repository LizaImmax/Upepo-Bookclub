'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function GetReadyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [bookCover, setBookCover] = useState('/assets/books/the-mountain-is-you-cover.svg')

  const cozySteps = [
    {
      emoji: '🛋️',
      title: 'Find Your Cozy Spot',
      message: 'Grab your comfiest blanket and settle into your favorite reading nook'
    },
    {
      emoji: '☕',
      title: 'Pick Your Companion',
      message: 'Pour yourself some tea, coffee, or wine—whatever warms your soul'
    },
    {
      emoji: '📱',
      title: 'Set the Mood',
      message: 'Put your phone on silent. This is your time for growth and reflection'
    },
    {
      emoji: '🌙',
      title: 'Take a Deep Breath',
      message: 'Center yourself. Feel the calm. You\'re about to embark on a transformative journey'
    }
  ]

  useEffect(() => {
    if (step < cozySteps.length) {
      const timer = setTimeout(() => {
        setStep(step + 1)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [step])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center relative overflow-hidden">
      {/* Floating cozy elements */}
      <div className="absolute top-20 left-20 text-6xl opacity-20 animate-float">📚</div>
      <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{animationDelay: '1s'}}>✨</div>
      <div className="absolute bottom-20 left-40 text-7xl opacity-20 animate-float" style={{animationDelay: '2s'}}>🕯️</div>
      <div className="absolute bottom-40 right-40 text-6xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>🌿</div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-12">
            <div className="flex justify-center gap-2">
              {cozySteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx <= step ? 'w-16 bg-gradient-to-r from-upepo-600 to-wind-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Animated steps */}
          <div className="min-h-[400px] flex flex-col items-center justify-center">
            {step < cozySteps.length ? (
              <div key={step} className="animate-fade-in">
                <div className="text-9xl mb-8 animate-float">
                  {cozySteps[step].emoji}
                </div>
                <h2 className="text-5xl font-display font-extrabold mb-6 elegant-heading">
                  {cozySteps[step].title}
                </h2>
                <p className="text-2xl text-gray-700 font-light leading-relaxed max-w-2xl mx-auto">
                  {cozySteps[step].message}
                </p>
              </div>
            ) : (
              <div className="animate-fade-in">
                <div className="mb-8 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-upepo-600 to-wind-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative">
                    <Image
                      src={bookCover}
                      alt="Book Cover"
                      width={200}
                      height={300}
                      className="rounded-xl shadow-2xl animate-float"
                    />
                  </div>
                </div>
                <h2 className="text-6xl font-display font-extrabold mb-6 elegant-heading">
                  Ready, Set, Grow! ✨
                </h2>
                <p className="text-2xl text-gray-700 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                  You're all set. Let's dive into this month's transformative journey together.
                </p>
                <Link
                  href={`/books/${params.id}`}
                  className="btn-primary inline-flex items-center gap-2 text-xl px-12 py-6"
                >
                  Enter the Journey 🌟
                </Link>
              </div>
            )}
          </div>

          {/* Skip option */}
          {step < cozySteps.length && (
            <div className="mt-12">
              <Link
                href={`/books/${params.id}`}
                className="text-gray-500 hover:text-gray-700 font-semibold transition-colors"
              >
                Skip to Book →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
