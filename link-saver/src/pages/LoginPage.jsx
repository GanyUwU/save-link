// import { useState } from "react";
// import api from "../api/client";


// export default function  LoginPage({onLogin}) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//          const resp = await api.post("/auth/token", new URLSearchParams({
//             username: email,
//             password,
//         }));
//         const token = resp.data.access_token;
//         localStorage.setItem("token", token);
//         onLogin(); 
//         }
//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//         <div className="bg-white p-8 rounded shadow-md w-96">
//             <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//             <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
//                 <input
//                 type="email"
//                 id="email"
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 placeholder="Enter your email"
//                 />
//             </div>
//             <div className="mb-6">
//                 <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
//                 <input
//                 type="password"
//                 id="password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 placeholder="Enter your password"
//                 />
//             </div>
//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
//             >
//                 Login
//             </button>

//             <button
//                 type="submit" onClick={() => window.location.href = "/register"}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
//             >
//                 register
//             </button>
//             </form>
//         </div>
//         </div>
//     );

// }

// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Prepare form-encoded data
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // Store token and update app state
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      onLogin();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
