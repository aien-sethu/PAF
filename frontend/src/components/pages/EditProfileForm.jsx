import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AnimatedBackground from '../AnimatedBackground';

const EditProfileForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    location: user?.location || '',
    bio: user?.bio || '',
    stayConnected: false
  });
  const [emailSent, setEmailSent] = useState(false);

  const sendWelcomeEmail = async () => {
    try {
      // Here you would normally make an API call to your backend email service
      // For demo purposes, we'll simulate an email being sent
      console.log('Sending welcome email to:', user.email);
      
      const emailContent = {
        to: user.email,
        subject: 'Stay Connected with Us!',
        body: `Hi ${user.name},

Thanks for signing up! 🎉 You'll receive exclusive offers, product updates, and event invites straight to your inbox.

Stay tuned for exciting news!

Best,
AgriConnect`
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEmailSent(true);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  };

  const handleStayConnected = async (value) => {
    setFormData(prev => ({ ...prev, stayConnected: value }));
    if (value) {
      await sendWelcomeEmail();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      location: formData.location,
      bio: formData.bio,
      stayConnected: formData.stayConnected
    };

    // Update user in context and localStorage
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Navigate back to profile
    navigate('/profile');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl relative">
      <AnimatedBackground />
      <div 
        className="rounded-xl shadow-sm p-6 relative overflow-hidden"
        style={{
          backgroundImage: "url('/src/assets/images/formbg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Add an overlay for better text readability */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        
        {/* Content container */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6">Edit Profile Information</h2>
          
          {emailSent && (
            <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Welcome email sent! Check your inbox.</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="Enter your location"
              />
            </div>

            {/* Bio Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                rows="4"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Stay Connected Option */}
            <div>
              <h3 className="font-medium mb-4">Stay Connected With Us!</h3>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleStayConnected(true)}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    formData.stayConnected 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleStayConnected(false)}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    !formData.stayConnected 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  No thanks
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;