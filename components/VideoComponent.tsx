import React from 'react'

const VideoComponent = () => {
  return (
    <div className='p-2 pb-10'>

    <div className='  bg-white/50 border-zinc-900/10 border-2 w-[100%] h-[250px]   md:w-[80rem] md:h-[40rem]  backdrop-blur-none p-3 rounded-md overflow-hidden'>

 

    <iframe width="100%" height="100%"    src="https://www.youtube.com/embed/RB8_aFLXJmw?si=g8olqshjBl2-uBw5" title="YouTube video player" frameBorder="0" allow=" autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    
     
 

       
    </div>
    </div>
  )
}

export default VideoComponent