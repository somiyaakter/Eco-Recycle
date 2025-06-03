// app/collector/page.js - Collector Profile
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { storage } from '@/lib/storage'
import { AGENT_LIST } from '@/lib/data'
import toast from 'react-hot-toast'

export default function CollectorPage() {
	const [user, setUser] = useState(null)
	const [activeTab, setActiveTab] = useState('dashboard')
	const [selectedAgent, setSelectedAgent] = useState('')
	const [plasticAmount, setPlasticAmount] = useState('')
	const [requests, setRequests] = useState([])
	const [rewardHistory, setRewardHistory] = useState([])
	const router = useRouter()

	useEffect(() => {
		const currentUser = storage.getUser()
		if (!currentUser || currentUser.userType !== 'collector') {
			router.push('/login')
			return
		}
		setUser(currentUser)
		loadData()
	}, [router])

	const loadData = () => {
		const allRequests = storage.getRequests()
		const userRequests = allRequests.filter(
			req => req.collectorId === storage.getUser()?.id,
		)
		setRequests(userRequests)

		if (storage.getUser()) {
			const history = storage.getRewardHistory(storage.getUser().id)
			setRewardHistory(history)
		}
	}

	const handleSubmitRequest = e => {
		e.preventDefault()
		if (!selectedAgent || !plasticAmount) return

		const agent = AGENT_LIST.find(a => a.id === selectedAgent)
		const request = {
			collectorId: user.id,
			collectorName: user.username,
			agentId: selectedAgent,
			agentName: agent.name,
			plasticAmount: parseFloat(plasticAmount),
			description: `${plasticAmount}kg plastic waste collection`,
		}

		storage.addRequest(request)
		setSelectedAgent('')
		setPlasticAmount('')
		loadData()
		toast.success('Request sent successfully!')
	}

	const handleUseReward = () => {
		if (user.rewards >= 50) {
			const newRewards = user.rewards - 50
			const updatedUser = { ...user, rewards: newRewards }
			storage.setUser(updatedUser)
			setUser(updatedUser)

			storage.addRewardHistory(user.id, {
				type: 'used',
				amount: 50,
				description: 'Reward points used',
			})

			loadData()
			toast.success('50 reward points used!')
		} else {
			toast.error('Insufficient reward points! You need at least 50 points.')
		}
	}

	const handleLogout = () => {
		storage.logout()
		router.push('/')
	}

	if (!user) return <div>Loading...</div>

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="bg-white shadow-sm border-b">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-bold text-gray-800">
							Collector Dashboard
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
					<div className="flex items-center space-x-4">
						<div className="bg-green-100 p-4 rounded-full">
							<div className="text-3xl">🧑‍💼</div>
						</div>
						<div>
							<h2 className="text-xl font-semibold text-gray-800">
								Welcome, {user.username}!
							</h2>
							<p className="text-gray-600">Collector Account</p>
						</div>
						<div className="ml-auto text-right">
							<div className="text-2xl font-bold text-green-600">
								{user.rewards}
							</div>
							<div className="text-sm text-gray-500">Reward Points</div>
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="bg-white rounded-lg shadow mb-6">
					<div className="border-b">
						<nav className="flex space-x-8 px-6">
							{['dashboard', 'submit-request', 'history'].map(tab => (
								<button
									key={tab}
									onClick={() => setActiveTab(tab)}
									className={`py-4 px-2 border-b-2 font-medium text-sm ${
										activeTab === tab
											? 'border-green-500 text-green-600'
											: 'border-transparent text-gray-500 hover:text-gray-700'
									}`}
								>
									{tab === 'dashboard' && 'Dashboard'}
									{tab === 'submit-request' && 'Submit Request'}
									{tab === 'history' && 'Request History'}
								</button>
							))}
						</nav>
					</div>

					<div className="p-6">
						{activeTab === 'dashboard' && (
							<div>
								<div className="grid md:grid-cols-2 gap-6 mb-6">
									<div className="bg-green-50 p-4 rounded-lg">
										<h3 className="font-semibold text-green-800 mb-2">
											Available Agents
										</h3>
										<div className="space-y-2">
											{AGENT_LIST.map(agent => (
												<div
													key={agent.id}
													className="flex justify-between items-center"
												>
													<span className="text-green-700">{agent.name}</span>
													<span className="text-sm text-green-600">
														{agent.location}
													</span>
												</div>
											))}
										</div>
									</div>

									<div className="bg-blue-50 p-4 rounded-lg">
										<h3 className="font-semibold text-blue-800 mb-2">
											Recent Requests
										</h3>
										<div className="space-y-2">
											{requests.slice(0, 3).map(req => (
												<div
													key={req.id}
													className="flex justify-between items-center"
												>
													<span className="text-blue-700">
														{req.plasticAmount}kg
													</span>
													<span
														className={`text-sm px-2 py-1 rounded ${
															req.status === 'pending'
																? 'bg-yellow-100 text-yellow-800'
																: req.status === 'accepted'
																? 'bg-green-100 text-green-800'
																: 'bg-red-100 text-red-800'
														}`}
													>
														{req.status}
													</span>
												</div>
											))}
											{requests.length === 0 && (
												<p className="text-blue-600 text-sm">No requests yet</p>
											)}
										</div>
									</div>
								</div>

								<button
									onClick={handleUseReward}
									className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-medium"
								>
									Use 50 Reward Points
								</button>
							</div>
						)}

						{activeTab === 'submit-request' && (
							<div>
								<h3 className="text-lg font-semibold mb-4">
									Submit Plastic to Agent
								</h3>
								<form
									onSubmit={handleSubmitRequest}
									className="space-y-4 max-w-md"
								>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Select Agent
										</label>
										<select
											value={selectedAgent}
											onChange={e => setSelectedAgent(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
											required
										>
											<option value="">Choose an agent...</option>
											{AGENT_LIST.map(agent => (
												<option key={agent.id} value={agent.id}>
													{agent.name} - {agent.location}
												</option>
											))}
										</select>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Plastic Amount (kg)
										</label>
										<input
											type="number"
											step="0.1"
											value={plasticAmount}
											onChange={e => setPlasticAmount(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
											required
											placeholder="Enter weight in kg"
										/>
									</div>

									<button
										type="submit"
										className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
									>
										Send Request
									</button>
								</form>
							</div>
						)}

						{activeTab === 'history' && (
							<div>
								<h3 className="text-lg font-semibold mb-4">
									Request & Reward History
								</h3>

								<div className="space-y-4">
									<div>
										<h4 className="font-medium text-gray-700 mb-2">
											Plastic Requests
										</h4>
										<div className="space-y-2">
											{requests.map(req => (
												<div
													key={req.id}
													className="flex justify-between items-center p-3 bg-gray-50 rounded"
												>
													<div>
														<span className="font-medium">
															{req.plasticAmount}kg to {req.agentName}
														</span>
														<div className="text-sm text-gray-500">
															{new Date(req.createdAt).toLocaleDateString()}
														</div>
													</div>
													<span
														className={`px-2 py-1 rounded text-sm ${
															req.status === 'pending'
																? 'bg-yellow-100 text-yellow-800'
																: req.status === 'accepted'
																? 'bg-green-100 text-green-800'
																: 'bg-red-100 text-red-800'
														}`}
													>
														{req.status}
													</span>
												</div>
											))}
											{requests.length === 0 && (
												<p className="text-gray-500">
													No requests submitted yet
												</p>
											)}
										</div>
									</div>

									<div>
										<h4 className="font-medium text-gray-700 mb-2">
											Reward History
										</h4>
										<div className="space-y-2">
											{rewardHistory.map(record => (
												<div
													key={record.id}
													className="flex justify-between items-center p-3 bg-gray-50 rounded"
												>
													<div>
														<span className="font-medium">
															{record.description}
														</span>
														<div className="text-sm text-gray-500">
															{new Date(record.date).toLocaleDateString()}
														</div>
													</div>
													<span
														className={`px-2 py-1 rounded text-sm ${
															record.type === 'earned'
																? 'bg-green-100 text-green-800'
																: 'bg-red-100 text-red-800'
														}`}
													>
														{record.type === 'earned' ? '+' : '-'}
														{record.amount} pts
													</span>
												</div>
											))}
											{rewardHistory.length === 0 && (
												<p className="text-gray-500">No reward history yet</p>
											)}
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
