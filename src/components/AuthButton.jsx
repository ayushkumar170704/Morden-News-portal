import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';

export default function AuthButton() {
  const { user, login, logout, loading } = useAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log('Google login success:', credentialResponse);
      const result = await login(credentialResponse.credential);
      if (!result.success) {
        alert('Login failed: ' + result.error);
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('Login failed');
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
    alert('Google login failed');
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-gray-200">Loading...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img 
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=32`} 
          alt={user.name}
          className="w-8 h-8 rounded-full border-2 border-white/30"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4f46e5&color=fff&size=32`;
          }}
        />
        <span className="text-sm font-medium text-white hidden sm:inline">
          {user.name}
        </span>
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        size="medium"
        theme="filled_blue"
        text="signin_with"
      />
    </div>
  );
}
