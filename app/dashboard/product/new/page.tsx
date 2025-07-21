import React from 'react'
import Backbutton from '../../_components/backbutton'
import { Card } from '@/components/ui/card'

const product = () => {
  return (
    <div className='w-full
    h-full '>

    <Backbutton HREf={'/dashboard'} pageTital='Product'>
    
    <Card className='w-[400px] bg-accent border-0 border-zinc-950/50 rounded-xl p-5 h-full  '>
    
    hii ll
    
    </Card>
     </Backbutton>
    </div>
  )
}

export default product