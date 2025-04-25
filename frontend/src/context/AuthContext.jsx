import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? !JSON.parse(user).isLoggedOut : false;
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      return parsedUser.isLoggedOut ? null : parsedUser;
    }
    return null;
  });

  const updateUser = (updatedUser) => {
    // Get existing user data to preserve profile image
    const existingUser = localStorage.getItem('user');
    const savedImage = existingUser ? JSON.parse(existingUser).profileImage : null;

    const newUser = {
      ...updatedUser,
      profileImage: updatedUser.profileImage || savedImage || "/src/assets/images/empty-profile.png",
      isLoggedOut: false
    };

    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      // Preserve the user data with profile image
      localStorage.setItem('user', JSON.stringify({
        ...currentUser,
        isLoggedOut: true
      }));
    }
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      setIsLoggedIn, 
      user, 
      setUser: updateUser,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);