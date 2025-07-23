'use server'
import { CustomizationTabFormSchema } from "@/conform-libs/schema";
import db from "@/db";
import { z } from "zod";
import { and, count, eq } from "drizzle-orm";

import { UpdateCountryDiscountdb } from "../Products";
import { uuidAction } from "../users";
import { ProductCustomizationTable, ProductTable, ProductViewTable } from "@/src/db/product";
import { CHACH_TAGS, revalidate_db_chache } from "@/lib/cache";
import {CountryDiscountFormSchema} from "@/conform-libs/schema"
import { canCreateProduct, canCustomizeBanner } from "../permission";
import { getProduct } from "../db/product";

    
export async function deleteProductdb({id,userid}:{id:string,userid:string}){

    const {rowCount} = await db.delete(ProductTable).where(and(eq(ProductTable.id,id),eq(ProductTable.clerkUserId,userid)))

     if(rowCount === null){
        return false
     }
     if(rowCount >0){
        
         revalidate_db_chache({tags:CHACH_TAGS.products,userid,id})
        }

    return rowCount > 0
}

export async function UpdateCountryDiscount({id}:{id:string},unsafeData:z.infer<typeof CountryDiscountFormSchema>){
    
    const userid=  await uuidAction()
    const {success,data} = CountryDiscountFormSchema.safeParse(unsafeData)
    if(!success || userid==null){
      return {message:'this was an error savng your group country  ',error:true}
    }
    const InsertData: {
        countryGroupId: string
        productId: string
        coupon: string
        discountPercentage: number
      }[] = []
    const deltesId: {countryGroupid:string}[] = []

    data.groups.forEach(group=>{
        if(

            group.coupon != null && group.coupon.length>0 && group.discountPercentage != null && group.discountPercentage!= null&& group.discountPercentage > 0
        ){
            InsertData.push({
                countryGroupId: group.countryGroupid,
                productId: id,
                coupon: group.coupon,
                discountPercentage: group.discountPercentage /100
            })
        }
        else{
            deltesId.push({countryGroupid:group.countryGroupid})
        }
       
    })
   await  UpdateCountryDiscountdb({id,userid},InsertData,deltesId)
   return{error:false,message:'Product updated successfully'}
    
}

export async function updateProductCustmizaion({id}:{id:string},unsafeData:z.infer<typeof CustomizationTabFormSchema>){
    const userid=  await uuidAction()
    const {success,data} = CustomizationTabFormSchema.safeParse(unsafeData)
    if(!success || userid==null){
      return {message:'this was an error savng your group country  ',error:true}
    }
   
    const canCustomizeBannerid=await canCustomizeBanner(userid)
    await updateProductCustmizaiondb({id,userid},data)

    return {error:false,message:'Product updated successfully'}

    
}
export async function updateProductCustmizaiondb({id,userid}:{id:string,userid:string},data:z.infer<typeof CustomizationTabFormSchema>){
   
    const product = getProduct({id,userid})
    if(product=== null) return false

    await db.update(ProductCustomizationTable).set(data).where(eq(ProductCustomizationTable.productId,id))
    revalidate_db_chache({
        tags:CHACH_TAGS.products,
        userid,
        id
    })
}
export async function getMaxProductCountInternal(userid:string){
    const productCount = await db.select({ProductCount:count()}).from(ProductTable).where(eq(ProductTable.clerkUserId,userid))
    return productCount[0]?.ProductCount 
    
}

export async function createProductView({productid,userid,country}:{productid:string,userid:string,country:string}){
 
    if (!country || country === 'undefined' || country === 'null') {
        console.log('Invalid country ID provided:', country);
        return; 
    }

    // Validate that country looks like a UUID (basic check)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(country)) {
        console.log('Country ID is not a valid UUID format:', country);
        return; 
    }
 
    const [newRow]= await db.insert(ProductViewTable).values({
    productId:productid,
    visitedAt:new Date(),
    countryId:country,
 }).returning({
    id:ProductViewTable.id
 })

 if(!newRow || newRow.id.length===0){
    console.log('new row count is not valid')
    throw new Error('new row count is not valid')
 }
 if(newRow != null ){
    revalidate_db_chache({tags: CHACH_TAGS.productViews , userid,id:newRow.id })
    
 }
}
