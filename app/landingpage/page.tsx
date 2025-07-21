'use client'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Trust_Page from './_components/Trust_Page'
import Code_Magic from './_components/code-magic'
import { InfiniteMovingCardsDemo } from './_components/slider'
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'


const page =  () => {

    const session =  useSession()

    if(session.data?.user) {
        return redirect('/dashboard')
    }

  return (
    <div className='bg-white p-2 '>

    <section className="min-h-screen  flex items-center justify-center text-center text-balance flex-col gap-8 ">
        <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
          Price Smarter, Sell bigger!
        </h1>
        <p className="text-2xl lg:text-3xl xl:text-4xl font-medium tracking-tight m-4">
          The best way to sell your products online.
        </p>
        <div className='flex gap-8 '>

        <Link className={buttonVariants({
          variant: "primary",
        })} href="/Demo">
            BOOK A DEMO
          
        </Link>
        <Link className={buttonVariants({
          variant: "default",
          className: "text-xl  font-medium tracking-tight "
        })} href="/plan">
            GET STARTED For FREE <ArrowRight/>
          
        </Link>
          </div>

      </section>
      <section className='flex items-center justify-center flex-col  '>
        <Trust_Page/>
        <Code_Magic/>
        <InfiniteMovingCardsDemo/>
      </section>

    </div>
      
  )
}

export default page