//chache file
import {revalidateTag, unstable_cache} from "next/cache"
import { cache } from "react"

export type ValidTags=
    ReturnType<typeof getGlobalTag> |ReturnType<typeof getUserTag> | ReturnType<typeof getidTag>

    export const CHACH_TAGS={
        products:'products',
        productViews:'productViews',
        subscription:'subscription',
        country:'country',
        countryGroup:'countryGroup'
    } as const


    export function getGlobalTag(tag:keyof typeof CHACH_TAGS){
return `global${CHACH_TAGS[tag]}`as const

    }  
    
   
      
 export function getUserTag(userid:string,tag:keyof typeof CHACH_TAGS){
    return`userid${userid}-${CHACH_TAGS[tag]}` as const 
 }   
 export function getidTag(id:string , tag:keyof typeof CHACH_TAGS){
    return`id:${id}-${CHACH_TAGS[tag]}` as const
 }   
export function clearfulchache(){
    revalidateTag('*')
}

export function DB_CACHE<T extends (...args: any[]) => Promise<any>>(cb: Parameters<typeof unstable_cache<T>>[0],{tags}:{tags:ValidTags[]}){
   return  cache(unstable_cache<T>(cb ,undefined,{tags:[...tags,'*']}))
    
}

export function revalidate_db_chache({tags,userid,id}:{tags:keyof typeof CHACH_TAGS,userid?:string,id:string}){

    revalidateTag(getGlobalTag(tags))
if(userid != null){
    revalidateTag(getUserTag(userid, tags))
}
if(id != null){
    revalidateTag(getidTag(id,tags))
}

}