import '../globals.css'

export const metadata = {
	title: 'Dashboard - EcoRecycle Platform',
	description: 'Manage your plastic recycling activities',
}

export default function DashboardLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-gray-50 min-h-screen">
				<main className="min-h-screen">{children}</main>
			</body>
		</html>
	)
}
