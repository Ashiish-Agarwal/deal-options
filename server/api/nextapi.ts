import db from "@/db";
import { DB_CACHE } from "@/lib/cache";
import { CountryGroupDiscountTable } from "@/src/db/product";
import { eq } from "drizzle-orm";
import { CHACH_TAGS, getGlobalTag, getidTag } from "@/lib/cache";

export async function getProductForBanner({id,country ,url}:{id:string,country:string,url:string}){
    
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const chachfn = DB_CACHE(getProductForBannerInternal as any,{
    tags:[
        getidTag(id,CHACH_TAGS.products),
        getGlobalTag(CHACH_TAGS.country),
        getGlobalTag(CHACH_TAGS.countryGroup),


    ]

 })
 return chachfn({id,country,url})

}

// export async function getProductForBannerInternal({id,country,url}:{id:string,country:string,url:string}){
    
//     const data = await db.query.ProductTable.findFirst({
//       where:({id:idcol,url:urlcol},{eq,and})=>and(eq(idcol,id),eq(urlcol,url)),
//       columns:{
//         id:true,
//         clerkUserId:true,
//       },with:{
//         productCustomization:true,
//         countryGroupDiscounts:{
//             columns:{
//                 coupon:true,
//                 discountPercentage:true,
//             },
//             with:{
//                 countryGroup:{
//                     with:{
//                         countries:{
//                             columns:{
//                                 id:true,
//                                 name:true
//                             },limit:1,
//                             where:({code},{eq})=>eq(code,country)
//                         }
//                     }
//                 }
//             }
//         }
//       }
                        
                        
                       
                        
                    
               
//     })

//     const discount = await data?.countryGroupDiscounts?.find((d)=>d.countryGroup.countries.length>0)
//     const countrydata =  discount?.countryGroup.countries[0]
   
//     const ProductData= data == null || data.productCustomization == null ? undefined : {
//         id:data.id,
//         clerkUserId:data.clerkUserId,
//         custmization:data.productCustomization,
        
        
//     }
//     return{
//         ProductData,
//         countrydata,
//         discount:discount == null ?undefined :{
//             coupon:discount.coupon,
//             percentage:discount.discountPercentage
//         }
//     }
  
// }


export async function getProductForBannerInternal({id,country,url}:{id:string,country:string,url:string}){
    
    console.log('getProductForBannerInternal called with:', { id, country, url });
    
    // First, get the product data - try with and without URL matching
    let data = await db.query.ProductTable.findFirst({
      where:({id:idcol,url:urlcol},{eq,and})=>and(eq(idcol,id),eq(urlcol,url)),
      columns:{
        id:true,
        clerkUserId:true,
        url:true,
      },
      with:{
        productCustomization:true,
        countryGroupDiscounts:{
            columns:{
                coupon:true,
                discountPercentage:true,
            },
            with:{
                countryGroup:{
                    with:{
                        countries:{
                            columns:{
                                id:true,
                                name:true,
                                code:true
                            }
                        }
                    }
                }
            }
        }
      }
    });

    console.log('Product data with URL match:', data ? { id: data.id, url: data.url, hasCustomization: !!data.productCustomization } : 'null');

    // If no product found with URL match, try without URL (for debugging)
    if (!data) {
        console.log('No product found with URL match, trying without URL...');
        data = await db.query.ProductTable.findFirst({
            where:({id:idcol},{eq})=>eq(idcol,id),
            columns:{
                id:true,
                clerkUserId:true,
                url:true,
            },
            with:{
                productCustomization:true,
                countryGroupDiscounts:{
                    columns:{
                        coupon:true,
                        discountPercentage:true,
                    },
                    with:{
                        countryGroup:{
                            with:{
                                countries:{
                                    columns:{
                                        id:true,
                                        name:true,
                                        code:true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        console.log('Product data without URL match:', data ? { id: data.id, url: data.url, hasCustomization: !!data.productCustomization } : 'null');
    }

    if (!data) {
        console.log('No product found at all!');
        return {
            ProductData: undefined,
            countrydata: undefined,
            discount: undefined
        };
    }

    // Second, get the country data separately to ensure we have it
    // Try both uppercase and lowercase country codes
    let countryResult = await db.query.CountryTable.findFirst({
        where: ({code}, {eq}) => eq(code, country),
        columns: {
            id: true,
            name: true,
            code: true
        }
    });
    
    console.log('Country lookup with code:', country, 'Result:', countryResult);
    
    // If not found, try uppercase version
    if (!countryResult && country.toLowerCase() === country) {
        const upperCountry = country.toUpperCase();
        console.log('Trying uppercase country code:', upperCountry);
        countryResult = await db.query.CountryTable.findFirst({
            where: ({code}, {eq}) => eq(code, upperCountry),
            columns: {
                id: true,
                name: true,
                code: true
            }
        });
        console.log('Country lookup with uppercase code:', upperCountry, 'Result:', countryResult);
    }

    // Find matching discount
    let discount = null;
    console.log('Looking for discount...', {
        hasCountryGroupDiscounts: !!data.countryGroupDiscounts,
        countryGroupDiscountsLength: data.countryGroupDiscounts?.length,
        hasCountryResult: !!countryResult,
        countryResultId: countryResult?.id
    });
    
    if (data.countryGroupDiscounts && countryResult) {
        for (const discountGroup of data.countryGroupDiscounts) {
            console.log('Checking discount group:', {
                coupon: discountGroup.coupon,
                discountPercentage: discountGroup.discountPercentage,
                countriesInGroup: discountGroup.countryGroup.countries.map(c => ({ id: c.id, name: c.name, code: c.code }))
            });
            
            // Check if this discount group includes our country
            const hasCountry = discountGroup.countryGroup.countries.some(
                c => c.id === countryResult.id
            );
            
            console.log('Country match found:', hasCountry);
            
            if (hasCountry) {
                discount = discountGroup;
                console.log('Using discount:', { coupon: discount.coupon, percentage: discount.discountPercentage });
                break;
            }
        }
    }

    if (!discount) {
        console.log('No discount found for country:', countryResult?.name || country);
    }

    const ProductData = data.productCustomization == null ? undefined : {
        id: data.id,
        clerkUserId: data.clerkUserId,
        custmization: data.productCustomization,
    };

    console.log('Final result:', {
        hasProductData: !!ProductData,
        hasCountryData: !!countryResult,
        hasDiscount: !!discount,
        discount: discount ? { coupon: discount.coupon, percentage: discount.discountPercentage } : undefined
    });

    return {
        ProductData,
        countrydata: countryResult, // This will now always have the country data if it exists
        discount: discount == null ? undefined : {
            coupon: discount.coupon,
            percentage: discount.discountPercentage
        }
    };
}