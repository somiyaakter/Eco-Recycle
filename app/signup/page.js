// app/signup/page.js - Sign Up Options
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
	const router = useRouter()

	const handleRoleSelect = role => {
		// Store selected role temporarily and redirect to login
		if (typeof window !== 'undefined') {
			localStorage.setItem('selectedRole', role)
		}
		router.push('/login')
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Choose Your Role
					</h1>
					<p className="text-gray-600">
						Select how you want to participate in recycling
					</p>
				</div>

				<div className="space-y-4">
					<button
						onClick={() => handleRoleSelect('collector')}
						className="w-full bg-green-100 hover:bg-green-200 border-2 border-green-300 rounded-lg p-6 text-left transition-colors"
					>
						<div className="flex items-center">
							<div className="text-4xl mr-4">🧑‍💼</div>
							<div>
								<h3 className="text-xl font-semibold text-green-800">
									Collector
								</h3>
								<p className="text-green-700 text-sm">
									Collect plastic waste and submit to agents for recycling. Earn
									rewards for your contributions!
								</p>
							</div>
						</div>
					</button>

					<button
						onClick={() => handleRoleSelect('agent')}
						className="w-full bg-blue-100 hover:bg-blue-200 border-2 border-blue-300 rounded-lg p-6 text-left transition-colors"
					>
						<div className="flex items-center">
							<div className="text-4xl mr-4">🏢</div>
							<div>
								<h3 className="text-xl font-semibold text-blue-800">Agent</h3>
								<p className="text-blue-700 text-sm">
									Accumulate plastic from collectors and coordinate with
									recycling facilities. Manage the collection network!
								</p>
							</div>
						</div>
					</button>
				</div>

				<div className="mt-6 text-center">
					<Link
						href="/"
						className="text-gray-500 hover:text-gray-700 underline"
					>
						← Back to Home
					</Link>
				</div>
			</div>
		</div>
	)
}
