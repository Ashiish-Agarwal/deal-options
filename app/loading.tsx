


import { WatchIcon } from 'lucide-react';

import React from 'react';

export default function SkeletonCard(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="text-center">
        {/* Circular Progress Indicator */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          
          {/* Progress ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin"></div>
          
          {/* Inner circle with download icon */}
          <div className="absolute inset-2 rounded-full bg-yellow-500 flex items-center justify-center p-5">
            <svg 
              className="w-6 h-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
             
              <WatchIcon size={24}/>
           
   
            </svg>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
           Loading...
          </h2>
          <p className="text-sm text-gray-600 max-w-xs mx-auto">
            working on it 
          </p>
        </div>
      </div>
    </div>
  );
};

