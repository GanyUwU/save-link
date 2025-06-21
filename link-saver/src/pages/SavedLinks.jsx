// src/pages/SavedLinks.jsx
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import api from "../api/client";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UI/navbar";
import { Trash2 } from "lucide-react";


export default function SavedLinks() {
  const [links, setLinks] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [dark, setDark] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    api.get("/links")
      .then(res => {
      const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setLinks(sorted);})
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this link?")) {
      try {
        await api.delete(`/links/${id}`);
        setLinks(prev => prev.filter(link => link.id !== id));

      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const filteredLinks = selectedTag   
  ? links.filter(link => link.tags?.includes(selectedTag)) 
  : links;

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 px-4">
      <Navbar />
      <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Saved Links</h1>
      <div className="mb-4 flex gap-2 flex-wrap">
        {["Image", "Video", "News", "Blog", "Music", "Social Media Post"].map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredLinks.map(link => {
          const isOpen = expanded === link.id;
          return (
            <div
              key={link.id}
              onClick={() => setExpanded(isOpen ? null : link.id)}
              className="cursor-pointer border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300 bg-white dark:bg-gray-800 relative"
            >
              <img
                src={link.image_url || "../assets/placeholder-image.png"}
                alt={link.title}
                  className={`w-full object-cover rounded-t-lg transition-all duration-300 ${isOpen ? "h-auto" : "h-48"}`}
              />
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-lg dark:text-white">{link.title}</h3>
                <p className="text-sm text-gray-500">{link.domain}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {link.description ? (
                    isOpen ? link.description : `${link.description.slice(0, 100)}…`
                  ) : (
                    "No description available."
                  )}
                </p>
                {isOpen && link.summary && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                    Summary: {link.summary}
                  </p>
                )}
                {isOpen && link.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {link.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1/2 rounded-full text-gray-800 dark:text-white">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(link.id);
                }}
                className="absolute top-4 right-4 group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-25 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 ease-out hover:rotate-3"
              >
                <Trash2 size={16} className="group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  </div>
    </ThemeContext.Provider>
  );
}
