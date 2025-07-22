'use server'
import db from "@/db";
import { CHACH_TAGS, DB_CACHE, getidTag } from "@/lib/cache";
import { ProductTable, ProductViewTable } from "@/src/db/product";
import { startOfDay, endOfDay, subDays, interval } from "date-fns";
import { and, count,  eq, gte, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import {tz} from '@date-fns/tz'
import { string } from "zod";
import product from "@/app/dashboard/product/new/page";


export async function getProductViewCount(userid:string,StartDate: Date ){
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chachfn = DB_CACHE(getProductViewCountInternal as any,{
        tags:[getidTag(userid,CHACH_TAGS.productViews)]
    })
    return chachfn(userid,StartDate)
}

export async function getProductViewCountInternal(userid:string,StartDate: Date ){
    const viewCount = await  db.select({ProductViewCount:count()}).from(ProductViewTable).innerJoin(ProductTable,eq(ProductTable.id,ProductViewTable.productId)).where(
        and(eq(ProductTable.clerkUserId,userid),gte(ProductViewTable.visitedAt,StartDate)))
        return viewCount[0]?.ProductViewCount 
    }
 




    

    
    
    