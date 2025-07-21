import Image from 'next/image'
import React from 'react'

const Code_Magic = () => {
  return (
    <div className='grid-cols-2 h-[50vh] w-full grid gap-2 text-center  bg-green-700/50 rounded-md  '>
        <div>
 <h1 className=' text-6xl text-center '>NO Code tool</h1>

        </div>
<Image src='/No-Code-Illustration.svg' height={1000} width={1000} alt='ll'/>


    </div>
  )
}

export default Code_Magic