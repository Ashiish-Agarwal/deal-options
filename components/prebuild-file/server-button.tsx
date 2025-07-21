'use client'
import {useFormStatus} from "react-dom"
import { LoaderCircle } from 'lucide-react';
import React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type server_button_props={
    children?:string,
    classname?:string
    
}

const Server_button = ({children,classname}:server_button_props) => {
const {pending} = useFormStatus()

  return (
    <>
      <button
        type="submit"
        className={cn(buttonVariants({
         className:'w-25 h-9 rounded-md',
         
        }),classname)}
      >
       

          {pending ? (
            <span className={cn('flex gap-1 ')}
            >
          <LoaderCircle className="animate-spin opacity-45 mr-2"  />
          
        </span>
        ) : (
          <span>{children}</span>  
        )}
      </button>
    </>
  );
}

export default Server_button