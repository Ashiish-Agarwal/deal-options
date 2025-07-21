"use client";
import { TextRoll } from '@/components/motion-primitives/text-roll';
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Star, StarIcon } from 'lucide-react';

export function Testimonial() {
  return (
    <>

<TextRoll className='text-4xl dosisFont text-center tracking-tight w-full ' >
     Clients say
    </TextRoll>
    <h1 className='text-2xl dosisFont text-center tracking-tight mt-5'>there a clients expercied the problem and we solve it samalessly withouy a lot of charge <StarIcon className='inline ml-2 '/></h1>

    <div className="h-[20rem] rounded-md flex flex-col antialiased  dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards  
        items={testimonials}
        direction="right"
        speed="slow"
        />
    </div>
        </>
  );
}

const testimonials = [
    {
        quote:
          "i have no idea of coding but when i saw this tool i just try and it was like wow i can just click and things change my website is so better now just with few gui steps",
        name: "Sophie Allen",
        title: "no code guy but now i can",
      },
      {
        quote:
          "before i have to wait for my devloper and he take long time now i just change the banner or offers in 2 minute no more whatsapp message or delay",
        name: "john doe",
        title: "fast changes easy",
      },
      {
        quote:
          "i try this because my friend say it is good and yes after use i also think it save my lot of time specialy on mobile sale page",
        name: "james walker",
        title: "time saver for real",
      },
      {
        quote:
          "my english not good but the tool is simple and my son also help me little and now my shop have own website and offer running fast",
        name: "Emily Stone",
        title: "shop online now easy",
      },
      {
        quote:
          "my website is going good and i do a harcoded discount or in my case my website banner discount change a lot so i code this day by day is too much handy but there website solved it ",
        name: "Ankit kushwah",
        title: "Good for my webpage",
      },
      {
        
        quote:
          "i am running a bussniess of the mobile and sales it also the dornyGrp ccreate it for us but when he launched there website and when he sayed you do with gui and damn i see ..",
        name: "Michael Brooks",
        title: "my web page",
       
      },
          
];
