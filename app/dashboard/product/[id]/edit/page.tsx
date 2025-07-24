import { uuidAction } from '@/server/users'
import React from 'react'
import { notFound, redirect } from 'next/navigation'
import { getProduct, GetProductCountryGroup, GetProductCustmization } from '@/server/db/product'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Backbutton from '@/app/dashboard/_components/backbutton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ProductsDetailForm from '@/app/dashboard/_components/form/ProductsDetailForm'
import {CountryDiscountForm} from '@/app/dashboard/_components/form/CountryDiscountForm'
import { canCustomizeBanner, canRemoveBranding } from '@/server/permission'
import CustomizationTabForm from '@/app/dashboard/_components/form/CustomizationTabForm'

const page =async ({params,searchParams}:
  {params:Promise<{id:string}>,searchParams:Promise<{tab?:string}>}) => {

    const {id}=await params
    const resolveSearchParams=await searchParams
    const tab=resolveSearchParams?.tab ?? 'details'

  const userid=await uuidAction()

  if(!userid){
     redirect('/login')
  }
 
  const productdata = await getProduct({userid:userid,id:id}) as {
    id: string;
    name: string;
    description: string | null;
    url: string;
  } | null
  
  if(productdata==null){
   return notFound()
  }

  return (
    <Backbutton HREf={'/dashboard/product'} pageTital='Product Edit Page' className='pt-22 '>
     <Tabs defaultValue={tab}>
      <TabsList className='bg-background/60 '>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="countries">Countries</TabsTrigger>
        <TabsTrigger value="customization">customization</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <DetailsTab product={productdata}/>
      </TabsContent>
      <TabsContent value="countries">
        <CountryTab id={id} userid={userid}/>
      </TabsContent>
      <TabsContent value="customization">
        <CustomizationTab id={id} userid={userid}/>
      </TabsContent>
     </Tabs>
    </Backbutton>
  )
}

export default page

function DetailsTab({product}:{
  product:{
    id:string,
    name:string,
    description:string | null ,
    url:string
  }
}){

return (
  <Card className='w-[90%]  bg-accent/55 border-0 border-zinc-950/10  rounded-xl   h-full  '>
    <CardHeader>
      <CardTitle>Product Details</CardTitle>
    </CardHeader>
    <CardContent>
      <ProductsDetailForm product={product}/>
    </CardContent>
  </Card>
)

}

async function CountryTab ({id,userid}:{id:string,userid:string}){

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const countrygroups= await GetProductCountryGroup({userid,id}) as any[]
  


return(
  <div>
    <Card className='w-[90%]  bg-accent/55 border-0 border-zinc-950/10  rounded-xl   h-full  '>

      <CardHeader>
        <CardTitle className='text-xl '>Countries discount</CardTitle>
        <CardDescription>leave the discount field empty if you do not  wants to display deals for any country and all set up  ✨</CardDescription>
      </CardHeader>
      <CardContent>
       <CountryDiscountForm id={id} countrygroups={countrygroups}/>
        
      </CardContent>
    </Card>
    
  </div>
)

}


async function CustomizationTab({id,userid}:{id:string,userid:string}){

const customizationtable= await GetProductCustmization({id,userid}) as {
    classPrefix: string | null;
    productId: string;
    locationMessage: string;
    backgroundColor: string;
    textColor: string;
    fontSize: string;
    bannerContainer: string;
    isSticky: boolean;
  } | null
if(customizationtable==null) return notFound()


  return(
   

    <Card className='w-[90%]  bg-accent/55 border-0 border-zinc-950/10  rounded-xl   h-full  '>
      <CardHeader>
        <CardTitle className='text-2xl'>
          Banner Customization 
        </CardTitle>
      </CardHeader>
      <CardContent>
        
        <CustomizationTabForm  removeBranding={ await canRemoveBranding(userid)} canCustomizeBanner={await canCustomizeBanner(userid) } customizationtable={customizationtable }/>
      </CardContent>
    </Card>
 
  )
}
