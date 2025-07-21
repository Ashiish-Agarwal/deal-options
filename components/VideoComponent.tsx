import React from 'react'

const VideoComponent = () => {
  return (
    <div className='p-20 pb-10'>

    <div className=' bg-white/50 border-zinc-900/10 border-2 backdrop-blur-none p-3 rounded-md '>

    <video  className='w-full h-full rounded-md border-2 border-zinc-500' width="540" height="590" controls preload="none"  autoPlay muted>
    <source src="/video.mp4" type="video/mp4"  />
    
     
   
    Your browser does not support the video tag.
  </video>
       
    </div>
    </div>
  )
}

export default VideoComponent