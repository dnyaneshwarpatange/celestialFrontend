'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSun, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | null>(null); // Initial state is null
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration status
  const router = useRouter();

  useEffect(() => {
    // This will run only on the client side after the component mounts
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkTheme(storedTheme === 'dark');
    } else {
      setIsDarkTheme(false); // Default to light theme if no theme is stored
    }

    // Set hydration status to true after the first render
    setIsHydrated(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    setIsDarkTheme(newTheme);
  };

  const handleStartForFree = () => {
    router.push('/dashboard');
  };

  if (!isHydrated) {
    return <div>Loading...</div>; // Prevent hydration error during the first render
  }

  return (
    <div className={`${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'} min-h-screen`}>
      <header className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4`}>
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="https://plus.unsplash.com/premium_vector-1721209721442-efcb0003d6bf?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Celestial Box Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-semibold">Celestial Box</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="text-xl transition duration-300 ease-in-out">
              <FaSun />
            </button>
            <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-blue-500'} text-white rounded-full h-10 w-10 flex items-center justify-center`}>
              <span className="text-xl font-bold">D</span>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto mt-12 p-6">
        <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl p-8 flex items-center space-x-8`}>
          <div className="w-1/2 space-y-4">
            <h2 className="text-4xl font-bold">Welcome to Celestial Box</h2>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
              Storing everything for you and your business needs. All in one place.
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enhance your personal storage with Celestial Box, offering a simple and efficient way to upload,
              organize, and access files from anywhere. Securely store important documents and media, and experience
              the convenience of easy file management and sharing in one centralized solution.
            </p>
            <button
              onClick={handleStartForFree}
              className={`${isDarkTheme ? 'bg-gray-700' : 'bg-blue-600'} text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 flex items-center space-x-2`}
            >
              <span>Try it for free!</span>
              <FaArrowRight />
            </button>
          </div>
          <div className="w-1/2">
            <Image
              src="https://plus.unsplash.com/premium_vector-1726679388141-6cd0c8251451?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Celestial Box Interface"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(App), { ssr: false });
