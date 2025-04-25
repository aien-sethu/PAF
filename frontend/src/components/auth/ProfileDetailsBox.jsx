import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileDetailsBox = ({ onClose, isEditing = false, onImageUpdate }) => {
  const { user, setUser } = useAuth();
  const [profileImage, setProfileImage] = useState(isEditing ? user?.profileImage : "/src/assets/images/empty-profile.png");
  const [location, setLocation] = useState(isEditing ? user?.location : '');
  const [bio, setBio] = useState(isEditing ? user?.bio : '');
  const [stayConnected, setStayConnected] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      if (onImageUpdate) {
        onImageUpdate(imageUrl);
      }
    }
  };

  const handleFinish = () => {
    const updatedUser = {
      ...user,
      profileImage: profileImage || "/src/assets/images/empty-profile.png",
      location: location,
      bio: bio,
      stayConnected: stayConnected
    };
    
    // Update user in context and localStorage
    setUser(updatedUser);
    if (onImageUpdate) {
      onImageUpdate(profileImage);
    }
    if (stayConnected) {
      console.log('Welcome email sent to:', user?.email);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing ? 'Edit Profile Details' : 'Complete Your Profile'}
        </h2>

        {/* Profile Image Upload */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>

        {/* Location Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your location"
          />
        </div>

        {/* Bio Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows="3"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Stay Connected */}
        {!isEditing && (
          <div className="mb-6">
            <h3 className="font-medium mb-4">Stay connected with updates?</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setStayConnected(true)}
                className={`px-4 py-2 rounded-lg ${
                  stayConnected 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setStayConnected(false)}
                className={`px-4 py-2 rounded-lg ${
                  !stayConnected 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100'
                }`}
              >
                No, Thanks
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleFinish}
            className="bg-green-500 text-white px-6 py-2 rounded-lg"
          >
            {isEditing ? 'Save Changes' : 'Finish'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const ParentComponent = () => {
  const [showDetailsBox, setShowDetailsBox] = useState(false);
  const [profileImage, setProfileImage] = useState("/src/assets/images/empty-profile.png");

  return (
    <div>
      <button onClick={() => setShowDetailsBox(true)}>Edit Profile</button>
      {showDetailsBox && (
        <ProfileDetailsBox 
          onClose={() => setShowDetailsBox(false)}
          isEditing={true}
          onImageUpdate={(newImage) => setProfileImage(newImage)}
        />
      )}
    </div>
  );
};

export default ParentComponent;