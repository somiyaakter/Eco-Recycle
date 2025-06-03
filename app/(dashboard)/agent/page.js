// app/agent/page.js - Agent Profile
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { storage } from '@/lib/storage'
import toast from 'react-hot-toast'

export default function AgentPage() {
	const [user, setUser] = useState(null)
	const [requests, setRequests] = useState([])
	const [totalPlastic, setTotalPlastic] = useState(0)
	const router = useRouter()

	useEffect(() => {
		const currentUser = storage.getUser()
		if (!currentUser || currentUser.userType !== 'agent') {
			router.push('/login')
			return
		}
		setUser(currentUser)
		loadRequests()
	}, [router])

	const loadRequests = () => {
		const allRequests = storage.getRequests()
		const agentRequests = allRequests.filter(
			req => req.agentId === storage.getUser()?.id,
		)
		setRequests(agentRequests)

		// Calculate total plastic from accepted requests
		const acceptedPlastic = agentRequests
			.filter(req => req.status === 'accepted')
			.reduce((sum, req) => sum + req.plasticAmount, 0)
		setTotalPlastic(acceptedPlastic)
	}

	const handleRequestAction = (requestId, action) => {
		storage.updateRequest(requestId, { status: action })

		if (action === 'accepted') {
			const request = requests.find(req => req.id === requestId)
			if (request) {
				// Add rewards to collector
				const collectorUser = { id: request.collectorId, userType: 'collector' }
				const rewardPoints = Math.floor(request.plasticAmount * 10) // 10 points per kg

				storage.addRewardHistory(request.collectorId, {
					type: 'earned',
					amount: rewardPoints,
					description: `Earned from ${request.plasticAmount}kg plastic submission`,
				})

				toast.success(
					`Request accepted! Collector earned ${rewardPoints} reward points.`,
				)
			}
		}

		loadRequests()
	}

	const handleSendForRecycling = () => {
		if (totalPlastic === 0) {
			toast.error('No plastic available to send for recycling!')
			return
		}

		const confirmed = confirm(
			`Send ${totalPlastic}kg of plastic for recycling?`,
		)
		if (confirmed) {
			// Reset accepted requests status to 'recycled'
			const acceptedRequests = requests.filter(req => req.status === 'accepted')
			acceptedRequests.forEach(req => {
				storage.updateRequest(req.id, { status: 'recycled' })
			})

			toast.success(
				`Successfully sent ${totalPlastic}kg of plastic for recycling!`,
			)
			loadRequests()
		}
	}

	const handleLogout = () => {
		storage.logout()
		router.push('/')
	}

	if (!user) return <div>Loading...</div>

	const pendingRequests = requests.filter(req => req.status === 'pending')
	const acceptedRequests = requests.filter(req => req.status === 'accepted')
	const processedRequests = requests.filter(
		req => req.status === 'rejected' || req.status === 'recycled',
	)

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white shadow-sm border-b">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-bold text-gray-800">
							Agent Dashboard
						</h1>
						<button
							onClick={handleLogout}
							className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							Logout
						</button>
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-6">
				{/* Profile Info */}
				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="bg-blue-100 p-4 rounded-full">
								<div className="text-3xl">🏢</div>
							</div>
							<div>
								<h2 className="text-xl font-semibold text-gray-800">
									Welcome, {user.username}!
								</h2>
								<p className="text-gray-600">Agent Account</p>
							</div>
						</div>
						<div className="text-right">
							<div className="text-2xl font-bold text-blue-600">
								{totalPlastic.toFixed(1)}kg
							</div>
							<div className="text-sm text-gray-500">
								Total Plastic Collected
							</div>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid md:grid-cols-3 gap-6 mb-6">
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">
									Pending Requests
								</p>
								<p className="text-2xl font-bold text-yellow-600">
									{pendingRequests.length}
								</p>
							</div>
							<div className="text-3xl">⏳</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">
									Accepted Requests
								</p>
								<p className="text-2xl font-bold text-green-600">
									{acceptedRequests.length}
								</p>
							</div>
							<div className="text-3xl">✅</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-600">
									Total Requests
								</p>
								<p className="text-2xl font-bold text-gray-600">
									{requests.length}
								</p>
							</div>
							<div className="text-3xl">📊</div>
						</div>
					</div>
				</div>

				{/* Action Button */}
				<div className="bg-white rounded-lg shadow p-6 mb-6">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold text-gray-800">
								Ready for Recycling
							</h3>
							<p className="text-gray-600">
								Send accumulated plastic to recycling facility
							</p>
						</div>
						<button
							onClick={handleSendForRecycling}
							disabled={totalPlastic === 0}
							className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
						>
							Send for Recycling ({totalPlastic.toFixed(1)}kg)
						</button>
					</div>
				</div>

				{/* Requests Management */}
				<div className="bg-white rounded-lg shadow">
					<div className="p-6 border-b">
						<h3 className="text-lg font-semibold text-gray-800">
							Collector Requests
						</h3>
					</div>

					{/* Pending Requests */}
					{pendingRequests.length > 0 && (
						<div className="p-6 border-b">
							<h4 className="font-medium text-gray-700 mb-4">
								🟡 Pending Requests
							</h4>
							<div className="space-y-4">
								{pendingRequests.map(request => (
									<div
										key={request.id}
										className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200"
									>
										<div>
											<div className="font-medium text-gray-800">
												{request.collectorName} - {request.plasticAmount}kg
											</div>
											<div className="text-sm text-gray-600">
												{request.description}
											</div>
											<div className="text-xs text-gray-500">
												{new Date(request.createdAt).toLocaleString()}
											</div>
										</div>
										<div className="flex space-x-2">
											<button
												onClick={() =>
													handleRequestAction(request.id, 'accepted')
												}
												className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
											>
												Accept
											</button>
											<button
												onClick={() =>
													handleRequestAction(request.id, 'rejected')
												}
												className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
											>
												Reject
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Accepted Requests */}
					{acceptedRequests.length > 0 && (
						<div className="p-6 border-b">
							<h4 className="font-medium text-gray-700 mb-4">
								🟢 Accepted Requests
							</h4>
							<div className="space-y-2">
								{acceptedRequests.map(request => (
									<div
										key={request.id}
										className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200"
									>
										<div>
											<span className="font-medium text-gray-800">
												{request.collectorName} - {request.plasticAmount}kg
											</span>
											<div className="text-xs text-gray-500">
												Accepted on{' '}
												{new Date(request.createdAt).toLocaleDateString()}
											</div>
										</div>
										<span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
											Ready for recycling
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{/* Recent Processed Requests */}
					{processedRequests.length > 0 && (
						<div className="p-6">
							<h4 className="font-medium text-gray-700 mb-4">
								📋 Recent History
							</h4>
							<div className="space-y-2">
								{processedRequests.slice(-5).map(request => (
									<div
										key={request.id}
										className="flex items-center justify-between p-3 bg-gray-50 rounded"
									>
										<div>
											<span className="font-medium text-gray-800">
												{request.collectorName} - {request.plasticAmount}kg
											</span>
											<div className="text-xs text-gray-500">
												{new Date(request.createdAt).toLocaleDateString()}
											</div>
										</div>
										<span
											className={`px-2 py-1 rounded text-sm ${
												request.status === 'recycled'
													? 'bg-blue-100 text-blue-800'
													: 'bg-gray-100 text-gray-800'
											}`}
										>
											{request.status === 'recycled' ? 'Recycled' : 'Rejected'}
										</span>
									</div>
								))}
							</div>
						</div>
					)}

					{requests.length === 0 && (
						<div className="p-6 text-center text-gray-500">
							<div className="text-4xl mb-2">📭</div>
							<p>No requests received yet</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
