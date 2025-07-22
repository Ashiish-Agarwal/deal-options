import React, { Suspense } from 'react'
import { Toaster } from 'sonner'
import InnerNavbaar from '@/components/innernavbaar'
import SkeletonCard from '../loading'



const layout = ({children}:{children:React.ReactNode}) => {

 
 
  return (
    <>
    <Suspense fallback={<SkeletonCard />}>
    <div className='bg-zinc-200/20   '>
    

      <InnerNavbaar/>
     
     

      {children}
     
    
      <Toaster richColors={true} position='bottom-center' />
      
      </div>
    </Suspense>
    </>
)
}

export default layout