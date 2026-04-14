'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = e.currentTarget
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password, role: 'subscriber' }),
      })
      if (res.ok) {
        router.push('/login?registered=true')
      } else {
        const data = await res.json()
        setError(data.errors?.[0]?.message ?? 'Registration failed. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-semibold text-[#16697A]">Create Account</h1>
          <span className="block w-12 h-0.5 bg-[#E2B748] mx-auto mt-3" />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#191919] mb-1.5">First Name</label>
                <input type="text" name="firstName" required className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#16697A] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#191919] mb-1.5">Last Name</label>
                <input type="text" name="lastName" required className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#16697A] text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#191919] mb-1.5">Email Address</label>
              <input type="email" name="email" required autoComplete="email" className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#16697A] text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#191919] mb-1.5">Password</label>
              <input type="password" name="password" required minLength={8} autoComplete="new-password" className="w-full px-3 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-[#16697A] text-sm" />
              <p className="text-xs text-gray-400 mt-1">Minimum 8 characters</p>
            </div>
            {error && <p className="text-[#C95D63] text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-[#C95D63] text-white font-medium rounded hover:bg-[#f4442e] transition-colors disabled:opacity-60">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#16697A] hover:underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
