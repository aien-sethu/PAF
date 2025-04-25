import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { useAuth } from '../../context/AuthContext';
import UpdatePrompt from './UpdatePrompt';
import ProfileDetailsBox from './ProfileDetailsBox';
import AnimatedBackground from '../AnimatedBackground'; // Add this import

const SignUp = () => {
  const { setIsLoggedIn, setUser } = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showDetailsBox, setShowDetailsBox] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const newUser = {
          name: formData.name,
          email: formData.email,
          username: `@${formData.name.toLowerCase().replace(/\s+/g, '')}`,
          bio: "",
          location: "",
          // Remove profileImage property as we'll generate it dynamically
          stats: {
            posts: 0,
            learning: 0,
            followers: 0,
            following: 0
          }
        };

        // Store complete user data in localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        
        setIsLoggedIn(true);
        setUser(newUser); // This will trigger updateUser in AuthContext

        setShowDetailsBox(true);
      } catch (error) {
        console.error('Signup failed:', error);
      }
    }
  };

  // Add ProfileDetailsBox component
  const handleDetailsClose = () => {
    setShowDetailsBox(false);
    navigate('/profile');
  };

  const handleGoogleSignUp = async () => {
    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: '610345328922-un33fn1in5v55ru5peaafdkj92adugna.apps.googleusercontent.com',
        scope: 'email profile',
        callback: async (response) => {
          try {
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                'Authorization': `Bearer ${response.access_token}`
              }
            }).then(res => res.json());

            const newUser = {
              name: userInfo.name,
              email: userInfo.email,
              username: `@${userInfo.given_name.toLowerCase()}`,
              profileImage: userInfo.picture,
              bio: "New to AgriConnect",
              location: "Not specified",
              stats: {
                posts: 0,
                learning: 0,
                followers: 0,
                following: 0
              }
            };

            // Store Google user data in localStorage
            localStorage.setItem(`google_user_${userInfo.email}`, JSON.stringify(newUser));
            
            setIsLoggedIn(true);
            setUser(newUser);
            setShowPrompt(true);
          } catch (error) {
            console.error('Failed to get user info:', error);
            setErrors({
              ...errors,
              google: 'Failed to get user information'
            });
          }
        },
      });

      client.requestAccessToken();
    } catch (error) {
      console.error('Google signup failed:', error);
      setErrors({
        ...errors,
        google: 'Google sign-in failed. Please try again.'
      });
    }
  };

  return (
    <div className="space-y-6 relative">
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-2`}
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-2`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-4 py-2`}
                required
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 w-full rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} px-4 py-2`}
                required
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Sign Up
            </button>
          </form>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/70 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignUp}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-white/80 border border-gray-300 px-6 py-3 rounded-lg hover:bg-white"
          >
            <img src="/src/assets/images/google-icon.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
      {showPrompt && <UpdatePrompt />}
      {showDetailsBox && (
        <ProfileDetailsBox 
          onClose={handleDetailsClose}
          isEditing={false}
        />
      )}
    </div>
  );
};

export default SignUp;