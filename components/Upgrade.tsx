import React  from 'react'
import { Card,CardHeader,CardContent,CardTitle, CardDescription } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'

const Upgrade = ({children}: {children: React.ReactNode}) => {
  return (
      <div className='w-full  h-fit flex items-center justify-center text-center '>

      <Card className=' bg-accent/55 border-0 border-zinc-950/10 w-full  h-fit mt-20 '>
      
        <CardHeader>
            <CardTitle className='text-xl '>permission denied</CardTitle>
            <CardDescription>
                {children}
            </CardDescription>
        </CardHeader>
        <CardContent>
            
            <Link href='/pricing' prefetch={false}>
            <Button  variant='teal'className='mt-5'>Upgrade Account </Button></Link>
        </CardContent>
    </Card>
      </div>
  )
}

export default Upgrade