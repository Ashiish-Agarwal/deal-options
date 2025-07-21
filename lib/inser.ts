"use server";
import db from "@/db";
import { UserSubscriptionTable } from "@/src/db/product";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function User_INsert(clerkUserId: string) {
  try {
    // Check if user exists
    const userIdd = await db.select().from(user).where(eq(user.id, clerkUserId));
    if (!userIdd[0]) throw new Error("User not found");

    // Check if subscription already exists
    const existingSubscription = await db
      .select()
      .from(UserSubscriptionTable)
      .where(eq(UserSubscriptionTable.clerkUserId, clerkUserId));

    if (existingSubscription[0]) {
      console.log("Subscription already exists for clerkUserId:", clerkUserId);
      return { message: "Subscription already exists" };
    }

    // Insert new subscription
    const insert = await db.insert(UserSubscriptionTable).values({
      clerkUserId: userIdd[0].id,
      tiers: "Free",
    });

    console.log(insert, "successfully inserted");
    return insert;
  } catch (error) {
    console.error("Error inserting subscription:", error);
    throw error; // Or handle it based on your needs
  }
}