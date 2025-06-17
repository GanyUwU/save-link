
export default function Navbar() {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <a href="/" className="text-white hover:text-gray-200 mr-4">Home</a>
                    <a href="/dashboard" className="text-white hover:text-gray-200">Dashboard</a>
                    <button
                    onClick={() => alert('Logout functionality not implemented yet')}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200"
                >
                    Logout
                </button>
                </div>
                 
            </div>
        </nav>
    )
}