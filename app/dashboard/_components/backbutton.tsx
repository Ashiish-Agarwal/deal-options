import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import React from "react"

interface BackbuttonProps {
    HREf: string,
    children:React.ReactNode,
    pageTital:string,
    className?:string

}

const Backbutton = ({HREf,children,pageTital,className}:BackbuttonProps) => {
  return (
    <div className={cn('grid grid-cols-[auto_1fr]  gap-x-4 gap-y-8 w-full h-full p-5   ',className)}>
        <Button variant={'outline'
            
        } size={'icon'} className="rounded-full "  asChild>
            <Link  href={HREf}>
            <div className="sr-only">
                Back
            </div>
            <ArrowLeftIcon className="size-6 "/>
            </Link>
        </Button>
        <h1 className="text-2xl font-semibold">{pageTital}</h1>
        <div className="col-start-2  ">{children}</div>
       
    </div>
  )
}

export default Backbutton