// Plastic recycling management system

/_ PROJECT STRUCTURE: /app /globals.css /layout.js /page.js (Home page)
/login/page.js /signup/page.js /collector/page.js /agent/page.js /lib /data.js
(hardcoded users and helper functions) /storage.js (localStorage helpers)
/components /Navbar.js package.json _/

// 1. First, update your app/globals.css to include Tailwind /_ @tailwind base;
@tailwind components; @tailwind utilities; _/

// 2. app/layout.js import './globals.css'

export const metadata = { title: 'Plastic Recycling Platform', description:
'University plastic recycling management system', }

export default function RootLayout({ children }) { return ( <html lang="en">
<body className="bg-gray-50 min-h-screen"> {children} </body> </html> ) }

// 3. lib/data.js - Hardcoded users and initial data export const USERS = {
collectors: [ { id: 'col1', username: 'john_collector', password: 'pass123',
rewards: 150 }, { id: 'col2', username: 'sarah_collector', password: 'pass123',
rewards: 200 } ], agents: [ { id: 'ag1', username: 'mike_agent', password:
'pass123', totalPlastic: 45.5 }, { id: 'ag2', username: 'lisa_agent', password:
'pass123', totalPlastic: 62.3 } ] }

export const AGENT_LIST = [ { id: 'ag1', name: 'Mike Agent', location: 'Building
A' }, { id: 'ag2', name: 'Lisa Agent', location: 'Building B' } ]

// 4. lib/storage.js - localStorage helpers export const storage = { setUser:
(user) => { if (typeof window !== 'undefined') {
localStorage.setItem('currentUser', JSON.stringify(user)) } },

getUser: () => { if (typeof window !== 'undefined') { const user =
localStorage.getItem('currentUser') return user ? JSON.parse(user) : null }
return null },

logout: () => { if (typeof window !== 'undefined') {
localStorage.removeItem('currentUser') } },

getRequests: () => { if (typeof window !== 'undefined') { const requests =
localStorage.getItem('plasticRequests') return requests ? JSON.parse(requests) :
[] } return [] },

addRequest: (request) => { if (typeof window !== 'undefined') { const requests =
storage.getRequests() const newRequest = { id: Date.now().toString(),
...request, status: 'pending', createdAt: new Date().toISOString() }
localStorage.setItem('plasticRequests', JSON.stringify([...requests,
newRequest])) return newRequest } },

updateRequest: (id, updates) => { if (typeof window !== 'undefined') { const
requests = storage.getRequests() const updated = requests.map(req => req.id ===
id ? { ...req, ...updates } : req ) localStorage.setItem('plasticRequests',
JSON.stringify(updated)) } },

getRewardHistory: (userId) => { if (typeof window !== 'undefined') { const
history = localStorage.getItem(`rewards_${userId}`) return history ?
JSON.parse(history) : [] } return [] },

addRewardHistory: (userId, record) => { if (typeof window !== 'undefined') {
const history = storage.getRewardHistory(userId) const newRecord = { id:
Date.now().toString(), ...record, date: new Date().toISOString() }
localStorage.setItem(`rewards_${userId}`, JSON.stringify([...history,
newRecord])) } } }

// Setup Instructions: // 1. Create the folder structure as shown above // 2.
Install required dependencies: npm install // 3. Make sure tailwindcss is
configured in your project // 4. Copy each file content to respective locations
// 5. Run: npm run dev
# Eco-Recycle
# Eco-Recycle
