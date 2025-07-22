
import Navbaar from './_components/Navbaar'
import Top_Baar from '@/components/top-baar'
import Footer from '@/components/footer'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <div>

    </div>
    <div className='w-full h-full bg-sketch-dots relative '>
      <Top_Baar/>
      <Navbaar/>
      {children}
     
      <Footer/>
    </div>

    </>
  )
}

export default layout