import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata = {
	title: 'Plastic Recycling Platform',
	description: 'University plastic recycling management system',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Navbar />
				<main>{children}</main>

				<Footer />
				<Toaster position="top-right" reverseOrder={false} />
			</body>
		</html>
	)
}
