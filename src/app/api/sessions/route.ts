import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const sessionSchema = z.object({
  bookId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  scheduledAt: z.string(),
  duration: z.number().default(90),
  meetingLink: z.string().optional(),
})

// GET all sessions
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const upcoming = searchParams.get('upcoming')

    const sessions = await prisma.liveSession.findMany({
      where: upcoming === 'true' ? {
        scheduledAt: {
          gte: new Date()
        }
      } : undefined,
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

    return NextResponse.json(sessions)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    )
  }
}

// POST new session (admin only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const data = sessionSchema.parse(body)

    const liveSession = await prisma.liveSession.create({
      data: {
        ...data,
        scheduledAt: new Date(data.scheduledAt),
      },
      include: {
        book: true
      }
    })

    return NextResponse.json(liveSession, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
