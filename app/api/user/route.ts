
import db from "@/db";
import { TierEnum, UserSubscriptionTable } from "@/src/db/product";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req:Request) {

    try {
        
        const userID = await db.select().from(user).where(eq(user.id,''))
        
        const inserting = db.insert(UserSubscriptionTable).values({
            clerkUserId:userID[0].id,
            tiers:'Basic'
        }) 
        console.log('successsed inserted ')
        
    } catch (error) {
        console.log(error)
    }
}