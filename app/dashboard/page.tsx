'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaSun, FaArrowRight, FaPen, FaTrash } from 'react-icons/fa';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [files, setFiles] = useState<File[]>([]);  // State for uploaded files
  const router = useRouter();

  // Function to handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Handle the "Try for Free" button click
  const handleTryFree = () => {
    router.push('/dashboard');
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'}`}>
      <header className={`flex items-center justify-between p-4 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} shadow`}>
        <div className="flex items-center">
          <Image 
            src="https://plus.unsplash.com/premium_vector-1721209721442-efcb0003d6bf?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Celestial Box Logo" 
            className="h-10 w-10" 
            width={40} 
            height={40} 
          />
          <h1 className={`ml-2 text-xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>Celestial Box</h1>
        </div>
        <div className="flex items-center space-x-4">
          <FaSun onClick={toggleTheme} className={`text-xl cursor-pointer ${theme === 'light' ? 'text-yellow-500' : 'text-gray-300'}`} />
          <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center">D</div>
        </div>
      </header>

      <main className="p-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center text-gray-400">
          <label htmlFor="file-upload" className="cursor-pointer">
            Click here or drop a file to upload!
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>

        <h2 className={`mt-8 text-lg font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>All Files</h2>

        <div className="mt-4">
          <div className="flex justify-end mb-2">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 rounded-md text-sm font-medium">
              Sort By Newest
            </button>
          </div>

          <table className={`min-w-full ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'} rounded-lg shadow`}>
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left text-sm font-medium">Type</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Filename</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Date Added</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Size</th>
                <th className="px-4 py-2 text-left text-sm font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    <img src="https://placehold.co/40x40" alt="File icon" className="h-10 w-10" />
                  </td>
                  <td className="px-4 py-2 text-blue-500">
                    {file.name} <FaPen className="text-gray-400 ml-2 cursor-pointer" />
                  </td>
                  <td className="px-4 py-2 text-gray-500">{new Date().toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-500">{(file.size / 1024).toFixed(2)} kB</td>
                  <td className="px-4 py-2 text-blue-500">
                    <a href="#">Download</a> <FaTrash className="text-gray-400 ml-2 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default App;
