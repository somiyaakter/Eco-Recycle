// components/Navbar.js
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { storage } from '../lib/storage'

export default function Navbar() {
	const [user, setUser] = useState(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const router = useRouter()

	useEffect(() => {
		// Check for logged-in user
		const currentUser = storage.getUser()
		setUser(currentUser)
	}, [])

	const handleLogout = () => {
		storage.logout()
		setUser(null)
		router.push('/')
	}

	return (
		<nav className="bg-white shadow-lg border-b border-gray-200">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center py-4">
					{/* Logo */}
					<Link href="/" className="flex items-center space-x-2">
						<div className="text-2xl">🌱</div>
						<span className="text-xl font-bold text-green-600">EcoRecycle</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-6">
						<Link
							href="/"
							className="text-gray-600 hover:text-green-600 transition-colors"
						>
							Home
						</Link>

						{!user ? (
							<>
								<Link
									href="/signup"
									className="text-gray-600 hover:text-green-600 transition-colors"
								>
									Sign Up
								</Link>
								<Link
									href="/login"
									className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
								>
									Login
								</Link>
							</>
						) : (
							<>
								<Link
									href={user.userType === 'collector' ? '/collector' : '/agent'}
									className="text-gray-600 hover:text-green-600 transition-colors"
								>
									Dashboard
								</Link>

								<div className="flex items-center space-x-3">
									<div className="text-sm text-gray-600">
										Welcome,{' '}
										<span className="font-medium">{user.username}</span>
									</div>
									<div
										className={`px-2 py-1 rounded text-xs font-medium ${
											user.userType === 'collector'
												? 'bg-green-100 text-green-800'
												: 'bg-blue-100 text-blue-800'
										}`}
									>
										{user.userType === 'collector'
											? '🧑‍💼 Collector'
											: '🏢 Agent'}
									</div>

									<button
										onClick={handleLogout}
										className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
									>
										Logout
									</button>
								</div>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden flex items-center text-gray-600 hover:text-green-600"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d={
									isMenuOpen
										? 'M6 18L18 6M6 6l12 12'
										: 'M4 6h16M4 12h16M4 18h16'
								}
							/>
						</svg>
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden border-t border-gray-200 py-4">
						<div className="flex flex-col space-y-3">
							<Link
								href="/"
								className="text-gray-600 hover:text-green-600 transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								Home
							</Link>

							{!user ? (
								<>
									<Link
										href="/signup"
										className="text-gray-600 hover:text-green-600 transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										Sign Up
									</Link>
									<Link
										href="/login"
										className="text-gray-600 hover:text-green-600 transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										Login
									</Link>
								</>
							) : (
								<>
									<Link
										href={
											user.userType === 'collector' ? '/collector' : '/agent'
										}
										className="text-gray-600 hover:text-green-600 transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										Dashboard
									</Link>

									<div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
										<div className="text-sm text-gray-600">
											Welcome,{' '}
											<span className="font-medium">{user.username}</span>
										</div>
										<div
											className={`self-start px-2 py-1 rounded text-xs font-medium ${
												user.userType === 'collector'
													? 'bg-green-100 text-green-800'
													: 'bg-blue-100 text-blue-800'
											}`}
										>
											{user.userType === 'collector'
												? '🧑‍💼 Collector'
												: '🏢 Agent'}
										</div>
										<button
											onClick={() => {
												handleLogout()
												setIsMenuOpen(false)
											}}
											className="self-start bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
										>
											Logout
										</button>
									</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}
