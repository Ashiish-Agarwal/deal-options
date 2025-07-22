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

// Define a generic type for async functions
type AsyncFunction<TArgs extends readonly unknown[] = readonly unknown[], TReturn = unknown> = (...args: TArgs) => Promise<TReturn>

export function DB_CACHE<T extends AsyncFunction>(
    cb: T,
    {tags}: {tags: ValidTags[]}
): T {
   return cache(unstable_cache(cb, undefined, {tags: [...tags, '*']})) as T
}

export function revalidate_db_chache({tags,userid,id}:{tags:keyof typeof CHACH_TAGS,userid?:string,id?:string}){

    revalidateTag(getGlobalTag(tags))
if(userid != null){
    revalidateTag(getUserTag(userid, tags))
}
if(id != null){
    revalidateTag(getidTag(id,tags))
}

}