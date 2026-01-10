import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "CF-Codeclimb",
  description: "Track Codeforces Div2 problems automatically",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
