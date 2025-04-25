import React, { useState } from 'react';

const UpdatePrompt = () => {
  const [showWelcome, setShowWelcome] = useState(false);

  const handleYes = () => {
    setShowWelcome(true);
    // Send welcome email logic here
    sendWelcomeEmail();
  };

  const sendWelcomeEmail = () => {
    // Email sending logic would go here
    console.log('Welcome email sent');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Stay connected with our latest updates?</h2>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleYes}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={() => setShowWelcome(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            No
          </button>
        </div>
        
        {showWelcome && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-600">Welcome to AgriConnect!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePrompt;