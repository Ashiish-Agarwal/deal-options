import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { polar } from "@/server/polar"
import { notFound } from "next/navigation"
import {subscriptionTiers} from '@/data/tier'
import { CheckIcon } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

interface paramsProps{
    params:Promise<{pricingid:string}>
}

const page = async ({params}:paramsProps) => {
    const pricingid= await params

    const api = await polar()
    const data = await api.products.get({
        id:pricingid.pricingid
    })
    if(!data){
        return notFound()
    }
    
    
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">

    <Card className='w-72 h-[24%] p-1 gap-4 mt-10 border-2 border-zinc-950/10 hover:border-teal-500 transition-all duration-500 ease-in-out hover:scale-y-101 hover:scale-x-101 hover:shadow-xl hover:shadow-teal-500/10 hover:z-10 '>
        <CardHeader>
            <CardTitle className="text-4xl font-bold text-teal-800">{data.name}</CardTitle>
            <CardTitle className="text-4xl font-bold">{data.prices[0].amountType === "fixed" ? `$${data.prices[0].priceAmount / 100}` : data.prices[0].amountType === "free" ? "Free" : "Pay what you want"}</CardTitle>
            <CardDescription className="text-xl ">{data.description}</CardDescription>
            
        </CardHeader>
           <CardContent>
            
            {
                data.name==='deal_option'?
                ''
                :
                <div>
                    {
            data.name ==='free' && (
              <ul key={data.id} className='flex flex-col gap-2 text-zinc-900/70 tracking-tighter text-lg'>

                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Max Product :${subscriptionTiers.Free.maxNumberOfProducts}`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Up to ${subscriptionTiers.Free.maxNumberOfVisits} Visits`}</li>
                
                </ul>
            )
          }
          {
            data.name ==='Basic' && (
                <ul key={data.id} className='flex flex-col gap-2 text-zinc-900/70 tracking-tighter text-lg'>

                <li  className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Max Product :${subscriptionTiers.Basic.maxNumberOfProducts}`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Up to ${subscriptionTiers.Basic.maxNumberOfVisits} Visits`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can access analytics `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can remove branding `}</li>
                
                </ul>
            )
          }
          {
            data.name ==='Standard' && (
              <ul key={data.id} className='flex flex-col gap-2 text-zinc-900/70 tracking-tighter text-lg'>
           
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Most Popular ✨`}</li>
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
            data.name ==='Premium' && (
                <ul key={data.id} className='flex flex-col gap-2 text-zinc-900/70 tracking-tighter text-lg'>

                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Max Product :${subscriptionTiers.Premium.maxNumberOfProducts}`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`Up to ${subscriptionTiers.Premium.maxNumberOfVisits} Visits`}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can access analytics `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can remove branding `}</li>
                <li className='flex gap-2 '><CheckIcon className='text-teal-400 size-5'/>{`can customize banner `}</li>
                
                </ul>
            )
          }
                </div>
                
                }

        
          <Link href={`/checkout?product=${data.id}`} className={buttonVariants({variant:'outline', className:' text-white bg-teal-500 hover:bg-teal-600 w-full mt-10'})}>{data.name}</Link>
          <CardDescription className="text-center text-sm"> thanks from team </CardDescription>
                </CardContent>
    </Card>
    </div>
  )
}

export default page