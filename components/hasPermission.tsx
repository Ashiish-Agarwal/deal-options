import React from 'react'
import Upgrade from './Upgrade'
import { uuidAction } from '@/server/users'
import { redirect } from 'next/navigation'
const HasPermission =async ({permission,renderFallback,FallBackTExt ,children}:{
    permission:(Userid:string | null)=>Promise<boolean>,
    renderFallback?:boolean,
    FallBackTExt?:string,
    children:React.ReactNode
}) => {
 const userid= await uuidAction()
 if(!userid){
     redirect('/login')
    }
const hasPermission= await permission(userid)
if(hasPermission) return children
if(renderFallback) return<Upgrade>{FallBackTExt}</Upgrade>
return null
}

export default HasPermission