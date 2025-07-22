
import NoProduct from "@/components/no-product";
import db from "@/db";



import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { user } from "@/src/db/schema";
import { AssignTierfree, uuidAction } from "@/server/users";
import Link from "next/link";
import {  ArrowRight, Plus } from "lucide-react";


import ProductGrid from "./_components/product-grid";
import { buttonVariants } from "@/components/ui/button";
import { getProducts } from "@/server/Products";

import { UserSubscriptionTable } from "@/src/db/product";


const page = async () => {

 

const uuid = await uuidAction() 
if(!uuid){
    redirect('/auth/signup')
}
  const userID = await db.select().from(user).where(eq(user.id,uuid))


  const tier = await db.select().from(UserSubscriptionTable).where(eq(UserSubscriptionTable.clerkUserId,userID[0].id))
  if(tier.length===0){

    try{

      await AssignTierfree(userID[0].id)
      

      await db.select()
      .from(UserSubscriptionTable)
      .where(eq(UserSubscriptionTable.clerkUserId, userID[0].id));
    }catch(error){
      
      throw error
    }
  }
  // await AssignTierfree(userID[0].id)

  

 
  


  if (!userID[0].name) {
    redirect('/auth/signup')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productdata = await getProducts({ userid: userID[0].id ,limit:5 }) as any[]
  if (productdata.length === 0) {
    return <NoProduct />
  }
  

  return (
    <div className="pt-20 p-5  ">
      <Link href="/dashboard/product/new" className="flex items-center gap-2 group">
        
      </Link>
<div className="flex items-center justify-between p-2 ">
  

     <Link href="/dashboard/product/new" className="flex items-center gap-2 group">
      
        <h1 >Products </h1>
        <ArrowRight className="group-hover:translate-x-2 transition-all duration-300 ease-in-out"/>
      
     </Link>
     <Link  className={buttonVariants({
            variant:"default"
            
        })}  href="/dashboard/product/new">Add Product <Plus/></Link>

</div>
      
     <div className="mt-5">

      <ProductGrid products={productdata}/>

     </div>
      
    </div>
  )

}

export default page
