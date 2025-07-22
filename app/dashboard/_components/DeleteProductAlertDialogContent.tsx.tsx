"use client"

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteProduct } from "@/server/Products"

import { useTransition } from "react"
import { toast } from "sonner"

export function DeleteProductAlertDialogContent({ id }: { id: string }) {
  const [isDeletePending, startDeleteTransition] = useTransition()


  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this
          product.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
            startDeleteTransition(async () => {
              const data = await deleteProduct(id)
              if (data.success) {
                toast.success("Product deleted successfully")
                 
              }
              else{
                toast.error(`error:data not deleted  ${data.error}`)
              }
            })
          }}
          disabled={isDeletePending} asChild
        >
          <Button  className="bg-red-700 hover:bg-red-800">

          {isDeletePending ? "Deleting..." : "Delete"}
          </Button>
          
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}