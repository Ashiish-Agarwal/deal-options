'use client'

import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LogOut, Menu, Settings, User } from 'lucide-react'
import { authClient, useSession } from '@/lib/auth-client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button'
import { redirect } from 'next/navigation'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const InnerNavbaar = () => {
  const session = useSession();

  async function handleLogout() {
    await authClient.signOut();
    redirect('/');
  }

  const nav_Links = [
    { id: 1, title: 'Products', href: '/dashboard/product' },
    { id: 2, title: 'Analytics', href: '/dashboard/anylitics' },
    { id: 3, title: 'Subscriptions', href: '/dashboard/subscription' },
  ];

  return (
    <header className='fixed top-0 left-0 w-full z-50
      bg-white shadow-md p-4 flex justify-between items-center
      transform transition-transform duration-300 ease-in-out 
    '>


      <div className='flex items-center gap-5 justify-between w-full h-full '>

      <Link className='text-2xl tracking-tighter dosisFont flex gap-2 items-center  ' href={'/'}>
        Deal-option <span className='text-teal-500 text-2xl font-semibold'>.</span>
      </Link>
    
      <div className='flex gap-5 mr-5 dosisFont  items-center'>
      <div
        className='relative group' 
        
      >
          {/* User Profile Popover */}
          <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className='relative p-1 hover:bg-gray-100 rounded-full'>
                  <Avatar className='h-9 w-9 ring-2 ring-transparent hover:ring-teal-200 transition-all duration-200'>
                    <AvatarImage 
                      src={session?.data?.user.image || '/defaultpf.png'} 
                      alt="User Avatar" 
                    />
                    <AvatarFallback className='bg-gradient-to-br from-teal-400 to-blue-500 text-white font-semibold'>
                      {(session?.data?.user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              
              <PopoverContent align='end' className='w-72 p-0 shadow-xl border-0 ring-1 ring-gray-200'>
                {/* Profile Header */}
                <div className='bg-gradient-to-br from-teal-50 to-blue-50 p-4 rounded-t-lg'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-12 w-12 ring-2 ring-white shadow-md'>
                      <AvatarImage 
                        src={session?.data?.user.image || '/defaultpf.png'} 
                        alt="User Avatar" 
                      />
                      <AvatarFallback className='bg-gradient-to-br from-teal-400 to-blue-500 text-white font-semibold'>
                        {(session?.data?.user.name) || 'User'}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex-1 min-w-0'>
                      <p className='font-semibold text-gray-900 truncate'>
                        {session?.data?.user.name || 'User'}
                      </p>
                      <p className='text-sm text-gray-600 truncate'>
                        {session?.data?.user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className='p-2'>
                  <Button
                    variant="ghost"
                    className='w-full justify-start gap-3 h-10 text-left font-normal hover:bg-gray-50 cursor-not-allowed'
                  >
                    <User className='h-4 w-4 text-gray-500' />
                    View Profile
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className='w-full justify-start gap-3 h-10 text-left font-normal hover:bg-gray-50 cursor-not-allowed'
                  >
                    <Settings className='h-4 w-4 text-gray-500' />
                    Settings
                  </Button>
                  
                  <Separator className='my-2' />
                  
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className='w-full justify-start gap-3 h-10 text-left font-normal hover:bg-red-50 hover:text-red-600 text-red-600'
                  >
                    <LogOut className='h-4 w-4' />
                    Sign out
                  </Button>
                </div>
              </PopoverContent>
            </Popover>


        
         

       

        
       
       
      </div>
        <Sheet>
          <SheetTrigger>
            <Menu className='h-6 w-6 cursor-pointer' />
          </SheetTrigger>
          <SheetContent side='right'>
            <div className='flex flex-col gap-4 pt-8 items-center justify-center '>
              
              {nav_Links.map((link) => (
                <Link  
                  
                      className='text-xl dosisFont w-fit h-10 text-left link link-underline link-underline-black'
                    
                  key={link.id}
                  href={link.href}
                 
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      </div>

     
    </header>
  );
}

export default InnerNavbaar;