'use client'
import Link from 'next/link'
import { useState } from 'react'

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
  
import { ArrowBigDownIcon, ArrowDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


const Navbaar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const nav_Links=[
        
        {
            id:1,
            title:'blog',
            href:'/blog'
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
    ]


    const nav_hover=[
        {
            id:1,
            title:'solution',
            href:'/youtube.com',
            hover:'video guides',

        },
        {
            id:2,
            title:'features',
            href:'/youtube.com',
            hover:'video guides',
        }
    ]
  return (
    <header className='border-b-2 w-full h-full  border-zinc-700/20 rounded-lg'>
      <nav className='w-full h-20  gap-2 p-2 flex justify-between items-center '>
        <Link className='text-2xl tracking-tighter font-serif   ' href={'/'}>
         Deal-option
        </Link>
        <div className='hidden md:flex   '>

            

       <div className='flex'>

           {
             nav_hover.map((link)=>(


                <NavigationMenu key={link.id}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className='text-xl '>{link.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink className='text-sm  '>
                        {link.hover}
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

            ))
          } 
          </div>
          <div className='flex '>

           {
             nav_Links.map((link)=>(

                <Link className={cn(buttonVariants({
                    variant:'link',
                    className:'text-xl'
                }))} key={link.id} href={link.href}>
                {link.title}
                </Link>
                
                
              ))
            }  
            </div>
            
            

   
    




</div>

        <div className='md:hidden flex items-center text-center'>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Menu className='h-6 w-6 cursor-pointer' />
            </SheetTrigger>
            <SheetContent side='right'>
              <div className='flex flex-col gap-4 pt-8 items-center justify-center'>
                {nav_hover.map((link) => (
                  <NavigationMenu key={link.id}>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className='text-xl '>{link.title}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <NavigationMenuLink className='text-sm  '>
                            {link.hover}
                          </NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                ))}
                {nav_Links.map((link) => (
                  <Link
                    className={cn(buttonVariants({
                      variant: 'link',
                      className: 'text-xl'
                    }))}
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
  )
}

export default Navbaar