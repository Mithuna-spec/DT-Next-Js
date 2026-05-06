import './globals.css'

export const metadata = {
  title: 'Learning Portal',
  description: 'Exam Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>
  )
}