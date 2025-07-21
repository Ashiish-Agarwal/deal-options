
import NoProduct from "@/components/no-product";
import db from "@/db";

import { getProduct } from "@/server/user-id";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { user } from "@/src/db/schema";
const page = async () => {


  const userID = await db.select().from(user).where(eq(user.id, user.id))


  if (!userID[0].id) {
    redirect('/login')
  }
  const product = await getProduct({ userid: userID[0].id }, { limit: 5 })
  if (product.length === 0) {
    return <NoProduct />
  }

  return null
}

export default page
