import { Aperture } from "lucide-react"
import Image from "next/image"





const Trust_Page = () => {

    const trust_img=[

        {
            img:'logo.dark.svg',
            name:"Aperture"
        },
        {
            img:'logo.dark.svg',
            name:"Aperture"
        },
        {
            img:'logo.dark.svg',
            name:"Aperture"
        },
        {
            img:'logo.dark.svg',
            name:"Aperture"
        },
        {
            img:'logo.dark.svg',
            name:"Aperture"
        },
        {
            img:'logo.dark.svg',
            name:"Aperture" 
        },
        {
            img:'logo.dark.svg',
            name:"Aperture" 
        },
        {
            img:'logo.dark.svg',
            name:"Aperture" 
        },
        {
            img:'logo.dark.svg',
            name:"Aperture" 
        },
        {
            img:'logo.dark.svg',
            name:"Aperture" 
        }
    ]
  return (
   <>
    <div className="bg-zinc-900 h-80    w-full text-center rounded-md  ">
        <p className="text-4xl w-full p-10  text-white">trusted by companies</p>
   <div className=" flex  gap-5 w-full ">

      
        {
            trust_img.map((item,index)=>(
                <div key={index} className="flex">
                    <div className="w-10 h-full   flex gap-10  ">
                     <Aperture/>
                      <p className="text-white font-serif text-xl">{item.name}</p> 
                  <Image src={item.img} alt="img" width={100} height={100}/>
                    </div>
                </div>
            ))
        }
        
   </div>
       
        
    </div>
   </>
  )
}

export default Trust_Page