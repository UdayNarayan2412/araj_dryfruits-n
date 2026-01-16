import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full h-full max-w-screen-xl mx-auto flex items-center justify-center p-4">
        <img
          src="/loading-bg.png"
          alt="Loading"
          className="w-auto h-auto max-w-full max-h-screen object-contain"
        />
      </div>
    </div>
  );
};

export default LoadingScreen; 