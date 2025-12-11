const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Creating January 2026 book...')
  
  const book = await prisma.book.create({
    data: {
      title: 'The Mountain Is You',
      author: 'Brianna Wiest',
      coverImage: '/assets/books/the-mountain-is-you.jpg',
      description: 'A transformative guide to overcoming self-sabotage and unlocking your true potential. This book explores how our biggest obstacles are often the mountains we build within ourselves - the patterns, fears, and limiting beliefs that hold us back from becoming who we are meant to be. Through powerful insights and practical wisdom, Brianna Wiest shows us how to recognize self-destructive behaviors, understand their roots, and transform them into stepping stones for growth.',
      themes: 'Self-sabotage, Personal growth, Emotional healing, Self-awareness, Inner transformation, Mindset, Mental health',
      status: 'CURRENT',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-01-31'),
    },
  })

  console.log('✓ Book created:', book.title)

  const weeks = [
    {
      weekNumber: 1,
      title: 'Understanding Self-Sabotage',
      focus: 'Recognizing the patterns that hold us back',
      chapters: 'Introduction & Chapters 1-2',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-01-07'),
    },
    {
      weekNumber: 2,
      title: 'The Root of Our Resistance',
      focus: 'Understanding why we sabotage our own success',
      chapters: 'Chapters 3-5',
      startDate: new Date('2026-01-08'),
      endDate: new Date('2026-01-14'),
    },
    {
      weekNumber: 3,
      title: 'Breaking Free',
      focus: 'Practical strategies for change',
      chapters: 'Chapters 6-8',
      startDate: new Date('2026-01-15'),
      endDate: new Date('2026-01-21'),
    },
    {
      weekNumber: 4,
      title: 'Building Your Mountain',
      focus: 'Creating lasting transformation',
      chapters: 'Chapters 9-10 & Conclusion',
      startDate: new Date('2026-01-22'),
      endDate: new Date('2026-01-31'),
    },
  ]

  for (const week of weeks) {
    await prisma.weeklyPlan.create({
      data: {
        ...week,
        bookId: book.id,
      },
    })
  }

  console.log('✓ Weekly plans created (4 weeks)')

  await prisma.liveSession.create({
    data: {
      bookId: book.id,
      title: 'The Mountain Is You - End of Month Reflection',
      description: 'Join us for a powerful discussion about overcoming self-sabotage and the insights gained this month.',
      scheduledAt: new Date('2026-01-30T19:00:00'),
      duration: 90,
      status: 'SCHEDULED',
    },
  })

  console.log('✓ Live session scheduled')
  console.log('\n🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
