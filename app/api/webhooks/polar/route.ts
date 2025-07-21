//next js route
import { Webhooks } from "@polar-sh/nextjs";

import { TierNames } from "@/data/tier";

import { ActiveTier, checkoutProductCreated } from "@/lib/webhook-polar";
import { AssignTierfree } from "@/server/users";


export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
	try {
		
		
		if (payload.type  ===   "order.created") {

			try {
				const userId = payload.data.metadata.user_id as string
				if(userId.length === null){
					 throw new Error(userId+ 'userid not found ')
				} 
				
				const {product , customerId ,subscriptionId ,productId , billingName ,totalAmount  } = payload.data;

				if( !product.name || !customerId || !subscriptionId || !productId || !billingName || !totalAmount){
					throw new Error('some products not found ')
				}
					
					await checkoutProductCreated({tier:payload.data.product.name as TierNames, customerid:payload.data.customerId,subscriptionid:payload.data.subscriptionId,subscriptionitemid:payload.data.productId,customer_id:payload.data.customerId,total_amount:payload.data.totalAmount,billing_name:payload.data.billingName ,Uuid:userId })
				
				
				
				
				 
		}catch(error){
			 throw new Error('error in webhook payload.type == order.created '+error)
		}
			
		  
  
		  
  
		}  else if ( payload.type === "subscription.updated") {

			const payloaddata= payload.data
			const status= payloaddata.status
			const userid = payloaddata.metadata.user_id as string
			if(userid.length === null || !userid ){
				 throw new Error(userid+ 'userid not found ')
			} 


			if(status === 'active' ){

				const {product , customerId , amount ,customer } = payload.data;

				if( !product.name || !customerId || !amount || !customer){
					throw new Error('some products not found ')
				}
					
					await ActiveTier({tier:payload.data.product.name as TierNames, customerid:payload.data.customerId,subscriptionitemid:payload.data.productId,customer_id:payload.data.customerId ,Uuid:userid })
				
				

				
				
			}

			else if(status === 'canceled' ){


				AssignTierfree(userid)
				throw new Response('user regetiing the free tier')
				

				
				
			}
		   
		 
		} else {
		  throw new Error(`Unhandled webhook type: ${payload.type}`);
		}
    console.log('payload',payload)
	}catch(error){
		throw new Error('error in webhook payload.type == order.created '+error)
	}
  },
});

