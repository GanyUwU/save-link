
export default function SavedLinks() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Saved Links</h2>
                <p className="text-gray-700 mb-4">Here are your saved links:</p>
                {/* Placeholder for saved links */}
                <ul className="list-disc pl-5">
                    <li>https://example.com</li>
                    <li>https://another-example.com</li>
                </ul>
            </div>
        </div>

    )
}