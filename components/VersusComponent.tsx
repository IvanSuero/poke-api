import React from 'react';

const VersusComponent: React.FC = () => {
  return (
    <div className="relative w-64 h-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="relative z-10 font-extrabold text-6xl text-center transform -skew-x-12 flex items-center justify-center w-full h-full">
        <span className="mr-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text">VS</span>
      </div>
    </div>
  );
};

export default VersusComponent;
