import React from "react";

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-color-2" />
    </div>
  );
};

export default LoadingScreen;
