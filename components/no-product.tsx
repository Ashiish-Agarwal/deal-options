import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { Plus } from 'lucide-react'

const NoProduct = () => {
  return (
<div className='text-center h-[80vh] w-full flex flex-col items-center justify-center gap-2 p-5 rounded-md  '>
<h1 className='text-2xl font-bold uppercase '>you have no products yet</h1>
        <p className='text-md text-zinc-500 '>click the button below to add your first product</p>
        <Link  className={buttonVariants({
            variant:"teal"
            
        })}  href="/dashboard/product/new">Add Product <Plus/></Link>
</div>
  )
}

export default NoProduct