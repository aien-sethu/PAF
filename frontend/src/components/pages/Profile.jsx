import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SignUp from '../auth/SignUp';
import Login from '../auth/Login';
import ProfileDetailsBox from '../auth/ProfileDetailsBox'; // Add this import

const Profile = () => {
  const { user, isLoggedIn, setUser } = useAuth();
  const [showDetailsBox, setShowDetailsBox] = useState(false);
  const [activeTab, setActiveTab] = useState('activity');
  const [profileImage, setProfileImage] = useState(user?.profileImage || "/src/assets/images/empty-profile.png");

  // Add tab click handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const [authTab, setAuthTab] = useState('login');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/profile');
  };

  // Update the TabButton component
  const TabButton = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg transition-all duration-300 border-2 ${
        active 
          ? 'bg-green-500 text-white shadow-lg transform hover:scale-105 border-green-600'
          : 'bg-white/50 hover:bg-white/80 text-gray-700 border-gray-300 hover:border-green-400'
      }`}
    >
      {label}
    </button>
  );

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                authTab === 'login' ? 'bg-green-500 text-white' : 'text-gray-600'
              }`}
              onClick={() => setAuthTab('login')}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                authTab === 'signup' ? 'bg-green-500 text-white' : 'text-gray-600'
              }`}
              onClick={() => setAuthTab('signup')}
            >
              Sign Up
            </button>
          </div>
          
          {authTab === 'login' ? <Login /> : <SignUp />}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-sm p-6 mb-6 relative overflow-hidden">
        {/* Add subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.1
              }}
            >
              🌿
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {/* Profile Image with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/30 rounded-full blur-xl animate-pulse"></div>
            
            {/* Emoji positioned above the profile picture */}
            <div className="absolute -bottom-0 right-0 text-6xl z-15 transform translate-x-2">🌿</div>
            
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-7xl font-semibold relative overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 border-4 border-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45"></div>
              <span className="transform hover:scale-110 transition-transform duration-200">
                {user?.name?.[0]?.toUpperCase() || '?'}
              </span>
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            
            {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
            {user.location && (
              <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">{user.location}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-6 text-center">
              {Object.entries(user.stats).map(([key, value]) => (
                <div key={key}>
                  <div className="text-2xl font-bold text-gray-900">{value}</div>
                  <div className="text-sm text-gray-500 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div 
        className="rounded-xl left-50 shadow-sm p-5 relative overflow-hidden mb-9 w-322 h-23"
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
          <div className="flex gap-10 overflow-x-auto">
            <TabButton 
              id="activity" 
              label="Activity & Contributions" 
              active={activeTab === 'activity'} 
              onClick={handleTabClick}
            />
            <TabButton 
              id="learning" 
              label="Learning Progress" 
              active={activeTab === 'learning'} 
              onClick={handleTabClick}
            />
            <TabButton 
              id="settings" 
              label="Settings" 
              active={activeTab === 'settings'} 
              onClick={handleTabClick}
            />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="rounded-xl shadow-sm relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/src/assets/videos/formtwobg.mp4" type="video/mp4" />
        </video>

        {/* Add an overlay for better readability */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        
        {/* Content container */}
        <div className="relative z-10 p-6">
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Your Activities
                <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  Last 7 days
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((post) => (
                  <div key={post} className="bg-white/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 group">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold group-hover:text-green-600 transition-colors">Post Title {post}</h3>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-600 text-sm">Post description here...</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        12
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        8
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Learning Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
                  <h3 className="font-medium mb-4">Current Courses</h3>
                  <div className="space-y-6">
                    {[
                      { name: 'Advanced Farming Techniques', progress: 75 },
                      { name: 'Sustainable Agriculture', progress: 45 },
                      { name: 'Smart Irrigation Systems', progress: 90 }
                    ].map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{course.name}</span>
                          <span className="text-green-600">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* New section for completed courses */}
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
                  <h3 className="font-medium mb-4">Completed Learning Plans</h3>
                  <div className="space-y-4">
                    {JSON.parse(localStorage.getItem('learningPlans') || '[]')
                      .filter(plan => plan.progress === 100)
                      .map((plan, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg border border-green-100"
                        >
                          <span className="font-medium text-green-700">{plan.title}</span>
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ))}
                  </div>
                </div>
                
                {/* <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
                  <h3 className="font-medium mb-4">Achievements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['🌱', '🌿', '🎓'].map((emoji, index) => (
                      <div key={index} className="aspect-square rounded-xl bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center text-3xl border border-gray-100 hover:scale-105 transition-transform cursor-pointer">
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
                <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => navigate('/profile/edit')}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/50 transition-all duration-300 group border border-gray-100 hover:border-green-200"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="group-hover:text-green-600">Edit Profile Information</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Add Logout Button */}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/50 transition-all duration-300 group border border-gray-100 hover:border-red-200"
                  >
                    <div className="flex items-center gap-3">
                      <svg 
                        className="w-5 h-5 text-gray-500 group-hover:text-red-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                        />
                      </svg>
                      <span className="group-hover:text-red-600">Log out</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showDetailsBox && (
        <ProfileDetailsBox 
          onClose={() => setShowDetailsBox(false)}
          isEditing={true}
        />
      )}
    </div>
  );
};

export default Profile;