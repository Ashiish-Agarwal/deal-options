import React from 'react'
import { Button } from './ui/button'
import { MoveUpRight } from 'lucide-react'

const Top_Baar = () => {
  return (
    <header className='w-full h-10 bg-zinc-900 overflow-hidden text-white font-sans text-center flex items-center justify-center gap-5  '>
       
        grow your subscription and grow your business

        <Button variant={
          'default'
        }
        className=' font-medium tracking-tight  bg-zinc-800 hover:bg-zinc-700'
        >learn more <MoveUpRight /></Button>
       
    </header>
  )
}

export default Top_Baar