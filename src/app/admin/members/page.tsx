import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminMembersPage() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/')
  }

  const members = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          comments: true,
          reflections: true
        }
      }
    }
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/admin" className="text-upepo-600 hover:text-upepo-700 mb-2 inline-block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold">Community Members</h1>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Role</th>
                <th className="text-left py-3 px-4">Comments</th>
                <th className="text-left py-3 px-4">Reflections</th>
                <th className="text-left py-3 px-4">Joined</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">{member.name || 'N/A'}</td>
                  <td className="py-3 px-4 text-gray-600">{member.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      member.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{member._count.comments}</td>
                  <td className="py-3 px-4 text-gray-600">{member._count.reflections}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
