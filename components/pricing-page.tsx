'use client'


import React from 'react';
import { subscriptionTiersInOrder, TierNames } from '@/data/tier'; // Adjust path as needed
import { CheckIcon } from '@heroicons/react/24/outline'; // Install @heroicons/react if you haven't
import { assignUserTier } from '@/server/actions';





interface PricingPageProps {
 
  onSubscribeClick?: (tierName: TierNames) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onSubscribeClick }) => {


    const subscribe =  assignUserTier

  
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Choose the plan that's right for you. Get started for free, or upgrade for more features and capacity.
        </p>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:max-w-4xl lg:grid-cols-2 xl:max-w-none xl:grid-cols-4">
          {subscriptionTiersInOrder.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10
                ${tier.name === 'Standard' ? 'lg:scale-105 lg:ring-2 lg:ring-indigo-600 lg:z-10' : ''}
              `}
            >
              <div>
                <h3
                  id={tier.name.toLowerCase()}
                  className={`text-lg font-semibold leading-8 ${
                    tier.name === 'Standard' ? 'text-indigo-600' : 'text-gray-900'
                  }`}
                >
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {tier.priceInCents === 0 ? 'Free' : `$${(tier.priceInCents / 100).toFixed(0)}`}
                  </span>
                  {tier.priceInCents !== 0 && (
                    <span className="text-lg font-semibold leading-6 tracking-wide text-gray-600">/month</span>
                  )}
                </div>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {tier.name === 'Free' && 'Perfect for trying out our service.'}
                  {tier.name === 'Basic' && 'Ideal for small businesses getting started.'}
                  {tier.name === 'Standard' && 'Everything you need for growing your business.'}
                  {tier.name === 'Premium' && 'Unleash the full power for large operations.'}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  <li className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    Max {tier.maxNumberOfProducts} Products
                  </li>
                  <li className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    Up to {tier.maxNumberOfVisits.toLocaleString()} Visits
                  </li>
                  {tier.canAccessAnalytics && (
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      Access to Analytics
                    </li>
                  )}
                  {tier.canCustomizeBanner && (
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      Customizable Banner
                    </li>   
                  )}
                  {tier.canRemoveBranding && (
                    <li className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      Remove Branding
                    </li>
                  )}
                  {/* Add more features as needed based on your `subscriptionTiers` */}
                </ul>
              </div>
              <button
                onClick={() => subscribe()  }
                aria-describedby={tier.name.toLowerCase()}
                className={`mt-8 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6  focus-visible:outline-2 focus-visible:outline-offset-2
                  ${tier.name === 'Standard'
                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600'
                  }
                `}
              >
                {tier.name === 'Free' ? 'Sign up for Free' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;