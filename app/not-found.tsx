'use client'
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {/* Brand/Logo */}
      <div className="absolute top-8 left-8">
        <h1 className="text-sm font-bold tracking-widest text-black uppercase">
          deal option
        </h1>
      </div>

      {/* Main 404 Content */}
      <div className="flex flex-col items-center">
        {/* Pixelated 404 */}
        <div className="mb-16 flex items-center justify-center space-x-12 relative">
          {/* Decorative dots */}
          <div className="absolute -top-6 -left-20 flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
          </div>

          {/* Left 4 */}
          <div className="pixel-4"></div>

          {/* Middle 0 */}
          <div className="relative">
            <div className="pixel-0"></div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 pixel-sprite"></div>
          </div>

          {/* Right 4 */}
          <div className="pixel-4"></div>
        </div>

        {/* Page Not Found Badge */}
        <div className="inline-block bg-white border border-gray-300 px-4 py-2 rounded-md mb-8 shadow-sm">
          <span className="text-xl font-mono text-gray-700 tracking-wide">Page Not Found</span>
        </div>

        {/* Message */}
        <h2 className="text-xl font-normal text-gray-800 mb-12 text-center max-w-md leading-relaxed">
          This is not the page you are looking for
        </h2>

        {/* Return Home Button */}
        <Link href="/" className="group">
          <div className="border border-dashed border-gray-400 px-6 py-3 hover:border-gray-600 transition-all duration-200 hover:bg-gray-50">
            <span className="font-mono text-xs text-gray-600 group-hover:text-gray-800 flex items-center tracking-widest">
              RETURN HOME
              <svg 
                className="ml-3 w-3 h-3 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      <style jsx>{`
        .pixel-4 {
          width: 8px;
          height: 8px;
          background: black;
          box-shadow: 
            /* Top part */
            16px 0 0 black, 24px 0 0 black, 32px 0 0 black,
            8px 8px 0 black, 40px 8px 0 black,
            0px 16px 0 black, 40px 16px 0 black,
            /* Horizontal line */
            0px 24px 0 black, 8px 24px 0 black, 16px 24px 0 black, 
            24px 24px 0 black, 32px 24px 0 black, 40px 24px 0 black, 48px 24px 0 black,
            /* Vertical line continues */
            40px 32px 0 black,
            40px 40px 0 black,
            40px 48px 0 black,
            40px 56px 0 black;
        }

        .pixel-0 {
          width: 8px;
          height: 8px;
          background: black;
          box-shadow: 
            /* Top border */
            8px 0 0 black, 16px 0 0 black, 24px 0 0 black, 32px 0 0 black, 40px 0 0 black,
            /* Left and right borders */
            0px 8px 0 black, 48px 8px 0 black,
            0px 16px 0 black, 48px 16px 0 black,
            0px 24px 0 black, 48px 24px 0 black,
            0px 32px 0 black, 48px 32px 0 black,
            0px 40px 0 black, 48px 40px 0 black,
            0px 48px 0 black, 48px 48px 0 black,
            /* Bottom border */
            8px 56px 0 black, 16px 56px 0 black, 24px 56px 0 black, 32px 56px 0 black, 40px 56px 0 black;
        }

        .pixel-sprite {
          width: 4px;
          height: 4px;
          background: black;
          box-shadow: 4px 0 0 black, 8px 0 0 black, 4px 4px 0 black;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;