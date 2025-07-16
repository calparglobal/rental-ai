'use client'

export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Database Test Page</h1>
      <p>If you can see this page, then regular pages work but API routes are blocked.</p>
      <p className="text-sm text-gray-600 mt-4">
        This indicates that your Vercel project has authentication protection enabled that's blocking all API routes.
      </p>
    </div>
  )
}