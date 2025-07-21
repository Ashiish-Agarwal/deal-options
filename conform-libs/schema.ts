import { string, z } from 'zod';



export const ProductDetailSchema= z.object({
  name: z.string().min(3,'Name must be at least 3 characters long'),
  url: z.string().url().min(3,'Enter valid website url'),
  description: z.string().max(1000,'Description must be at most 1000 characters long').optional(),
});

export const CountryDiscountFormSchema=z.object({
  groups:z.array(z.object({
    countryGroupid:z.string().min(1,'country group id is required'),
    discountPercentage:z.number().max(100,'discount percentage is required').min(1,'discount percentage is required').or(z.nan()).transform(n =>isNaN(n)?undefined: n).optional(),
    coupon:z.string().optional(),
    
}).refine(data=>{
  const hascoupon= data.coupon != null && data.coupon?.length > 0
  const hasdiscount= data.discountPercentage != null 
  return !(hascoupon && !hasdiscount)
},
{
  message:'discount is required if coupon code is provided',
  path:['root'],
}))

})


export const CustomizationTabFormSchema=z.object({
  classPrefix: z.string().optional(), 
 
  locationMessage: z.string().min(1,'required'),
  backgroundColor: z.string().min(1,'required'),
  textColor: z.string().min(1,'required'),
  fontSize: z.string().min(1,'required'),
  bannerContainer: z.string().min(1,'required'),
  isSticky: z.boolean().optional(),
  
})
