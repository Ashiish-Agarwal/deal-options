'use client'
import { authClient } from "@/lib/auth-client"


export const useridCheck = ()=>{

      const user = authClient.useSession()

     return user
}