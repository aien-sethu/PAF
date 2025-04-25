import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPromptModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/profile'); // Changed from '/login' to '/profile'
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Please Login / SignUp</h2>
        <p className="text-gray-600 mb-6">
          You need to be logged in to create a learning plan. Would you like to login or register now?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPromptModal;