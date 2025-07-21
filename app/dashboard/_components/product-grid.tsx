'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { EllipsisVertical } from 'lucide-react'
import Link from 'next/link'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import React from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { AddToSiteProductModalContent } from './AddToSite'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'

import { DeleteProductAlertDialogContent } from './DeleteProductAlertDialogContent.tsx'

interface ProductGridProps {
    id: string,
    name: string,
    url: string,
    description?: string | null,
}

const ProductGrid = ({ products }: { products: ProductGridProps[] }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {products.map(product => (
                <Products key={product.id} {...product} />
            ))}
        </div>
    )
}

export default ProductGrid

export const Products = ({ id, name, description, url }: ProductGridProps) => {
    return (
        <div className='w-full h-full'>
            <Card key={id} className='h-36 relative w-full'>
            
                {/* <Link href={`/dashboard/product/${id}/edit?tab=countries`} className='hover:scale-105 transition-all duration-300 flex flex-col gap-5 text-balance h-full'> */}
                   <div>
                    <CardHeader>
                        <CardTitle className='text-balance'>{name}</CardTitle>
                        <CardDescription className='text-balance'>
                            {url}
                        </CardDescription>
                    </CardHeader>
                    {description && (
                        <CardContent>
                            <p className='text-balance'>{description}</p>
                        </CardContent>
                    )}
                </div>
                
                <div className='flex justify-end items-center mb-24 absolute top-16 w-full px-2'>
                    {/* Dialog for Add to Site */}
                    <Dialog>
                        {/* AlertDialog for Delete */}
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={'outline'} size={'icon'}>
                                        <div className='sr-only'>action button</div>
                                        <EllipsisVertical />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {/* Edit Option */}
                                    <DropdownMenuItem asChild>
                                        <Link href={`/dashboard/product/${id}/edit`}>
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                    
                                    {/* Add to Site Option */}
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem>
                                            Add to site
                                        </DropdownMenuItem>
                                    </DialogTrigger>
                                    
                                    <DropdownMenuSeparator />
                                    
                                    {/* Delete Option */}
                                    <AlertDialogTrigger asChild>
                                        <DropdownMenuItem >
                                            Delete
                                        </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            
                            {/* Delete Alert Dialog Content */}
                            <DeleteProductAlertDialogContent id={id} />
                        </AlertDialog>
                        
                        {/* Add to Site Dialog Content */}
                        <AddToSiteProductModalContent id={id} />
                    </Dialog>
                </div>
            </Card>
        </div>
    )
}