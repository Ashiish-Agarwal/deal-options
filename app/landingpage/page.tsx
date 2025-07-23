
import { buttonVariants } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense   } from 'react'



import { redirect } from 'next/navigation'
import PricingPage from '@/components/pricing-page'

import { cn } from '@/lib/utils'
import MobileCMP from '@/components/Mobile-component'
import Image from "next/image"
import { uuidAction } from '@/server/users'
import FeaturesOption from './_components/Features-Option'
import VideoComponent from '@/components/VideoComponent'
import { Testimonial } from './_components/testimonial'
import SkeletonCard from '../loading'




const page = async () => {

    const session = await  uuidAction()
    

    // if(session) {
    //     return redirect('/dashboard')
    // }

  return (
    <Suspense fallback={<SkeletonCard />}>
      

    <div className='   p-2 '>
      <section className="min-h-screen font no-scrollbar   container flex items-center justify-center  text-balance flex-col gap-8 ">

        
        <div className='w-full h-full   border-0 grid sm:grid-cols-2 grid-cols-1 mt-20 '>

          <div className='w-full  h-full ml-10 p-2 '>
            
            <div className='flex flex-col'>

            <h1 className='text-lg lowercase font-semibold tracking-tight text-balance mt-10 googleFont'>Make Profit 🔥</h1>
            </div>
            
                  <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-balance mt-3 tracking-wide sm:tracking-wider md:tracking-widest font-semibold leading-tight sm:leading-snug md:leading-normal px-4 sm:px-0'>
  <span className='text-teal-500 dosisFont'>
    Deal
  </span>
  {' '}options make{' '}
  <br className='hidden sm:block' />
  <span className='sm:hidden'> </span>
  more{' '}
  <span className='text-teal-500 font-bold'>
    Easier
  </span>
  {' '}for{' '}
  <br className='hidden sm:block' />
  <span className='sm:hidden'> </span>
  your Products{' '}
  <span className='text-teal-500 font-bold'>
    Profit
  </span>
</h1>
                  

                  <h1 className=' text-2xl text-pretty pt-10 space-y-2    '>Optimize your product pricing <br /> 
                  <span className='text-teal-600 font-semibold ml-10'>

                  across countries to maximize 
                  </span>
                  <br />
                  <span className=' font-semibold ml-20'>

                   sales and get more <span className='font-semibold'>Sales</span>
                  </span>
                  </h1>
                  
  <div className=' text-center mt-16 gap-8 flex  w-full  justify-center items-center   '>

            

                  <Link href='/pricing'  className={cn(buttonVariants({
                    variant:'teal',
                    className:'w-48 text-lg rounded-md '
                  
                  }))}>Get Started Free <ArrowRightIcon/> </Link>
                  
                  </div>
                  

          </div>
          <div className='w-full   h-full   flex flex-col items-center justify-center mt-16 md:mt-5   '>
            <div className='w-52 space-y-2 '>
              <div className=' ml-62 bottom-[500px] w-20 absolute hidden md:block '>
            <p className='googleFont'>example</p>
            <Image
              src='/ARROW.svg'
              alt='arrow'
              width={50}
              height={50}
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
              </div> 
              
  <div className='flex flex-col items-center justify-center -mt-20 '>

            <MobileCMP/>
            
  </div>
            
             
            </div>
          </div>
          


        </div>
         
           

        </section>
      <section className='flex items-center justify-center flex-col gap-10  '>
        <FeaturesOption/>
        <div className='w-full h-full grid sm:grid-cols-3 grid-cols-1 gap-5 ml-5  '>

<div className='text-center'>
<span className='dosisFont text-3xl font-semibold -tracking-wider text-balance'>10X</span>
<p className='dosisFont text-2xl font-semibold tracking-tight text-balance'> your deals Income 🔥</p>
</div>
<div className='text-center'>
<span className='dosisFont text-3xl font-semibold -tracking-wider text-balance relative text-teal-800'>50X</span>


<p className='dosisFont text-2xl font-semibold tracking-tight text-balance'> Fast customization 🔌 </p>


</div>
<div className='text-center'>
<span className='dosisFont text-3xl font-semibold -tracking-wider text-balance'>300X</span>
<p className='dosisFont text-2xl font-semibold tracking-tight text-balance'> higher Lead custmores 💸 </p>
</div>



        </div>
       
        <div className=' sm:block hidden mr-20   '>
        <svg width="381" height="42" viewBox="0 0 381 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_204_81)">
<path d="M8.26631 17.089C11.2493 17.089 14.3744 16.911 17.3574 16.733C18.6358 16.733 19.7722 16.555 21.0506 16.555C26.4484 16.199 31.8463 15.8429 37.2441 15.4869C43.7783 15.1309 50.1704 14.5969 56.7046 14.2408C65.9378 13.5288 75.1709 12.9948 84.404 12.2827C86.5347 12.1047 88.6654 12.1047 90.7961 11.9267C96.194 11.5707 101.592 11.2147 106.99 11.0366C112.387 10.6806 117.785 10.3246 123.183 10.1466C125.314 9.96859 127.444 9.79058 129.575 9.79058C138.098 9.43455 146.763 9.07853 155.286 8.72251C160.542 8.5445 165.797 8.36649 171.195 8.01047C173.326 8.01047 175.315 7.83246 177.445 7.83246C185.684 7.65445 194.065 7.47644 202.304 7.29843C210.542 7.12042 218.639 6.94241 226.878 6.7644C229.009 6.7644 231.139 6.7644 233.412 6.7644C238.81 6.7644 244.066 6.7644 249.464 6.7644C257.844 6.7644 266.083 6.7644 274.464 6.58639C277.163 6.58639 279.862 6.58639 282.561 6.58639C288.243 6.58639 293.925 6.58639 299.607 6.58639C300.033 6.58639 300.601 6.58639 301.027 6.58639C288.243 6.7644 275.316 6.94241 262.532 7.29843C257.134 7.47644 251.878 7.47644 246.481 7.65445C244.208 7.65445 241.793 7.65445 239.52 7.83246C231.708 8.01047 224.037 8.36649 216.224 8.5445C207.275 8.90052 198.326 9.07853 189.377 9.43455C187.815 9.43455 186.394 9.61256 184.832 9.61256C180.002 9.96859 175.315 10.1466 170.485 10.5026C160.826 11.0366 151.166 11.5707 141.507 12.1047C140.087 12.1047 138.666 12.2827 137.246 12.4607C132.558 12.8168 127.729 13.3508 123.041 13.7068C114.518 14.4188 106.137 15.1309 97.6144 15.8429C95.3417 16.0209 92.9269 16.377 90.6541 16.555C85.2563 17.089 79.8584 17.623 74.4606 18.3351C67.6423 19.0471 60.682 19.7592 53.8637 20.4712C44.3465 21.5393 34.6872 22.6073 25.17 23.6754C22.8972 23.8534 20.6245 24.2094 18.2097 24.3874C14.0903 24.9215 9.97088 25.4555 5.85149 25.9895C5.42535 25.9895 4.99921 26.3455 4.99921 27.0576C4.99921 27.5916 5.42535 28.1257 5.85149 28.1257C7.41402 28.1257 8.8345 28.3037 10.397 28.3037C10.1129 29.1937 9.97088 29.7277 9.97088 30.2618C9.97088 32.2199 11.2493 34 12.9539 34C24.7439 33.1099 36.3918 32.0419 48.1818 31.3298C58.4092 30.7958 68.6367 30.0838 78.8641 29.5497C90.0859 28.8377 101.45 28.1257 112.672 27.5916C116.223 27.4136 119.774 27.2356 123.325 26.8796C124.319 26.8796 125.314 26.7016 126.45 26.7016C144.632 26.1675 162.814 25.4555 180.997 24.9215C190.656 24.5654 200.457 24.2094 210.116 24.0314C213.668 23.8534 217.077 23.8534 220.628 23.6754C239.236 23.3194 257.844 22.9633 276.453 22.6073C284.407 22.4293 292.362 22.2513 300.317 22.0733C307.135 21.8953 313.953 21.8953 320.772 21.5393C326.454 21.3613 331.993 21.0052 337.675 20.8272C340.516 20.6492 343.357 20.6492 346.056 20.4712C352.448 19.9372 358.84 19.4031 365.233 18.8691C364.807 19.5812 364.806 20.6492 364.949 21.3613C365.091 22.2513 365.517 22.9633 366.227 23.3194C366.795 23.6754 367.647 24.0314 368.216 23.6754C369.636 22.9634 371.057 22.2513 372.335 21.5393C372.335 21.5393 372.335 21.5393 372.193 21.5393C372.335 21.5393 372.335 21.3613 372.477 21.3613C372.619 21.3613 372.761 21.1832 372.761 21.1832H372.619C373.329 20.8272 374.04 20.4712 374.892 19.9372C375.602 19.5812 376.454 19.0471 377.165 18.6911C378.017 18.1571 378.727 17.623 379.58 17.089C380.432 16.555 381 15.1309 381 13.8848C381 13.1728 380.858 12.6387 380.574 11.9267C380.29 11.2147 379.58 10.3246 378.869 10.1466C378.159 9.96859 377.449 9.79058 376.739 9.79058C376.597 9.79058 376.454 9.79058 376.312 9.79058C375.886 9.79058 375.318 9.79058 374.892 9.96859C373.756 10.1466 372.761 10.3246 371.625 10.3246C370.773 10.3246 369.92 10.5026 368.926 10.5026C366.511 10.6806 364.238 10.8586 361.823 11.2147C361.255 11.2147 360.545 11.3927 359.977 11.3927C360.261 11.0366 360.403 10.6806 360.403 10.3246C360.545 9.96859 360.545 9.61257 360.545 9.25654C360.545 9.07853 360.545 8.72251 360.687 8.5445C360.687 8.18848 360.687 7.83246 360.545 7.65445C360.545 7.65445 360.687 7.65445 360.687 7.47644C361.113 7.12042 361.539 6.7644 361.823 6.05236C362.108 5.51832 362.25 4.80628 362.25 4.09424C362.25 3.3822 362.108 2.84817 361.823 2.13613C361.681 1.95812 361.539 1.60209 361.397 1.42408C360.971 0.890052 360.545 0.712042 360.119 0.534031C359.267 0.17801 358.272 0 357.278 0C356.426 0 355.715 0 354.863 0C353.727 0 352.59 0 351.454 0C349.891 0 348.187 0 346.624 0C342.363 0 338.102 0 333.84 0C329.863 0 325.743 0 321.766 0C318.073 0 314.522 0 310.828 0C296.197 0 281.709 0.17801 267.078 0.356021C256.14 0.534031 245.202 0.712042 234.264 0.712042C229.435 0.712042 224.463 0.890052 219.634 1.06806C208.696 1.42408 197.758 1.60209 186.821 1.95812C183.695 1.95812 180.57 2.13613 177.445 2.13613C175.599 2.13613 173.894 2.31414 172.048 2.31414C161.252 2.84817 150.456 3.3822 139.661 3.91623C136.394 4.09424 133.126 4.27225 129.717 4.45026C127.871 4.45026 126.024 4.62827 124.177 4.80628C113.382 5.51832 102.728 6.23037 91.9325 6.94241C86.3926 7.29843 80.8528 7.65445 75.3129 8.18848C65.7957 8.90052 56.2785 9.61256 46.9033 10.5026C38.6646 11.2147 30.4258 11.7487 22.187 12.2827C20.9086 12.4607 19.6301 12.4607 18.2097 12.6387C16.0789 12.8168 13.9482 12.8168 11.8175 12.9948C9.97088 13.7068 7.98221 13.7068 6.13559 13.7068C5.99354 12.9948 5.42535 12.4607 4.99921 12.6387C3.72078 12.6387 2.58439 12.8168 1.30596 12.9948C0.73777 13.1728 0.169579 13.5288 0.027531 14.2408C-0.114517 15.1309 0.311627 16.0209 0.879818 16.199C1.44801 16.377 2.0162 16.555 2.58439 16.733C3.15258 16.911 3.57873 16.911 4.14692 16.911C5.5674 17.089 6.84583 17.089 8.26631 17.089ZM340.658 11.3927C342.363 11.3927 344.21 11.3927 345.914 11.3927C346.056 11.9267 346.34 12.2827 346.624 12.6387C345.914 12.6387 345.204 12.8168 344.636 12.8168C343.357 12.8168 342.079 12.9948 340.8 12.9948C335.118 13.1728 329.579 13.5288 323.897 13.7068C321.34 13.8848 318.783 14.0628 316.226 14.0628C312.249 14.0628 308.129 14.2408 304.152 14.2408C294.919 14.4188 285.828 14.5969 276.595 14.7749C258.697 15.1309 240.941 15.4869 223.043 15.8429C210.258 16.0209 197.474 16.555 184.69 17.089C165.513 17.801 146.195 18.3351 127.018 19.0471C123.183 19.2251 119.348 19.4031 115.512 19.7592C104.575 20.4712 93.6371 21.0052 82.6994 21.7173C72.0458 22.4293 61.2502 22.9634 50.5966 23.6754C49.6022 23.6754 48.6079 23.8534 47.6136 23.8534C50.4545 23.4974 53.4375 23.3194 56.2785 22.9633C66.3639 22.0733 76.4493 21.0052 86.5347 20.1152C90.0859 19.7592 93.6371 19.4031 97.0462 19.0471C98.8929 18.8691 100.739 18.6911 102.444 18.6911C113.098 17.9791 123.609 17.089 134.121 16.377C136.109 16.199 138.24 16.0209 140.229 15.8429C143.212 15.6649 146.195 15.4869 149.036 15.4869C159.831 14.9529 170.627 14.4188 181.423 13.8848C183.837 13.7068 186.252 13.7068 188.525 13.5288C189.093 13.5288 189.804 13.5288 190.372 13.5288C192.076 13.5288 193.781 13.5288 195.343 13.3508C206.139 12.9948 217.077 12.8168 227.872 12.4607C232.844 12.2827 237.816 12.1047 242.787 12.1047C258.839 11.9267 275.032 11.7487 291.084 11.5707C307.845 11.5707 324.323 11.3927 340.658 11.3927Z" fill="#0D1927"/>
<path d="M29.5468 42C29.9763 42 30.3244 41.5523 30.3244 41C30.3244 40.4477 29.9763 40 29.5468 40C29.1174 40 28.7693 40.4477 28.7693 41C28.7693 41.5523 29.1174 42 29.5468 42Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_204_81">
<rect width="381" height="42" fill="white"/>
</clipPath>
</defs>
</svg>

</div>
      <div>
      

      </div>
        <div className='text-center w-full h-full mt-10  flex flex-col items-center justify-center'>

          <h1 className=' text-4xl '>Results in All Business-Critical Areas</h1>
<p className='text-balance dosisFont text-2xl mt-5 text-center'> We anylize Lot of Apps got the same issue and our Saas provide solution</p>

   <div className='w-full h-full    flex items-center justify-center flex-col '>

    <VideoComponent/>
   <h1 className='text-4xl dosisFont'>thats it 
  </h1>
   </div>
        </div>
        <PricingPage/>
      
        <div className='text-center w-full h-full overflow-hidden'>
       
       
        <Testimonial />
        </div>
      <div className='text-center mt-10 h-full  pb-32 pt-20 border-2 border-white bg-white rounded-md p-5  w-full   '>
      <h1 className='text-8xl dosisFont'>Ready to get started?</h1>
      <p className='text-balance dosisFont text-2xl  text-gray-700 mt-5 text-center '>Sign up for a free trial and start using our Saas today.</p>
      <Link href={"/pricing"} className={buttonVariants({variant:"teal", className:'mt-10',size:'lg'})}> sign up for free</Link>
      </div>
      </section>
    </div>
              </Suspense>
  );
}

export default page