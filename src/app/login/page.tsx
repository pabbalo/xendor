
'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/clients');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (username && password) {
      try {
        const fakeToken = 'fake-jwt-token-for-' + username;
        login(fakeToken);
        router.push('/clients');
      } catch (err: any) {
        setError(err.message || 'Si è verificato un errore durante il login.');
      }
    } else {
      setError('Per favore, inserisci username e password.');
    }
  };

  if (isLoading || (!isLoading && isAuthenticated)) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Caricamento...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 max-w-md w-full">
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm sm:text-base">
            Logo
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-700 mb-6">
          Accesso Xendor CRM
        </h2>
        {error && <p className="text-red-500 text-xs sm:text-sm text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Email o Nome Utente
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="iltuo@esempio.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="La tua password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 text-sm sm:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4"
          >
            ACCEDI
          </button>
          <div className="text-center">
            <a href="#" className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-500">
              Password dimenticata?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

