import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <button
              className={`${activeTab === 'login' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`${activeTab === 'signup' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600'}`} 
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
          <button onClick={onClose}>×</button>
        </div>
        
        {activeTab === 'login' ? <Login /> : <SignUp />}
      </div>
    </div>
  );
};

export default AuthModal;