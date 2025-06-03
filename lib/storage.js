export const storage = {
	setUser: user => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('currentUser', JSON.stringify(user))
		}
	},

	getUser: () => {
		if (typeof window !== 'undefined') {
			const user = localStorage.getItem('currentUser')
			return user ? JSON.parse(user) : null
		}
		return null
	},

	logout: () => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('currentUser')
		}
	},

	getRequests: () => {
		if (typeof window !== 'undefined') {
			const requests = localStorage.getItem('plasticRequests')
			return requests ? JSON.parse(requests) : []
		}
		return []
	},

	addRequest: request => {
		if (typeof window !== 'undefined') {
			const requests = storage.getRequests()
			const newRequest = {
				id: Date.now().toString(),
				...request,
				status: 'pending',
				createdAt: new Date().toISOString(),
			}
			localStorage.setItem(
				'plasticRequests',
				JSON.stringify([...requests, newRequest]),
			)
			return newRequest
		}
	},

	updateRequest: (id, updates) => {
		if (typeof window !== 'undefined') {
			const requests = storage.getRequests()
			const updated = requests.map(req =>
				req.id === id ? { ...req, ...updates } : req,
			)
			localStorage.setItem('plasticRequests', JSON.stringify(updated))
		}
	},

	getRewardHistory: userId => {
		if (typeof window !== 'undefined') {
			const history = localStorage.getItem(`rewards_${userId}`)
			return history ? JSON.parse(history) : []
		}
		return []
	},

	addRewardHistory: (userId, record) => {
		if (typeof window !== 'undefined') {
			const history = storage.getRewardHistory(userId)
			const newRecord = {
				id: Date.now().toString(),
				...record,
				date: new Date().toISOString(),
			}
			localStorage.setItem(
				`rewards_${userId}`,
				JSON.stringify([...history, newRecord]),
			)
		}
	},
}
