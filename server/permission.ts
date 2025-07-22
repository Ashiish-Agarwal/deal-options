import { CHACH_TAGS, DB_CACHE, getUserTag, revalidate_db_chache } from "@/lib/cache"
import { getMaxProductCount } from "./db/product"
import { getUserSubscriptionTier } from "./subscription"
import { notFound } from "next/navigation"
import { getProductViewCount } from "./db/productView"
import { startOfMonth } from "date-fns"

export async function canRemoveBranding(userid: string | null) {
    if (userid == null) return false

    const tier = await getUserSubscriptionTier(userid)
    return tier.canCustomizeBanner
}


export async function canCustomizeBanner(userid: string | null) {
    if (userid == null) return false

    const tier = await getUserSubscriptionTier(userid)
    return tier.canCustomizeBanner
}



export async function canAccessAnalytics(userid: string | null) {
    if (userid == null) return false

    const tier = await getUserSubscriptionTier(userid)
    return tier.canAccessAnalytics
}



export async function canCreateProduct(userid: string | null): Promise<boolean>{
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const fn= DB_CACHE(canCreateProductInternal as any,{
    tags:[getUserTag(userid as string,CHACH_TAGS.subscription)]
   })
   return fn(userid) as Promise<boolean>
}
export async function canCreateProductInternal(userid: string | null){
    
    if (userid == null) return false

    const tier = await getUserSubscriptionTier(userid);
    const products= await getMaxProductCount(userid);
    return products< tier.maxNumberOfProducts
}
export async function canShowDsicountBanner(userid:string){
    const useridd = userid
    if(userid==null) return notFound()
        const tier = await getUserSubscriptionTier(userid)
    const Prodcutview = await getProductViewCount(userid,startOfMonth(new Date()))
    
    return Prodcutview < tier.maxNumberOfVisits
    
    
}
