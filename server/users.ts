'use server'
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import db from "@/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { ProductTable, UserSubscriptionTable } from "@/src/db/product";
import { CHACH_TAGS, DB_CACHE, getUserTag, revalidate_db_chache } from "@/lib/cache";
import { metadata } from "@/app/layout";
import { id } from "zod/v4/locales";
 
export const uuidAction = async () => {
      const session = await auth.api.getSession({
            headers: await headers()
        })
        return session?.user?.id
};





export async function deleteUser(){
const uuid= await uuidAction()
if(!uuid || uuid === null){
    return {
        success:false,
        error:'Failed to get user id'
    }
}


const userSubscription= await db.delete(UserSubscriptionTable).where(eq(UserSubscriptionTable.clerkUserId,uuid)).returning({
    id:UserSubscriptionTable.id,
    userid:UserSubscriptionTable.clerkUserId
  })
  
  
 const product= await db.delete(ProductTable).where(eq(ProductTable.clerkUserId,uuid)).returning({
    productid:ProductTable.id,
    userid:ProductTable.clerkUserId
  })
 userSubscription.forEach((prod)=>{
  revalidate_db_chache({tags:CHACH_TAGS.subscription,userid:prod.userid as string,id:prod.id  })
    
 }) 
product.forEach((prod)=>{
    revalidate_db_chache({tags:CHACH_TAGS.products,userid:prod.userid,id:prod.productid})
})
return[userSubscription,product]
}


export async function AssignTierfree(userID: string) {
     return AssignTierfreeInternal(userID)
    
  }
export async function AssignTierfreeInternal(userID:string){

  try{
    
    
    
    const subscribe = await db.insert(UserSubscriptionTable).values({
      tiers:'Free',
      clerkUserId:userID
    }).onConflictDoNothing()
  


    return subscribe.rows
  }catch(error){
    console.log('user tier not assigned')
    throw error
  }



}