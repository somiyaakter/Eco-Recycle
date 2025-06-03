'use client'
import Link from 'next/link'

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
			<div className="container mx-auto px-4 py-12">
				<div className="text-center max-w-4xl mx-auto">
					<h1 className="text-5xl font-bold text-gray-800 mb-6">
						🌱 Plastic Recycling Platform
					</h1>

					<div className="bg-white rounded-lg shadow-lg p-8 mb-8">
						<h2 className="text-2xl font-semibold text-gray-700 mb-4">
							Why Plastic Recycling Matters
						</h2>
						<p className="text-gray-600 text-lg leading-relaxed mb-6">
							Every year, millions of tons of plastic waste pollute our
							environment. Our platform connects collectors and agents to create
							an efficient recycling network right here on campus. Together, we
							can reduce waste, earn rewards, and protect our planet for future
							generations.
						</p>

						<div className="grid md:grid-cols-3 gap-6 mb-8">
							<div className="bg-green-50 p-4 rounded-lg">
								<div className="text-3xl mb-2">♻️</div>
								<h3 className="font-semibold text-gray-700">Reduce Waste</h3>
								<p className="text-sm text-gray-600">
									Turn plastic waste into valuable resources
								</p>
							</div>
							<div className="bg-blue-50 p-4 rounded-lg">
								<div className="text-3xl mb-2">🏆</div>
								<h3 className="font-semibold text-gray-700">Earn Rewards</h3>
								<p className="text-sm text-gray-600">
									Get points for every submission
								</p>
							</div>
							<div className="bg-purple-50 p-4 rounded-lg">
								<div className="text-3xl mb-2">🤝</div>
								<h3 className="font-semibold text-gray-700">Connect</h3>
								<p className="text-sm text-gray-600">
									Join our campus recycling community
								</p>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<Link
							href="/signup"
							className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
						>
							Get Started - Sign Up
						</Link>

						<div className="text-gray-600">
							Already have an account?{' '}
							<Link
								href="/login"
								className="text-green-600 hover:text-green-700 underline"
							>
								Login here
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
