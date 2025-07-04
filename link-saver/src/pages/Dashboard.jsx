
import { useState, useEffect, useContext, use } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { Input } from '../components/UI/input';
import { Button } from '../components/UI/button';
import { Card } from '../components/UI/card';
import { ThemeContext } from '../context/ThemeContext';
import { ThemeToggle } from '../components/UI/theme';
import { Link2, Copy, ExternalLink } from 'lucide-react';
import Navbar from '../components/UI/navbar';


export default function DashboardPage() {
  const [url, setUrl] = useState('');
  const [stats, setStats] = useState({ total: 0, latest: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); 

  const [dark, setDark] = useState(true); 

  
  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    console.log(`Navigating to: ${path}`);
    navigate(path); // Use actual navigate
    // setMessage({ type: 'info', text: `Navigated to ${path}` }); // Optional feedback
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!url.trim()) {
      setMessage({ type: 'error', text: 'URL cannot be empty.' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' }); // Clear previous messages

    try {
      await api.post('/links/', { url });
      setUrl('');
      await fetchStats();
      setMessage({ type: 'success', text: `Link "${url}" saved successfully!` });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to save link. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const resp = await api.get('/links/');
      const links = resp.data;
      setStats({ total: links.length, latest: links.slice(-5).reverse() }); // Display top 5 latest
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to fetch stats.' });
    }
  };

  const copyToClipboard = async (linkUrl) => {
    try {
      // Use execCommand for better compatibility in iframe environments
      const el = document.createElement('textarea');
      el.value = linkUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setMessage({ type: 'success', text: 'Link copied to clipboard!' });
    } catch (error) {
      console.error('Failed to copy:', error);
      setMessage({ type: 'error', text: 'Failed to copy link.' });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    // Wrap the entire component with ThemeContext.Provider for ThemeToggle to work
    <ThemeContext.Provider value={{ dark, setDark }}>
      <Navbar/>
      <div className="pt-20">
      <div className={`min-h-screen relative font-sans ${
          dark
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden bg-gradient-to-tr from-white/5 via-transparent to-gray-300/10'
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
       

        {/* Animated background shapes for visual depth */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse ${
            dark ? 'bg-gray-700' : 'bg-blue-400'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse ${
            dark ? 'bg-gray-600' : 'bg-indigo-400'
          }`} style={{animationDelay: '2s'}}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse ${
            dark ? 'bg-gray-800' : 'bg-purple-400'
          }`} style={{animationDelay: '4s'}}></div>
        </div>

        {/* Theme Toggle Button positioned top right */}
        <div className="absolute top-4 right-4 z-20">
          <ThemeToggle />
        </div>

        {/* Main Content Wrapper */}
        {/* Adjusted pt-20 to pt-8 or pt-16 depending on desired spacing and if a fixed navbar is present */}
        <div className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

       
            <div className="text-center mb-12 mt-12"> {/* Added mt-12 for space from top/navbar */}
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${dark ? 'bg-white/10 backdrop-blur-sm' : 'bg-blue-500/20'}`}>
                  <Link2 className={`w-12 h-12 ${dark ? 'text-white' : 'text-blue-700'}`} />
                </div>
              </div>
              <h1 className={`text-4xl sm:text-6xl font-bold mb-4 ${dark ? 'text-white' : 'text-gray-800'}`}>
                Link<span className={`${dark ? 'text-gray-300' : 'text-gray-600'}`}>ify</span>
              </h1>
              <p className={`text-xl mb-8 max-w-2xl mx-auto ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                Save, organize, and access your favorite links from anywhere.
                Your personal link management solution.
              </p>
            </div>

       
            <div className="flex justify-center">
              <Card className={`backdrop-blur-sm p-8 mb-8 w-full max-w-md ${
                dark ? 'bg-white/10 border-gray-700/50' : 'bg-white/80 border-blue-200'
              }`}>
                <h2 className={`text-2xl font-semibold mb-6 text-center ${dark ? 'text-white' : 'text-gray-800'}`}>
                  Save a New Link
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className={`h-12 w-full text-lg ${
                        dark // Conditional input styling
                          ? 'bg-white/5 border border-gray-600/50 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400'
                          : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:ring-blue-400'
                      }`}
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant={dark ? 'ghost' : 'primary'} // Use variant prop for styling
                    className={`w-full h-12 text-lg font-semibold transition-all duration-200 ${
                      dark // Conditional button styling
                        ? 'bg-white/80 text-black hover:bg-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    disabled={isLoading || !url.trim()}
                  >
                    {isLoading ? "Saving..." : "Save Link"}
                  </Button>
                </form>
                {message.text && (
                  <p className={`mt-4 text-center text-sm ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                    {message.text}
                  </p>
                )}
              </Card>
            </div>

            {/* Stats Cards */}
            <div className='grid md:grid-cols-2 gap-6 mb-8'>
              <Card className={`backdrop-blur-sm p-6 ${
                dark ? 'bg-white/10 border-gray-700/50' : 'bg-white/80 border-blue-200'
              }`}>
                <div className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-800'}`}>{stats.total}</div>
                  <div className={`${dark ? 'text-gray-300' : 'text-gray-600'} text-md`}>Total Links Saved</div>
                </div>
              </Card>
              <Card className={`backdrop-blur-sm p-6 ${
                dark ? 'bg-white/10 border-gray-700/50' : 'bg-white/80 border-blue-200'
              }`}>
                <div className="text-center">
                  <div className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : 'text-gray-800'}`}>Latest Link</div>
                  <div className={`mb-2 font-bold text-3xl truncate ${dark ? 'text-white' : 'text-gray-800'}`}>
                    {stats.latest && stats.latest.length > 0
                      ? new URL(stats.latest[0].url).hostname || 'N/A'
                      : 'No links yet'
                    }
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Links */}
            {stats.latest && stats.latest.length > 0 && (
              <Card className={`backdrop-blur-sm p-6 mb-8 ${
                dark ? 'bg-white/10 border-gray-700/50' : 'bg-white/80 border-blue-200'
              }`}>
                <h2 className={`text-xl font-semibold mb-6 ${dark ? 'text-white' : 'text-gray-800'}`}>Recent Links</h2>
                <div className='space-y-6'> {/* Increased space for better visual separation */}
                  {stats.latest.map((link) => (
                    <div
                      key={link.id}
                      className={`flex items-center justify-between text-lg p-4 rounded-lg border transition-colors ${
                        dark ? 'bg-white/5 border-gray-700/30 hover:bg-white/8' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <ExternalLink className={`w-4 h-4 flex-shrink-0 ${dark ? 'text-gray-400' : 'text-gray-600'}`} />
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`hover:text-gray-300 transition-colors truncate ${dark ? 'text-white' : 'text-blue-600'}`}
                        >
                          {new URL(link.url).hostname}
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(link.url)}
                        className={`ml-4 ${dark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
                      >
                        <Copy className='w-4 h-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}