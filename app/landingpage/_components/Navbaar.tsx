'use client'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import Top_Baar from '@/components/top-baar'


const Navbaar = () => {


  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  




    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const nav_Links=[
        
        
        {
            id:1,
            title:'Home',
            href:'/'
        },
        {
            id:2,
            title:'pricing',
            href:'/pricing'
        },
        {
            id:3,
            title:'signup',
            href:'/auth/signup'
        },
        
        {
            id:4,
            title:'Story',
            href:'/landingpage/story'
        },
        {
            id:5,
            title:'Contact Support',
            href:'/contact'
        },
        
    ]


    
  return (
    <>

    <header className={`
       fixed top-0 left-0 w-full z-50
      bg-white shadow-md flex justify-between items-center flex-col
      transform transition-transform duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}>
        <Top_Baar/>
        

        
      <nav className='w-full h-16  gap-2 p-2 flex justify-between items-center '>
        <Link className='text-2xl tracking-tighter font-serif  hover:text-zinc-700  ' href={'/'}>
         Deal-option <span className='text-teal-500 text-3xl'>
          .
          </span>
        </Link>
        <div className='hidden md:flex   '>

            

       
           
          </div> 
         
            
            

   
    





        <div className=' flex items-center text-center'>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Menu className='h-6 w-6 cursor-pointer' />
            </SheetTrigger>
            <SheetContent side='right'>
              <div className='flex flex-col gap-4 pt-8 items-center justify-center '>
                
                {nav_Links.map((link) => (
                  <Link  
                   
                      className='text-xl font-semibold w-fit h-10 text-center link link-underline link-underline-black'
                    
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
      
        </>
  )
}

export default Navbaar





	