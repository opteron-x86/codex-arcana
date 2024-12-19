import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForms = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
  });
  const { login, signup, error, isLoading, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    clearError();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return; // Add error handling for password mismatch
    }

    try {
      await signup({
        username: formData.username,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email
          },
          autoSignIn: true
        }
      });
      setVerificationSent(true);
    } catch (err) {
      // Error is handled by context
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      navigate('/game');
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-dark-gray/50 p-8 rounded-xl 
                   border border-medium-gray/30 backdrop-blur-sm"
      >
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-gold" />
          <h2 className="mt-6 text-3xl font-serif text-gold">
            {isSignUp ? 'Join the Realm' : 'Enter the Realm'}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isSignUp ? 'signup' : 'signin'}
            initial={{ opacity: 0, x: isSignUp ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isSignUp ? -100 : 100 }}
            className="mt-8 space-y-6"
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">Username</label>
                <div className="relative">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 border
                             border-medium-gray placeholder-medium-gray
                             bg-dark-bg text-off-white rounded-md focus:outline-none
                             focus:ring-gold focus:border-gold sm:text-sm pl-10"
                    placeholder="Username"
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-medium-gray" />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2 border
                               border-medium-gray placeholder-medium-gray
                               bg-dark-bg text-off-white rounded-md focus:outline-none
                               focus:ring-gold focus:border-gold sm:text-sm pl-10"
                      placeholder="Email"
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-medium-gray" />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 border
                             border-medium-gray placeholder-medium-gray
                             bg-dark-bg text-off-white rounded-md focus:outline-none
                             focus:ring-gold focus:border-gold sm:text-sm pl-10"
                    placeholder="Password"
                  />
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-medium-gray" />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2 border
                               border-medium-gray placeholder-medium-gray
                               bg-dark-bg text-off-white rounded-md focus:outline-none
                               focus:ring-gold focus:border-gold sm:text-sm pl-10"
                      placeholder="Confirm Password"
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-medium-gray" />
                  </div>
                </div>
              )}
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
                className="w-full flex justify-center py-2 px-4 border border-transparent
                         rounded-md shadow-sm text-sm font-medium text-dark-bg bg-gold
                         hover:bg-ember focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-gold transition-colors duration-300
                         disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Enter'}
              </button>
            </div>
          </motion.form>
        </AnimatePresence>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              clearError();
            }}
            className="text-gold hover:text-ember transition-colors duration-300"
          >
            {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForms;