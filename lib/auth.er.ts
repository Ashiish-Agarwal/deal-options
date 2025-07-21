import db from "@/db";
import { user } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function User_information() {
    const users = await db.select().from(user).where(eq(user.id, user.id));

    

  

}