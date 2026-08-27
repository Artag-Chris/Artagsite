// Root layout wrapper.
// The actual <html> element, fonts, analytics and JSON-LD live in
// src/app/[locale]/layout.tsx which receives the resolved locale.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
