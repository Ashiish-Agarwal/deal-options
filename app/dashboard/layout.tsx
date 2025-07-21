import React from 'react'
import { Toaster } from 'sonner'
import InnerNavbaar from '@/components/innernavbaar'



const layout = ({children}:{children:React.ReactNode}) => {

 
 
  return (
    <div className='bg-zinc-200/20   '>
    

      <InnerNavbaar/>
     
     

      {children}
     
    
      <Toaster richColors={true} position='bottom-center' />
      </div>
)
}

export default layout