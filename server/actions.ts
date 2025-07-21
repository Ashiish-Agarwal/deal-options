// lib/actions.ts
'use server';


import db from '@/db';
import { UserSubscriptionTable } from '@/src/db/product';
import { user } from '@/src/db/schema';
import { eq } from 'drizzle-orm';



export async function assignUserTier() {
  const name = await db.select().from(user).where(eq(user.id,user.id ));
 
  try {
    await db.insert(UserSubscriptionTable).values({
      clerkUserId: name[0].id,  
      tiers:'Free'
      
    });
 
    return { success: true, redirect: '/dashboard' };
   
  } catch (error) {
    return { success: false, error: 'Failed to create user' };
  }
}

