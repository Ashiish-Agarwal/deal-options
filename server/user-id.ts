import db from "@/db";


export async function getProduct({userid}:{userid:string},{limit}:{limit:number}) {
   return await db.query.ProductTable.findMany({
    where:({clerkUserId},{eq})=>eq(clerkUserId,userid),
    orderBy:({createdAt},{desc})=>desc(createdAt),
    limit
   },
   
   )
}

