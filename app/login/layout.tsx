import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login Page'
}

export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <div>{children}</div>
}