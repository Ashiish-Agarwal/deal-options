import { NextRequest } from 'next/server'
import { polar } from '@/server/polar'
import { uuidAction } from '@/server/users'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('product')
    
    if (!productId) {
      return new Response('Product ID is required', { status: 400 })
    }
    const userid = await uuidAction()

    if(userid==null || userid==undefined || userid.length ===0){
      return new Response('User ID not found', { status: 400 })
       
       

    }
    
     

    const api = await polar()
    
    // Create a checkout session
    const checkout = await api.checkouts.create({
      products: [productId], // You might need to adjust this based on your product structure
      successUrl: process.env.POLAR_SUCCESS_URL!,
      
      
      // Add other required parameters based on Polar's API
      metadata:{
        user_id:userid
      }
    })

    // Redirect to checkout URL
    return Response.redirect(checkout.url)
  } catch (error) {
    console.error('Checkout error:', error)
     
    return new Response('Checkout error', { status: 500 })
    
  }
}