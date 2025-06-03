// components/Footer.js
import Link from 'next/link'

export default function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="bg-gray-800 text-white mt-auto">
			<div className="container mx-auto px-4 py-8">
				<div className="grid md:grid-cols-4 gap-8">
					{/* Brand Section */}
					<div className="md:col-span-1">
						<div className="flex items-center space-x-2 mb-4">
							<div className="text-2xl">🌱</div>
							<span className="text-xl font-bold text-green-400">
								EcoRecycle
							</span>
						</div>
						<p className="text-gray-300 text-sm leading-relaxed">
							Building a sustainable future through innovative plastic recycling
							solutions. Join our campus community in making a difference.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4 text-green-400">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-gray-300 hover:text-white transition-colors text-sm"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/signup"
									className="text-gray-300 hover:text-white transition-colors text-sm"
								>
									Sign Up
								</Link>
							</li>
							<li>
								<Link
									href="/login"
									className="text-gray-300 hover:text-white transition-colors text-sm"
								>
									Login
								</Link>
							</li>
						</ul>
					</div>

					{/* How It Works */}
					<div>
						<h3 className="text-lg font-semibold mb-4 text-green-400">
							How It Works
						</h3>
						<ul className="space-y-2 text-sm text-gray-300">
							<li className="flex items-center">
								<span className="text-green-400 mr-2">1.</span>
								Collectors gather plastic waste
							</li>
							<li className="flex items-center">
								<span className="text-green-400 mr-2">2.</span>
								Submit to campus agents
							</li>
							<li className="flex items-center">
								<span className="text-green-400 mr-2">3.</span>
								Earn reward points
							</li>
							<li className="flex items-center">
								<span className="text-green-400 mr-2">4.</span>
								Agents send for recycling
							</li>
						</ul>
					</div>

					{/* Contact & Stats */}
					<div>
						<h3 className="text-lg font-semibold mb-4 text-green-400">
							Impact Stats
						</h3>
						<div className="space-y-3">
							<div className="bg-gray-700 rounded-lg p-3">
								<div className="text-2xl font-bold text-green-400">500kg+</div>
								<div className="text-xs text-gray-300">Plastic Recycled</div>
							</div>
							<div className="bg-gray-700 rounded-lg p-3">
								<div className="text-2xl font-bold text-blue-400">50+</div>
								<div className="text-xs text-gray-300">Active Users</div>
							</div>
							<div className="bg-gray-700 rounded-lg p-3">
								<div className="text-2xl font-bold text-purple-400">100+</div>
								<div className="text-xs text-gray-300">
									Successful Collections
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="border-t border-gray-700 mt-8 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<div className="text-sm text-gray-400 mb-4 md:mb-0">
							© {currentYear} EcoRecycle Platform. Made for University
							Presentation.
						</div>

						<div className="flex items-center space-x-6">
							{/* Environment Icons */}
							<div className="flex items-center space-x-2 text-sm text-gray-400">
								<span>🌍</span>
								<span>Saving Our Planet</span>
							</div>

							<div className="flex items-center space-x-2 text-sm text-gray-400">
								<span>♻️</span>
								<span>Reduce, Reuse, Recycle</span>
							</div>
						</div>
					</div>

					{/* University Badge */}
					<div className="mt-4 text-center">
						<div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-white text-sm font-medium">
							🎓 University Plastic Recycling Initiative
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
