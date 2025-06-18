import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import api from "../api/client";


export default function DashboardPage(){

    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/saved-links');
  };

        const handleSubmit = async e => {
        e.preventDefault();
        const url = e.target.url.value.trim(); 
        if(!url) return alert("Please enter a valid URL");

        try{
            const resp = await api.post("/links/", { url });
            console.log("Link saved successfully:", resp.data);
            e.target.reset(); // Clear the input field after submission
        }
        catch (error) {
            console.error("Error saving link:", error);
            alert("Failed to save link. Please try again.");
        }
    };


    return (

        <div className="flex items-center justify-center h-screen bg-gray-100">
             <Navbar />
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Linkify</h2>
                <p className="text-gray-700 mb-4">Welcome to your Link Saver!</p>
            </div>

            <div>
                <h2>Save any URl or Link you want below - </h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-gray-700">URL</label>
                    <input
                        name="url"
                        type="url"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        placeholder="Enter your URL here"></input>

                    <button type="submit" 
                     
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
                        Save Link
                    </button>
                </form>

                <button
                    onClick={handleClick} 
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition duration-200">
                    View saved links
                </button>
            </div>
        </div>
    );
}