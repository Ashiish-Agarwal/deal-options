'use client'

import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useSession } from '@/lib/auth-client'

const InnerNavbaar = () => {
  const session = useSession();

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
        <img
          src={session?.data?.user.image as string || '/defaultpf.png'}
          alt="User Avatar" 
          className='w-10 h-10 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl'
        />

       

        
       
       
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