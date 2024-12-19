import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { Shield } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-dark-gray/50 p-8 rounded-xl border border-medium-gray/30"
      >
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-gold" />
          <h2 className="mt-6 text-3xl font-serif text-gold">
            Enter the Realm
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border
                           border-medium-gray placeholder-medium-gray
                           bg-dark-bg text-off-white rounded-md focus:outline-none
                           focus:ring-gold focus:border-gold sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-3 py-2 border
                           border-medium-gray placeholder-medium-gray
                           bg-dark-bg text-off-white rounded-md focus:outline-none
                           focus:ring-gold focus:border-gold sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-ember text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border
                         border-transparent text-sm font-medium rounded-md text-dark-bg
                         bg-gold hover:bg-ember focus:outline-none focus:ring-2
                         focus:ring-offset-2 focus:ring-gold transition-colors
                         duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Entering...' : 'Enter'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;