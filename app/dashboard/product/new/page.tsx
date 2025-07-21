import React from 'react'
import Backbutton from '../../_components/backbutton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProductsDetailForm from '../../_components/form/ProductsDetailForm'
import HasPermission from '@/components/hasPermission'
import { canCreateProduct } from '@/server/permission'




const product = () => {
  return (
    <div className='w-full
    h-full '>

    <Backbutton HREf={'/dashboard'} pageTital='Product'>
    
     <HasPermission permission={canCreateProduct} renderFallback FallBackTExt=" you have already created the maximum number of products . try upgrade your account yo create more.">

    
    <Card className='w-full bg-accent/50 border-0 border-zinc-950/10  rounded-xl   h-full  '>
    
    <CardHeader>
      <CardTitle>Product Details</CardTitle>
    </CardHeader>
    <CardContent>
      <ProductsDetailForm/>
    </CardContent>
    
    </Card>
     </HasPermission>
     </Backbutton>
    </div>
  )
}

export default product