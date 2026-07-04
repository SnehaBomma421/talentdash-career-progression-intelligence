import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Career Progression Intelligence | TalentDash Module Demo',
  description: 'Explore career transition paths, promotion timelines, compensation trends, and skill progression across Indian tech companies.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-td-bg antialiased">
        <nav className="bg-td-surface border-b border-td-border sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <span className="text-xl font-bold text-td-black">Career Progression Intelligence</span>
              <span className="text-xs text-td-muted">TalentDash Module Demo</span>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-td-surface border-t border-td-border mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-sm text-td-muted text-center">
              Career Progression Intelligence &middot; TalentDash Module Demo
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
