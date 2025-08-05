

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CustomizationTabFormSchema } from "@/conform-libs/schema"
import { Textarea } from "@/components/ui/textarea"

import { Switch } from "@/components/ui/switch"
import { Banner } from "@/components/Banner"
import { updateProductCustmizaion } from "@/server/actions/productDetails"
import { toast } from "sonner"




 const  CustomizationTabForm=(
    {removeBranding,canCustomizeBanner,customizationtable}
    :{
    removeBranding:boolean,
    canCustomizeBanner:boolean,
    customizationtable:{
    classPrefix: string | null;
    productId: string;
    locationMessage: string;
    backgroundColor: string;
    textColor: string;
    fontSize: string;
    bannerContainer: string;
    isSticky: boolean;

    }
}) =>{

    const form = useForm<z.infer<typeof CustomizationTabFormSchema>>({
        resolver: zodResolver(CustomizationTabFormSchema),
        defaultValues: {
          ...customizationtable,
          classPrefix:customizationtable.classPrefix ?? '',
         
        },
      })

const re= removeBranding
// if(!re){
//   return <Upgrade>you do not have permission to perform this action</Upgrade>
// }
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CustomizationTabFormSchema>) {
   const data = await updateProductCustmizaion({id:customizationtable.productId},values)
   if(data.error){
    toast.error(data.message)
   }
   else{
    toast.success(data.message)
   }
  
  }

  const watchForm= form.watch()

 
  
  return (
    <>

    <Banner message={watchForm.locationMessage} mappings={{coupon:'example',discount:'10%',country:'INDIA'}} canRemoveBranding={canCustomizeBanner} customization={{...watchForm,isSticky:watchForm.isSticky ?? false}}     />
    <p className="text-sm text-muted-foreground mt-5 cursor-no-drop">See how your banner look like </p>
    {/* <div>
      {canCustomizeBanner ? null : (
        <Upgrade>you do not have permission to perform this action</Upgrade>
      )}
    </div> */}
    <div className=" mt-5 ">
      <Form {...form} >
        
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-2  gap-4">
            <div>


        <FormField
          control={form.control}
          name="locationMessage"
          render={({ field }) => (
              <FormItem>
              <FormLabel className="text-xl font-semibold ">discount message</FormLabel>
              <FormControl>
                {/* <Input placeholder="shadcn" {...field} />
                 */}
                 <Textarea className="h-32 " {...field} disabled={!canCustomizeBanner}/>
              </FormControl>
              <FormDescription>
               {" data parameter : {country} ,{coupon},  {discount}"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          </div>
          <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-2  gap-4">
            <div>

          <FormField
          control={form.control}
          name="backgroundColor"
          render={({ field }) => (
              <FormItem>
              <FormLabel className="text-xl font-semibold ">background color</FormLabel>
              <FormControl>
              <Input {...field} disabled={!canCustomizeBanner} />
                 
                 
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
          />         
          </div>
          <div>

<FormField
control={form.control}
name="fontSize"
render={({ field }) => (
    <FormItem>
    <FormLabel className="text-xl font-semibold ">font size</FormLabel>
    <FormControl>
    <Input {...field} disabled={!canCustomizeBanner}/>
       
       
    </FormControl>
    
    <FormMessage />
  </FormItem>
)}
/>         
</div>

<div>

          <FormField
          control={form.control}
          name="isSticky"
          render={({ field }) => (
              <FormItem>
              <FormLabel className="text-xl font-semibold ">sticky?</FormLabel>
              <FormControl>
              <Switch  checked={field.value} onCheckedChange={field.onChange} disabled={!canCustomizeBanner} />
                 
                 
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
          />         
          </div>
          
<div>

<FormField
control={form.control}
name="bannerContainer"
render={({ field }) => (
    <FormItem>
    <FormLabel className="text-xl font-semibold ">banner container</FormLabel>
    <FormControl>
    <Input {...field} disabled={!canCustomizeBanner} />
       
       
    </FormControl>
    <FormDescription>
        HTML container selector where you want to place the banner . Ex #Container.container.body
    
    </FormDescription>
    
    <FormMessage />
  </FormItem>
)}
/>         
</div>
         
<div>

<FormField
control={form.control}
name="classPrefix"
render={({ field }) => (
    <FormItem>
    <FormLabel >class prefix</FormLabel>
    <FormControl>
    <Input {...field} disabled={!canCustomizeBanner} />
       
       
    </FormControl>
    <FormDescription>
        AN option prefix to all css classes to avoid conflicts 
    </FormDescription>
    
    <FormMessage />
  </FormItem>
)}
/>         
</div>
          </div>
          </div>
        <Button variant='teal' type="submit">Submit</Button>
      </form>
    </Form>
    </div>
    </>
  )


    }
export default CustomizationTabForm