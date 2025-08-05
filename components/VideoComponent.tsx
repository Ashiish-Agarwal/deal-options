'use client'

import React, { useState } from 'react'
import { Play, Volume2, Maximize } from 'lucide-react'

const VideoComponent = () => {
  const [showPlayButton, setShowPlayButton] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handlePlayClick = () => {
    setIsLoading(true)
    setShowPlayButton(false)
    // Small delay to show loading state
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className='w-full max-w-7xl mx-auto p-2 sm:p-4 pb-6 sm:pb-10'>
      {/* Video Title */}
      <div className='text-center mb-4 sm:mb-6'>
        <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>
          See How It Works in Under 2 Minutes
        </h3>
        <p className='text-sm sm:text-base text-gray-600'>
          Watch how businesses like yours increase revenue with smart pricing
        </p>
      </div>

      {/* Video Container */}
      <div className='relative group'>
        {/* Main Video Wrapper */}
        <div className='relative bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-200/50 shadow-2xl w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[32rem] 2xl:h-[40rem] rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]'>
          
          {/* Loading State */}
          {isLoading && (
            <div className='absolute inset-0 bg-black/20 flex items-center justify-center z-20 rounded-xl sm:rounded-2xl'>
              <div className='animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white'></div>
            </div>
          )}

          {/* Play Button Overlay */}
          {showPlayButton && !isLoading && (
            <div 
              className='absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 flex items-center justify-center z-10 cursor-pointer rounded-xl sm:rounded-2xl transition-all duration-300 hover:from-black/50 hover:to-black/70'
              onClick={handlePlayClick}
            >
              <div className='relative'>
                {/* Play Button */}
                <div className='bg-white/90 backdrop-blur-sm rounded-full p-4 sm:p-6 lg:p-8 shadow-2xl transition-all duration-300 hover:bg-white hover:scale-110 group-hover:shadow-3xl'>
                  <Play className='w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-teal-600 ml-1' fill='currentColor' />
                </div>
                
                {/* Pulse Animation */}
                <div className='absolute inset-0 bg-white/30 rounded-full animate-ping'></div>
                <div className='absolute inset-0 bg-white/20 rounded-full animate-pulse'></div>
              </div>
              
              {/* Play Text */}
              <div className='absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2'>
                <p className='text-white text-sm sm:text-base font-medium bg-black/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full'>
                  ▶ Watch Demo
                </p>
              </div>
            </div>
          )}

          {/* Video Badge */}
          <div className='absolute top-3 sm:top-4 left-3 sm:left-4 z-20'>
            <div className='bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full shadow-lg backdrop-blur-sm'>
              🎥 Product Demo
            </div>
          </div>

          {/* Duration Badge */}
          <div className='absolute top-3 sm:top-4 right-3 sm:right-4 z-20'>
            <div className='bg-black/70 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full backdrop-blur-sm'>
              2:30
            </div>
          </div>

          {/* Video Controls Hint */}
          {!showPlayButton && (
            <div className='absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div className='bg-black/70 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm'>
                <Volume2 className='w-3 h-3 sm:w-4 sm:h-4' />
              </div>
              <div className='bg-black/70 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-sm'>
                <Maximize className='w-3 h-3 sm:w-4 sm:h-4' />
              </div>
            </div>
          )}

          {/* Actual YouTube Iframe */}
          <iframe 
            width="100%" 
            height="100%"
            src="https://www.youtube.com/embed/RB8_aFLXJmw?si=g8olqshjBl2-uBw5&rel=0&modestbranding=1&showinfo=0" 
            title="Product Demo - Smart Pricing Platform" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className='rounded-xl sm:rounded-2xl'
            loading="lazy"
          />
        </div>

        {/* Video Stats */}
        <div className='flex justify-center items-center mt-4 sm:mt-6 gap-4 sm:gap-8'>
          <div className='text-center'>
            <div className='text-lg sm:text-xl font-bold text-teal-600'>10K+</div>
            <div className='text-xs sm:text-sm text-gray-600'>Views</div>
          </div>
          <div className='w-px h-8 bg-gray-300'></div>
          <div className='text-center'>
            <div className='text-lg sm:text-xl font-bold text-teal-600'>98%</div>
            <div className='text-xs sm:text-sm text-gray-600'>Positive</div>
          </div>
          <div className='w-px h-8 bg-gray-300'></div>
          <div className='text-center'>
            <div className='text-lg sm:text-xl font-bold text-teal-600'>2:30</div>
            <div className='text-xs sm:text-sm text-gray-600'>Duration</div>
          </div>
        </div>

        {/* Call to Action Below Video */}
        <div className='text-center mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-100'>
          <p className='text-sm sm:text-base text-gray-700 mb-3 sm:mb-4'>
            Ready to implement this for your business?
          </p>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'>
            <button className='bg-teal-600 hover:bg-teal-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto'>
              Start Free Trial
            </button>
            <button className='border border-teal-600 text-teal-600 hover:bg-teal-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors duration-200 w-full sm:w-auto'>
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoComponent