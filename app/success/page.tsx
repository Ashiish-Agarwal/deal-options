import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card' // Added CardDescription and CardHeader
import db from '@/db'
import { uuidAction } from '@/server/users'
import { UserSubscriptionTable } from '@/src/db/product'
import { user } from '@/src/db/schema'
import { eq } from 'drizzle-orm'
import { CheckCircle, ArrowRight } from 'lucide-react' // Changed to CheckCircle for success
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({searchParams}:{searchParams:{customer_session_token?:string}}) => {
  const userid = await uuidAction()
  if(!userid){ // Simplified check
    redirect('/login')
  }

  const [userData] = await db.select().from(user).where(eq(user.id,userid)) // Destructure for direct access
  const [subscriptionData] = await db.select().from(UserSubscriptionTable).where(eq(UserSubscriptionTable.clerkUserId,userid)) // Destructure

  // Handle cases where data might be missing more gracefully
  if (!userData) {
    // Optionally redirect or show an error if user data isn't found
    redirect('/error?message=userNotFound');
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
      <Card className='w-full max-w-md text-center border-2 border-teal-400 hover:border-teal-500 transition-all duration-300 ease-in-out p-6 shadow-lg rounded-lg'>
        <CardHeader className='flex flex-col items-center space-y-4'>
          <CheckCircle className='w-16 h-16 text-teal-600' />
          <CardTitle className='text-4xl font-extrabold text-teal-700'>Purchase Successful!</CardTitle>
          <CardDescription className='text-lg text-gray-600'>
            Thank you for your purchase. Your subscription is now active!
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 text-gray-800 text-base mt-6'>
          <div className='flex justify-between items-center py-2 border-b border-gray-200'>
            <span className='font-semibold'>Name:</span>
            <span>{userData.name || 'N/A'}</span>
          </div>
          <div className='flex justify-between items-center py-2 border-b border-gray-200'>
            <span className='font-semibold'>Email:</span>
            <span>{userData.email || 'No email provided'}</span>
          </div>
          <div className='flex justify-between items-center py-2 border-b border-gray-200'>
            <span className='font-semibold'>Tier:</span>
            <span>{subscriptionData?.tiers || 'No tier'}</span> {/* Use optional chaining */}
          </div>
          <div className='flex justify-between items-center py-2'>
            <span className='font-semibold'>Amount Paid:</span>
            <span className='font-bold text-teal-600'>${(subscriptionData?.totalAmount / 100)?.toFixed(2) || '0.00'}</span> {/* Format currency */}
          </div>
        </CardContent>
        <span className='flex '>

        <Link href="/dashboard" prefetch={true} className={buttonVariants({
          variant: 'teal', // Using 'default' or a primary color variant
          size: 'lg', // Larger button for prominence
          className: 'mt-8 w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold'
        })}>
          Go to Dashboard 
        </Link>
        <ArrowRight className='ml-2 h-5 w-5 hover:translate-x-2 transition-all duration-300 ease-in-out text-white' />
          </span>
      </Card>
    </div>
  )
}

export default page