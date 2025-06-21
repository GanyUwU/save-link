import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Link2 } from "lucide-react";
import { Button } from "../components/UI/button";
import { Input } from "../components/UI/input";
import { Card } from "../components/UI/card";
import { Label } from "../components/UI/label";
import { ThemeContext } from "../context/ThemeContext";
import { ThemeToggle } from "../components/UI/theme";
import api from "../api/client";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dark } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative font-sans ${
        dark
          ? "bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2b2b2b]"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse ${
            dark ? "bg-gray-700" : "bg-blue-400"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse ${
            dark ? "bg-gray-600" : "bg-indigo-400"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse ${
            dark ? "bg-white" : "bg-purple-400"
          }`}
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className={`p-3 rounded-full ${
                dark ? "bg-white/10 backdrop-blur-sm" : "bg-blue-500/20"
              }`}
            >
              <Link2
                className={`w-8 h-8 ${dark ? "text-white" : "text-blue-700"}`}
              />
            </div>
          </div>
          <h1 className={`text-3xl font-bold ${dark ? "text-white" : "text-gray-800"}`}>
            Link<span className={`${dark ? "text-gray-300" : "text-gray-600"}`}>ify</span>
          </h1>
          <p className={`${dark ? "text-gray-300" : "text-gray-600"} mt-2`}>
            Create your account
          </p>
        </div>

        <Card
          className={`p-8 backdrop-blur-lg border-0 shadow-2xl ${
            dark
              ? "bg-[#1a1a1a]/90 shadow-black/40"
              : "bg-white/80 shadow-blue-500/20"
          }`}
        >
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                dark
                  ? "bg-gradient-to-r from-gray-700 to-gray-600"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500"
              }`}
            >
              <User className="text-white" size={24} />
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${dark ? "text-white" : "text-gray-800"}`}>
              Create Account
            </h2>
            <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
              Start sharing your links today
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    dark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`pl-10 w-80 h-12 rounded-lg border-2 transition-all duration-200 ${
                      dark
                        ? "bg-[#2e2e2e] border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/40"
                        : "bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-white"
                    } backdrop-blur-sm`}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-2 ${
                    dark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                    size={18}
                  />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`pl-10 w-80 h-12 rounded-lg border-2 transition-all duration-200 ${
                      dark
                        ? "bg-[#2e2e2e] border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/40"
                        : "bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 focus:bg-white"
                    } backdrop-blur-sm`}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full h-12 text-white font-medium rounded-lg transition-all duration-200 ${
                dark
                  ? "bg-gradient-to-r from-[#444] to-[#222] hover:from-[#555] hover:to-[#333] shadow-md shadow-black/40 hover:shadow-black/50"
                  : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
              } disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]`}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p
              className={`text-sm text-center ${
                dark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className={`font-medium transition-colors ${
                  dark
                    ? "text-gray-300 hover:text-white"
                    : "text-blue-600 hover:text-blue-500"
                } hover:underline`}
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
