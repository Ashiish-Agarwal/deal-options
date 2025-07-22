// lib/actions.ts
'use server';


import db from '@/db';
import { CountryGroupDiscountTable, ProductCustomizationTable, ProductTable } from '@/src/db/product';
import { user } from '@/src/db/schema';
import { and, eq, inArray, sql } from 'drizzle-orm';
import { uuidAction } from './users';
import { deleteProductdb } from './actions/productDetails';
import { CHACH_TAGS, DB_CACHE, getUserTag, revalidate_db_chache } from '@/lib/cache';
import { redirect } from 'next/navigation';
import { ProductDetailSchema } from '@/conform-libs/schema';
import { promise, z } from 'zod';
import { getProduct, updateProductdb } from './db/product';
import { BatchItem } from "drizzle-orm/batch"
import { error } from 'console';




export async function productDetails(unsafeData: z.infer<typeof ProductDetailSchema>): Promise<{ success: boolean, error: string }> {

  const { success, data } = ProductDetailSchema.safeParse(unsafeData)

  if (!success) {
    return {
      success: false,
      error: 'Invalid data'
    }
  }
  const uuidd = await uuidAction()

  if (!uuidd) {
    return {
      success: false,
      error: 'Failed to get user id'
    }
  }

  const userIdAction = await db.select().from(user).where(eq(user.id, uuidd))
  const userid = userIdAction[0].id


  if (!success || userIdAction == null) {
    return { success: false, error: "There was an error creating your product" }
  }



  const { id } = await createProduct({
    ...data, clerkUserId: userid, url: data.url
  })

  if (!id) {
    return {
      success: false,
      error: 'Failed to create product'
    }
  }

  redirect(`/dashboard`)


}

export async function getProducts({ userid, limit }: { userid: string, limit?: number} = {userid:'',limit:10} ) {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chachfn = DB_CACHE(getinternalProducts as any, {
    tags: [getUserTag(userid, CHACH_TAGS.products)]
  })

  return chachfn({ userid }, { limit :limit || 10 })
}



export async function createProduct(data: typeof ProductTable.$inferInsert) {



  const [newProduct] = await db.insert(ProductTable).values(data).returning({
    id: ProductTable.id, userid: ProductTable.clerkUserId
  })
  if (!newProduct) {
    return { success: false, error: 'Failed to create product' }
  }

  try {

    await db.insert(ProductCustomizationTable).values({
      productId: newProduct.id
    }).onConflictDoNothing({
      target: ProductCustomizationTable.productId
    })


  } catch (error) {

    await db.delete(ProductTable).where(eq(ProductTable.id, newProduct.id))
  }
  revalidate_db_chache({
    tags: CHACH_TAGS.products,
    userid: newProduct.userid,
    id: newProduct.id
  })

  return {
    success: true,
    id: newProduct.id
  }

}

export async function deleteProduct(id: string) {

  const userid = await uuidAction()
  if (!userid) {
    return {
      success: false,
      error: 'Failed to get user id'
    }
  }

  const deleteProduct = await deleteProductdb({ id, userid })

  if (!deleteProduct) {
    return {
      success: false,
      error: 'Failed to delete product'
    }
  }


  return {
    success: true,
    id
  }
}

export async function updateProduct(unsafeData: z.infer<typeof ProductDetailSchema>, { id }: { id: string }): Promise<{ success: boolean, error: string } | undefined> {


  const { success, data } = ProductDetailSchema.safeParse(unsafeData)

  const userid = await uuidAction()
  if (!userid) {
    return {
      success: false,
      error: 'Failed to get user id'
    }
  }



  if (!success) {
    return {
      success: false,
      error: 'Invalid data'
    }
  }
  await updateProductdb(data, id, userid)
  return { success: true, error: 'Product updated successfully' }



}

export async function getinternalProducts({ userid }: { userid: string }, { limit }: { limit: number }) {
  return await db.query.ProductTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userid),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
    limit: limit
  },

  )
}

export async function UpdateCountryDiscountdb({ id, userid }: { id: string, userid: string },
  InsertData: (typeof CountryGroupDiscountTable.$inferInsert)[], deltesId: { countryGroupid: string }[] ) {

    const productid= await getProduct({id,userid})
    if(productid==null){
        return {
            message:'Failed to get product id',
            error:true
        }
    }
    const statement: BatchItem<"pg">[]=[]
    if(deltesId?.length>0){
      statement.push(
        db.delete(CountryGroupDiscountTable).where(and(eq(CountryGroupDiscountTable.productId,id),inArray(CountryGroupDiscountTable.countryGroupId,deltesId.map((item)=>item.countryGroupid))))
      )

    }
    if(InsertData?.length>0){
      statement.push(
        db.insert(CountryGroupDiscountTable).values(InsertData).onConflictDoUpdate({
          target:[ CountryGroupDiscountTable.countryGroupId, CountryGroupDiscountTable.productId],
          set:{
            coupon:sql.raw(`excluded.${CountryGroupDiscountTable.coupon.name}`),
            discountPercentage:sql.raw(`excluded.${CountryGroupDiscountTable.discountPercentage.name}`)
          }
          
          
          
        }
      )
      )
    }
    if(statement.length >0){
      await Promise.all(statement)
    }
    revalidate_db_chache({tags:CHACH_TAGS.products,userid,id})
    return {
        error:false,
        message:'Product updated successfully'
    }
    
}