'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Home, Menu, ShoppingCart, Heart, MoveRight, Search } from 'lucide-react'
import Image from 'next/image';

interface Product {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
    height: number;
}

const MobileCMP: React.FC = () => {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    const products: Product[] = [
        {
          id: 1,
          name: 'Stylish Watch',
          price: '$120.00',
          imageUrl: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhdGNofGVufDB8fDB8fHww',
          description: 'A sleek and modern watch for everyday elegance.',
          height: 180,
        },
        {
          id: 2,
          name: 'Cat ',
          price: '$99.99',
          imageUrl: 'https://images.pexels.com/photos/20340988/pexels-photo-20340988.jpeg?cs=srgb&dl=pexels-helen1-20340988.jpg&fm=jpg',
          description: 'Immersive sound with ultimate comfort.',
          height: 120,
        },
        {
          id: 3,
          name: 'scate board',
          price: '$75.50',
          imageUrl: 'https://images.unsplash.com/photo-1601924357840-3e50ad4dd9fd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdhdGNofGVufDB8fDB8fHww',
          description: 'Your intelligent assistant for home automation and music.',
          height: 160,
        },
        {
          id: 4,
          name: 'Out-fit ',
          price: '$35.00',
          imageUrl: 'https://images.pexels.com/photos/29538442/pexels-photo-29538442.jpeg',
          description: 'Designed for comfort and precision.',
          height: 140,
        },
        {
          id: 5,
          name: 'Gaming Keyboard',
          price: '$85.00',
          imageUrl: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400&h=300&fit=crop',
          description: 'Mechanical keys for ultimate gaming experience.',
          height: 200,
        },
        {
          id: 6,
          name: ' Out-fit',
          price: '$25.00',
          imageUrl: 'https://plus.unsplash.com/premium_photo-1668485968642-30e3d15e9b9c?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3V0Zml0fGVufDB8fDB8fHww',
          description: 'Adjustable stand for all your devices.',
          height: 110,
        },
        {
          id: 7,
          name: 'sticker set',
          price: '$45.00',
          imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=320&fit=crop',
          description: 'Premium protection for your laptop.',
          height: 165,
        },
        {
          id: 8,
          name: 'USB-C Hub',
          price: '$55.00',
          imageUrl: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=280&fit=crop',
          description: 'Expand your connectivity options.',
          height: 130,
        },
        {
          id: 9,
          name: 'Bluetooth Speaker',
          price: '$89.99',
          imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=240&fit=crop',
          description: 'Portable sound for any adventure.',
          height: 150,
        },
        {
          id: 10,
          name: 'out-fit',
          price: '$29.99',
          imageUrl: 'https://images.unsplash.com/photo-1591567462127-1f25099900ab?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3V0Zml0fGVufDB8fDB8fHww',
          description: 'Keep your workspace tidy.',
          height: 125,
        }
    ];

    // Distribute products into 2 columns for masonry effect
    const distributeIntoColumns = (): { leftColumn: Product[]; rightColumn: Product[] } => {
        const leftColumn: Product[] = [];
        const rightColumn: Product[] = [];
        const columnHeights: number[] = [0, 0];

        products.forEach((product: Product) => {
            const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
            
            if (shortestColumnIndex === 0) {
                leftColumn.push(product);
            } else {
                rightColumn.push(product);
            }
            
            columnHeights[shortestColumnIndex] += product.height;
        });

        return { leftColumn, rightColumn };
    };

    const handleImageLoad = (id: number): void => {
        setLoadedImages(prev => new Set([...prev, id]));
    };

    const { leftColumn, rightColumn } = distributeIntoColumns();

    const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
        <div className='w-full mb-2 relative group  '>
            <div 
                className='relative overflow-hidden rounded-lg bg-white/20 backdrop-blur-sm shadow-sm border border-white/20'
                style={{ height: `${product.height}px` }}
            >
                {/* Loading skeleton */}
                {!loadedImages.has(product.id) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse">
                        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                    </div>
                )}
                
                {/* Image */}
                <Image   unoptimized width={100} height={100} loading='lazy'
                    className={`w-full h-full object-cover transition-all duration-300 ${
                        loadedImages.has(product.id) ? 'opacity-100' : 'opacity-0'
                    } group-hover:scale-105`}
                    src={product.imageUrl} 
                    alt={product.name}
                    onLoad={() => handleImageLoad(product.id)}
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-2 right-2">
                        <Heart className="w-4 h-4 text-white hover:fill-white cursor-pointer" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium truncate">{product.name}</p>
                    </div>
                </div>
            </div>
            
            {/* Product info */}
            <div className='mt-1 px-1'>
                <p className='text-xs text-gray-600 truncate'>{product.name}</p>
                <p className='text-sm font-semibold text-gray-800 mb-1'>{product.price}</p>
                <Button className='w-full text-xs py-1 h-6 bg-teal-500 hover:bg-teal-600 text-white'>
                    Add to Cart
                </Button>
            </div>
        </div>
    );

    return (
        <div className='flex items-center justify-center w-[260px]  '>
            {/* Mobile Frame */}
            <div className='w-full max-w-xs mx-auto bg-white/10 backdrop-blur-md backdrop-saturate-150 rounded-3xl shadow-2xl overflow-hidden border border-white/20' style={{width: '360px'}}>
                {/* Status Bar */}
                <div className='w-full h-6 bg-black text-white flex items-center justify-between px-4 text-xs'>
                    <div className='flex items-center space-x-1'>
                        <div className='w-1 h-1 bg-white rounded-full'></div>
                        <div className='w-1 h-1 bg-white rounded-full'></div>
                        <div className='w-1 h-1 bg-white rounded-full'></div>
                        <span className='ml-2'>Samsung</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <span>100%</span>
                        <div className='w-6 h-3 border border-white rounded-sm'>
                            <div className='w-full h-full bg-white rounded-sm'></div>
                        </div>
                    </div>
                </div>
                
                {/* Promotion Banner */}
                <div className='w-full h-8 bg-gradient-to-r bg-black text-white flex items-center justify-center text-xs font-medium'>
                    <p className='animate-pulse'>🎉 Americans use &apos;AMERICANS&apos; get 20% off!</p>
                </div>
                
                {/* Header */}
                <div className='w-full bg-white/20 backdrop-blur-sm px-4 py-3 border-b border-white/20'>
                    <div className='flex items-center justify-between mb-3'>
                        <MoveRight size={24} className='text-gray-600'/>
                        <h1 className='text-lg font-bold text-gray-800'>Shop</h1>
                        <div className='flex items-center space-x-3'>
                            <Search size={20} className='text-gray-600'/>
                            <div className='relative'>
                                <ShoppingCart size={20} className='text-gray-600'/>
                                <div className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center'>
                                    <span className='text-white text-xs font-bold'>2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Content with Scrolling */}
                <div className='h-96 overflow-y-auto bg-transparent' style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            .h-96::-webkit-scrollbar {
                                display: none;
                            }
                        `
                    }} />
                    {/* Categories */}
                    <div className='px-4 py-3 bg-white/10 backdrop-blur-sm border-b border-white/20'>
                        <div className='flex space-x-2 overflow-x-auto pb-2' style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                    .flex::-webkit-scrollbar {
                                        display: none;
                                    }
                                `
                            }} />
                            {['All', 'Electronics', 'Accessories', 'Gaming', 'Audio'].map((category) => (
                                <button
                                    key={category}
                                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                        category === 'All' 
                                            ? 'bg-teal-500 text-white' 
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Featured Product */}
                    <div className='px-4 py-3 bg-white/10 backdrop-blur-sm border-b border-white/20'>
                        <div className='relative h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden'>
                            <div className='absolute inset-0 bg-black bg-opacity-20'></div>
                            <div className='relative z-10 p-4 text-white'>
                                <h3 className='text-lg font-bold mb-1'>Featured Deal</h3>
                                <p className='text-sm opacity-90'>Up to 50% off on selected items</p>
                                <Button className='mt-2 bg-white text-blue-600 hover:bg-gray-100 text-xs py-1 px-3 h-6'>
                                    Shop Now
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Products Grid */}
                    <div className='px-4 py-3'>
                        <h2 className='text-lg font-semibold text-gray-800 mb-3'>Products</h2>
                        <div className='flex gap-2' style={{ alignItems: 'flex-start' }}>
                            {/* Left Column */}
                            <div className='flex-1 flex flex-col'>
                                {leftColumn.map((product: Product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                            
                            {/* Right Column */}
                            <div className='flex-1 flex flex-col'>
                                {rightColumn.map((product: Product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Load More Button */}
                    <div className='px-4 py-4 text-center'>
                        <Button className='w-full bg-teal-500 text-gray-100 hover:bg-teal-600'>
                            Load More Products
                        </Button>
                    </div>
                </div>
                
                {/* Bottom Navigation */}
                <div className='bg-white/20 backdrop-blur-sm border-t border-white/20 px-4 py-2'>
                    <div className='flex justify-around items-center'>
                        <div className='flex flex-col items-center space-y-1'>
                            <Home className='w-5 h-5 text-blue-500'/>
                            <span className='text-xs text-blue-500 font-medium'>Home</span>
                        </div>
                        <div className='flex flex-col items-center space-y-1'>
                            <Menu className='w-5 h-5 text-gray-400'/>
                            <span className='text-xs text-gray-400'>Categories</span>
                        </div>
                        <div className='flex flex-col items-center space-y-1'>
                            <ShoppingCart className='w-5 h-5 text-gray-400'/>
                            <span className='text-xs text-gray-400'>Cart</span>
                        </div>
                        <div className='flex flex-col items-center space-y-1'>
                            <Heart className='w-5 h-5 text-gray-400'/>
                            <span className='text-xs text-gray-400'>Wishlist</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileCMP;