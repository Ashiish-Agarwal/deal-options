import { getUserSubscriptionTier } from '@/server/subscription'
import { uuidAction } from '@/server/users'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { getMaxProductCount } from '@/server/db/product'
import {startOfMonth} from 'date-fns'
import { getProductViewCount } from '@/server/db/productView'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCompactNumber } from '@/lib/formatters'
import { Progress } from '@/components/ui/progress'
import { subscriptionTiers, subscriptionTiersInOrder, TierNames } from '@/data/tier'
import { Button, buttonVariants } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'




const page = async () => {
    const userid = await uuidAction()
    if(!userid || userid === null){
        redirect('/login')
       
    }
    const tier =  await getUserSubscriptionTier(userid)
  
    const productCount = await getMaxProductCount(userid) as number
    const PricingViewCount = await  getProductViewCount(
        userid,
        startOfMonth(new Date())
    ) as number
    
  return (
    <div className='pt-28  p-5 flex flex-col gap-5'>
      <h1 className='text-4xl font-bold '>your subscription</h1>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
       <Card className=' '>
        <CardHeader>
          <CardTitle className='text-xl '>Monthly Usage</CardTitle>
          <CardDescription>{formatCompactNumber(PricingViewCount)}/{''}{formatCompactNumber(tier.maxNumberOfVisits)} pricing page visits this month </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress  value={(PricingViewCount/ tier.maxNumberOfVisits)*100} />
          <CardDescription>progress bar shows the percentage of pricing page visits this month</CardDescription>
        </CardContent>
       </Card>
       <Card className=' '>
        <CardHeader>
          <CardTitle className='text-xl '>Product count</CardTitle>
          <CardDescription>{formatCompactNumber(productCount)}/{''}{formatCompactNumber(tier.maxNumberOfProducts)} products this month </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress  value={(productCount/ tier.maxNumberOfProducts)*100} />
          <CardDescription>progress bar shows the percentage of products this month</CardDescription>
        </CardContent>
       </Card>
      </div>
      {
        tier === subscriptionTiers.Free ?(
          <Card>
          <CardHeader>
            <CardTitle className='text-xl '>Upgrade</CardTitle>
            <CardDescription>Upgrade to get more pricing page visits and products</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <form action={createCustomerPortalSession}> */}
            <form action={undefined}>

          <Button className='bg-teal-500 hover:bg-teal-700 text-white'>Manage subscription</Button>
            </form>
          </CardContent>
          </Card>
        ):null
      }
      <div className='grid grid-cols-1 md:grid-cols-2  gap-5 w-full'>
        {subscriptionTiersInOrder.map(t=>(
          <PricingCard key={t.name} currentTierName={tier.name} {...t}/>
        ))}
        

      </div>
      
    </div>
  )
}

export default page
function PricingCard({
  name,
  priceInCents,
  maxNumberOfProducts,
  maxNumberOfVisits,
  canAccessAnalytics,
  canCustomizeBanner,
  canRemoveBranding,
  currentTierName
  
}:(typeof subscriptionTiersInOrder)[number] & {
  currentTierName:TierNames
}){
  const isCurrentTier = name === currentTierName
  return(
<div className=''>

    <Card className='w-full h-full  '>
    <CardHeader>
        <div className="text-teal-800  font-semibold mb-8">{ name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /mo
        </CardTitle>
        <CardDescription>
          {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
        </CardDescription>
    </CardHeader>
    <CardContent>
      <form action={
        undefined
        // name==='Free'
        //  ? createCancelSession
        // : createCheckoutSession.bind(null, name)
      }>
       
<Link href='/pricing'   className={ buttonVariants({variant:'teal',size:'lg'})+cn('bg-teal-500 hover:bg-teal-700 text-white',isCurrentTier?'cursor-not-allowed opacity-50 hover:bg-teal-500':'cursor-pointer')}>{isCurrentTier ? 'Current ' : 'Swap'}</Link>
      </form>
    </CardContent>
    <CardFooter className="flex flex-col gap-4 items-start">
        <Feature className="font-bold">
          {maxNumberOfProducts}{" "}
          {maxNumberOfProducts === 1 ? "product" : "products"}
        </Feature>
        <Feature>PPP discounts</Feature>
        {canCustomizeBanner && <Feature>Banner customization</Feature>}
        {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
        {canRemoveBranding && <Feature>Remove Easy PPP branding</Feature>}
      </CardFooter>
   </Card>
</div>
  )
}
function Feature({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CheckIcon className="size-4 stroke-teal-500 bg-teal-500/25 rounded-full p-0.5" />
      <span>{children}</span>
    </div>
  )
}