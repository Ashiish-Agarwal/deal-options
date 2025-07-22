//product detail form and product create form

'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductDetailSchema } from "@/conform-libs/schema"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Textarea } from '@/components/ui/textarea'
import { RequiredLabelIcon } from '@/components/re'
import { toast } from 'sonner'
import { productDetails, updateProduct } from '@/server/Products'




const ProductsDetailForm = ({product}:{
  product?:{
    id:string,
    name:string,
    description:string | null,
    url:string
  }
}) => {

  // const notify = () => toast('Here is your toast.');
   
 // 1. Define your form.
 const form = useForm<z.infer<typeof ProductDetailSchema>>({
    resolver: zodResolver(ProductDetailSchema),
    defaultValues:product?{
     ...product,description:product.description ?? ""
    }
     :
    {
      name: "",
      url: "",
      description: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof ProductDetailSchema>) {
   

  
  
    
    const prevres= product == null ? await productDetails(data): updateProduct.bind(null,data,{id:product.id})()
    const result= await prevres
    if (!result || !result.success ) {
      toast.error('Something went wrong while saving the product'+result?.error);
    }else{
        toast.success('Product saved successfully');
    }
    
  }

  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex gap-6 flex-col"
    >
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Product Name
                <RequiredLabelIcon />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Enter your website URL
                <RequiredLabelIcon />
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Include the protocol (http/https) and the full path to the
                sales page
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Description</FormLabel>
            <FormControl>
              <Textarea className="min-h-20 resize-none" {...field} />
            </FormControl>
            <FormDescription>
              An optional description to help distinguish your product from
              other products
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="self-end">
        <Button variant='teal' disabled={form.formState.isSubmitting} type="submit">
          Save
        </Button>
      </div>
     
      

    </form>
  </Form>
  )
}

export default ProductsDetailForm