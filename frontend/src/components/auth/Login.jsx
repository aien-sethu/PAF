import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import AnimatedBackground from '../AnimatedBackground'; // Add this import

const Login = () => {
  const { setIsLoggedIn, setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === formData.email) {
          // Keep the existing profile image when logging in
          setIsLoggedIn(true);
          setUser({
            ...user,
            profileImage: user.profileImage || "/src/assets/images/empty-profile.png"
          });
        } else {
          setErrors({ auth: 'Invalid credentials' });
        }
      } else {
        setErrors({ auth: 'User not found. Please sign up.' });
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrors({ auth: 'Login failed' });
    }
  };

  const handleGoogleLogin = async () => {
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

            // Check if Google user exists in localStorage
            const storedGoogleUser = localStorage.getItem(`google_user_${userInfo.email}`);
            if (storedGoogleUser) {
              const user = JSON.parse(storedGoogleUser);
              setIsLoggedIn(true);
              setUser(user);
            } else {
              setErrors({ auth: 'Google account not found. Please sign up first.' });
            }
          } catch (error) {
            console.error('Failed to get user info:', error);
            setErrors({ auth: 'Login failed' });
          }
        },
      });

      client.requestAccessToken();
    } catch (error) {
      console.error('Google login failed:', error);
      setErrors({ auth: 'Google login failed' });
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
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
                required
              />
            </div>
            {errors.auth && (
              <p className="text-red-500 text-sm">{errors.auth}</p>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Login
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
            onClick={handleGoogleLogin}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-white/80 border border-gray-300 px-6 py-3 rounded-lg hover:bg-white"
          >
            <img src="/src/assets/images/google-icon.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;