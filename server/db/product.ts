import db from "@/db";
import { CHACH_TAGS, DB_CACHE, getGlobalTag, getidTag, getUserTag, revalidate_db_chache } from "@/lib/cache";
import { ProductTable } from "@/src/db/product";
import { and, eq } from "drizzle-orm";
import { getMaxProductCountInternal } from "../actions/productDetails";


export async function updateProductdb(data:Partial<typeof ProductTable.$inferInsert >,id:string,userid:string){
    const { rowCount}= await db.update(ProductTable).set(data).where(and(eq(ProductTable.id,id),eq(ProductTable.clerkUserId,userid)))
    if(rowCount===null ||rowCount>0 ||rowCount===0){
     return revalidate_db_chache({tags:CHACH_TAGS.products,userid,id})
    }
    return rowCount > 0
}

export async function GetProductCountryGroup({userid,id}:{userid:string,id:string}) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chachfn=DB_CACHE(GetProductCountryGroupinternal as any,{
        tags: [
            getidTag(id,CHACH_TAGS.products),
            getGlobalTag(CHACH_TAGS.country),
            getGlobalTag(CHACH_TAGS.countryGroup),


        ]
    })
    return chachfn({userid,id})
}

export async function GetProductCountryGroupinternal({userid,id}:{userid:string,id:string}) {
    const productid = id  

    const product = await getProduct({userid,id:productid})
    if (product == null) return []

    const data = await db.query.CountryGroupTable.findMany({
        with: {
            countries: {
                columns: {
                    name: true,
                    code: true,
                }
            },
            countryGroupDiscounts: {
                columns: {
                    coupon: true,
                    discountPercentage: true,
                },
                where: ({ productId }, { eq }) => eq(productId, productid), 
                limit: 1
            }    
        },
       
    })
    
    return data.map(group => {
        return {
            id: group.id,
            name: group.name,
            recommendedDiscountPercentage: group.recommendedDiscountPercentage,
            countries: group.countries,
            discount: group.countryGroupDiscounts.at(0)
        }
    })
}


export async function getProduct({id,userid}:{id:string,userid:string}){
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chachfn=DB_CACHE(getinternalProduct as any,{
    tags:[getidTag(id,CHACH_TAGS.products)]
  })
  return chachfn({id,userid})
    
}

export async function getinternalProduct({id,userid}:{id:string,userid:string}){
 
    const data = await db.query.ProductTable.findFirst({
     where:({clerkUserId,id:idcol},{eq,and})=>and(eq(clerkUserId,userid),eq(idcol,id))
    })
    
    return data
 }
 
 export async function GetProductCustmization({id,userid}:{id:string,userid:string}){
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chachfn = DB_CACHE(GetProductCustmizationInternal as any,{
        tags:[getidTag(id,CHACH_TAGS.products)]
    })
   
    return chachfn({id,userid})
 }

 export async function GetProductCustmizationInternal({id ,userid}:{id:string,userid:string}){
    const productid= id
    const data = await db.query.ProductTable.findFirst({
        where:({id , clerkUserId},{eq})=>and(eq(id,productid),eq(clerkUserId,userid)),with:{
            productCustomization:true
        }
    })
    
    return data?.productCustomization
 }

 export async function getMaxProductCount(userid:string | null){
    if(userid==null) return 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fn = DB_CACHE(getMaxProductCountInternal as any,{
        tags:[getUserTag(userid,CHACH_TAGS.products)]
    })
    return fn(userid)

 }

