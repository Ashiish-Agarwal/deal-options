import { UserSubscriptionTable } from "@/src/db/product";
import db from "@/db";
import { CHACH_TAGS, DB_CACHE, getUserTag, revalidate_db_chache } from "@/lib/cache";
import { subscriptionTiers, TierNames } from "@/data/tier";
import { eq,and } from "drizzle-orm";

export async function createUserSubscriptionsfuction(
data:typeof UserSubscriptionTable.$inferInsert
){
    const[newSubscription]= await db.insert(UserSubscriptionTable).values(data).onConflictDoNothing({
        target:UserSubscriptionTable.clerkUserId
    }).returning({
        id:UserSubscriptionTable.id,
        userid:UserSubscriptionTable.clerkUserId
    })

    if(newSubscription!= null){
        revalidate_db_chache({tags:CHACH_TAGS.subscription,userid:newSubscription.userid as string,id:newSubscription.id})
    }

    return newSubscription
}



export async function getUserSubscription(userid:string){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn= DB_CACHE(getUserSubscriptioninternal as any,{
        tags:[getUserTag(userid,CHACH_TAGS.subscription)]
    })
    return fn(userid)
}
export async function getUserSubscriptionTier(userid:string){
    const subscription= await getUserSubscription(userid)
    if(subscription==null){
        throw new Error('User subscription not found')
    }
    return subscriptionTiers[subscription[0].tier as TierNames]

    
}
export async function getUserSubscriptioninternal(userid:string){
   const data = await db.select({tier:UserSubscriptionTable.tiers}).from(UserSubscriptionTable).where(eq(UserSubscriptionTable.clerkUserId,userid)).limit(1)
   return data
    
}
