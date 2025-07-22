import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { polar } from '@/server/polar'
import Link from 'next/link'
import React from 'react'
import {subscriptionTiers} from '@/data/tier'
import { CheckIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { uuidAction } from '@/server/users'
import { redirect } from 'next/navigation'


const PricingPage = async () => {

  const uuid= await uuidAction()
if(!uuid || uuid.length===0){
  redirect('/auth/signin')
}
 

  try {
   
    const api = await polar()
    const data = await api.products.list({
        isArchived:false
    })
   

    
    return (
    <>
    <div className='p-3' >

        <Card className='w-full p-1 gap-4 mt-10 border-2 border-zinc-950/10  '>
        <CardHeader className='flex flex-col gap-2 justify-center items-center'>
                    <h1 className='text-teal-500 text-xl font-semibold lowercase'>pricing</h1>
                    <CardTitle className='text-4xl font-bold'>Simple, transparent pricing

</CardTitle>
<CardDescription className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose the plan that &lsquo; s right for you. Get started for free or upgrade for more features and capacity.
        </CardDescription>
</CardHeader>
    <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 w-full h-full'>
        {data.result.items.reverse().map((item)=>(
       
          
            <Card key={item.id} className={cn(`border-2  border-zinc-950/10 p-2 rounded-xl relative  flex flex-col gap-8 transition-all duration-300 ease-in-out h-[50vh] ${item.name==='Standard' ?'border-teal-500 hover:border-teal-700 hover:scale-y-102 hover:scale-x-102 hover:shadow-xl hover:shadow-teal-500/10 hover:z-10':''} `)}>
            <CardHeader >
                  {item.name==='Standard'?
                   <h1 className='absolute top-2 right-3   bg-teal-500 text-white px-2 py-1 rounded-md text-lg'>
                     popular ✨
                    </h1>
                  :<></>} 
                <h1 className='text-2xl font-semibold text-teal-800'>
                  {item.name}<span className='hover:text-teal-500 transition-all duration-300 hover:scale-x-200'>💸</span></h1>
                
                
              

                <CardTitle className='text-3xl font-bold '>
                {item.prices[0].amountType === "fixed"
                  ? `$${item.prices[0].priceAmount / 100}`
                  : item.prices[0].amountType === "free"
                    ? "Free"
                    : "Pay what you want"}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col w-full'>
              <div className='h-[15vh] '>

               
          {
            item.name ==='free' && (
              <ul key={item.id} className='flex flex-col gap-2 text-zinc-900/70 tracking-tighter text-sm'>

                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Max Product :${subscriptionTiers.Free.maxNumberOfProducts}`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Up to ${subscriptionTiers.Free.maxNumberOfVisits} Visits`}</li>
                
                </ul>
            )
          }
          {
            item.name ==='Basic' && (
                <ul key={item.id} className='flex flex-col gap-2 text-zinc-900/70 tracking-tighter text-sm'>

                <li  className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Max Product :${subscriptionTiers.Basic.maxNumberOfProducts}`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Up to ${subscriptionTiers.Basic.maxNumberOfVisits} Visits`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can access analytics `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can remove branding `}</li>
                
                </ul>
            )
          }
          {
            item.name ==='Standard' && (
              <ul key={item.id} className='flex flex-col gap-2 text-zinc-900/70 tracking-tighter text-sm'>

                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Max Product :${subscriptionTiers.Standard.maxNumberOfProducts}`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Up to ${subscriptionTiers.Standard.maxNumberOfVisits} Visits`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can access analytics `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can remove branding `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can customize banner `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-700 size-5'/>{`Most Popular `}</li>
                
                </ul>
            )
          }
          {
            item.name ==='Premium' && (
                <ul key={item.id} className='flex flex-col gap-2 text-zinc-900/70 tracking-tighter text-sm'>

                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Max Product :${subscriptionTiers.Premium.maxNumberOfProducts}`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Up to ${subscriptionTiers.Premium.maxNumberOfVisits} Visits`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can access analytics `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can remove branding `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can customize banner `}</li>
                
                </ul>
            )
          }
            </div>
          <div className=' w-full mt-14  flex  '>

            <Link     href={`/pricing/${item.id}`} className={buttonVariants({
              variant:"default",
              className:`bg-teal-500 w-20 h-8 text-white hover:bg-teal-700 transition-all duration-300 ease-in-out   `,
            
            })}>{item.name}</Link>
          </div>
            
            </CardContent>
         </Card>
       
        ))}
    </div>
        </Card>
                  </div>
    </>
  )
} catch (error) {
  console.error('Error fetching products:', error)
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Error Loading Products</h1>
      <p>Unable to load products. Please try again later.</p>
    </div>
  )
  
}
}

export default PricingPage

