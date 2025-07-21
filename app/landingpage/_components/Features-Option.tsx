import { Code, Icon, MoveLeft } from "lucide-react";
import Image from "next/image";
import React from 'react';

const FeaturesOption = () => {

  const steps = [
    {
      number: 1,
      title: "Create Product",
      description: "Create your product and costomize url "
    },
    {
      number: 2,
      title: "custmize your banner and description ",
      description: "custmize your banner and description"
    },
    {
      number: 3,
      title: "connect with script tag",
      description: "connect with script tag and start selling"
    },
    {
      number: 4,
      title: "done",
      description: "Add in your code and done..."
    }
  ];
  return (
<>
   <section className='flex flex-col items-center justify-center gap-8  border-t-2 border-zinc-500/20 border-dotted  p-2 w-full h-full '>


    <div className="text-xl font-semibold tracking-tight text-balance text-center ">
    <h1 className='text-teal-500 text-5xl '> Our moto</h1>
<p className='text-balance dosisFont text-2xl mt-5 text-center'>Turn browsers into buyers—anywhere. Reach the 85% you're missing with intelligent global pricing    </p>

<div className="w-full max-w-6xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center text-center relative">
            {/* Step Number Circle */}
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 relative z-10">
              <span className="text-teal-700 font-semibold text-lg">
                {step.number}
              </span>
            </div>
            
            {/* Connecting Line - Hidden on mobile, visible on larger screens */}
            {index < steps.length - 1 && (
              <div className=" sm:block hidden absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-6 z-0"></div>
            )}
            
            {/* Step Description */}
            <div className="max-w-xs">
              <p className="text-gray-700 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
     
     
    </div>
    </div>
   </section>

</>      
  );
};

export default FeaturesOption;