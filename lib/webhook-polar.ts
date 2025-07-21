//webhooks

'use server'

import { TierNames } from "@/data/tier";
import db from "@/db";

import { UserSubscriptionTable } from "@/src/db/product";


import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "./auth";
import { headers } from "next/headers";

interface ProductCreatedProps{
    
    tier: TierNames | undefined | null,
    customerid?: string | undefined | null,
    subscriptionid?: string | undefined | null,
    subscriptionitemid?: string | undefined | null,
    customer_id?: string | undefined | null,
    total_amount?: number | undefined | null,
    billing_name?: string | undefined | null,
    Uuid: string | undefined | null 

}


export async function checkoutProductCreated({ tier,customerid,subscriptionid,subscriptionitemid ,customer_id,total_amount,billing_name , Uuid}: ProductCreatedProps) {
    
 
     
    
    const session = await auth.api.getSession({
        headers: await headers() // or request.headers in API routes
    })
    

    
    const userId = await  Uuid as string
    if(userId?.length === 0 || userId == null || userId == undefined){
       throw new Error('user not found')
       
    }
    
       try{

       
       
        
        const users = await db.select().from(user).where(eq(user.id, userId))
        if(users.length === 0){
           
           throw new Response('user not found', { status: 400 })
        }

        await db.insert(UserSubscriptionTable).values({
            clerkUserId:users[0].id,
            customerid:customerid,
            stripeSubscriptionId:subscriptionid,
            stripeSubscriptionItemId:subscriptionitemid,
            stripeCustomerId:customer_id,
            totalAmount:total_amount || 0,
            tiers:tier as TierNames,
            billingName:billing_name,
        }).onConflictDoUpdate({
            target:[UserSubscriptionTable.clerkUserId],
            set:{
                customerid:customerid,
                stripeSubscriptionId:subscriptionid,
                stripeSubscriptionItemId:subscriptionitemid,
                stripeCustomerId:customer_id,
                totalAmount:total_amount || 0,
                tiers:tier as TierNames,
                billingName:billing_name,
            }
        })
   
        
    }
    catch(error){
       
        throw new Error('error while creating subscription'+error)
    }  
  
}
    
    

export async function ActiveTier({ tier,customerid,subscriptionitemid ,customer_id , Uuid}: ProductCreatedProps) {
    
 
     
    
    const session = await auth.api.getSession({
        headers: await headers() // or request.headers in API routes
    })
    

    
    const userId = await  Uuid as string
    if(userId?.length === 0 || userId == null || userId == undefined){
       throw new Error('user not found')
       
    }
    
       try{

       
       
        
        const users = await db.select().from(user).where(eq(user.id, userId))
        if(users.length === 0){
           
           throw new Response('user not found', { status: 400 })
        }

        await db.insert(UserSubscriptionTable).values({
            clerkUserId:users[0].id,
            customerid:customerid,
            stripeSubscriptionItemId:subscriptionitemid,
            stripeCustomerId:customer_id,
           
            tiers:tier as TierNames,
           
        }).onConflictDoUpdate({
            target:[UserSubscriptionTable.clerkUserId],
            set:{
                customerid:customerid,
                stripeSubscriptionItemId:subscriptionitemid,
                stripeCustomerId:customer_id,
            
                tiers:tier as TierNames,
              
            }
        })
   
        
    }
    catch(error){
       
        throw new Error('error while creating subscription'+error)
    }  
  
}
    
    
