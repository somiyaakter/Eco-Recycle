// app/login/page.js - Login Page
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { USERS } from '../../lib/data'
import { storage } from '../../lib/storage'

export default function LoginPage() {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		userType: 'collector',
	})
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	useEffect(() => {
		// Check if user came from signup and pre-select role
		if (typeof window !== 'undefined') {
			const selectedRole = localStorage.getItem('selectedRole')
			if (selectedRole) {
				setFormData(prev => ({ ...prev, userType: selectedRole }))
				localStorage.removeItem('selectedRole')
			}
		}
	}, [])

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		setError('')

		// Simulate loading delay
		await new Promise(resolve => setTimeout(resolve, 500))

		const usersList =
			formData.userType === 'collector' ? USERS.collectors : USERS.agents
		const user = usersList.find(
			u => u.username === formData.username && u.password === formData.password,
		)

		if (user) {
			const userData = { ...user, userType: formData.userType }
			storage.setUser(userData)

			if (formData.userType === 'collector') {
				router.push('/collector')
			} else {
				router.push('/agent')
			}
		} else {
			setError('Invalid username or password')
		}

		setLoading(false)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-10">
			<div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
					<p className="text-gray-600">Access your recycling account</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Account Type
						</label>
						<select
							value={formData.userType}
							onChange={e =>
								setFormData({ ...formData, userType: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
						>
							<option value="collector">Collector</option>
							<option value="agent">Agent</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Username
						</label>
						<input
							type="text"
							value={formData.username}
							onChange={e =>
								setFormData({ ...formData, username: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
							required
							placeholder="Enter your username"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</label>
						<input
							type="password"
							value={formData.password}
							onChange={e =>
								setFormData({ ...formData, password: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
							required
							placeholder="Enter your password"
						/>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>

				{/* Demo credentials */}
				<div className="mt-6 p-4 bg-gray-50 rounded-lg">
					<h3 className="font-semibold text-gray-700 mb-2">
						Demo Credentials:
					</h3>
					<div className="text-sm text-gray-600 space-y-1">
						<div>
							<strong>Collectors:</strong>
						</div>
						<div>• sanju / pass123</div>
						<div>• sarah/ pass123</div>
						<div>
							<strong>Agents:</strong>
						</div>
						<div>• abdullah / pass123</div>
						<div>• amatullah / pass123</div>
					</div>
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
