
import Navbaar from './_components/Navbaar'
import Top_Baar from '@/components/top-baar'
import Footer from '@/components/footer'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <div>

    </div>
    <div className='w-full h-full bg-sketch-dots   '>
      <Top_Baar/>
      <Navbaar/>
      <div className='  flex flex-col items-center justify-center h-full w-full mt-10 overflow-hidden'>

      {children}
      </div>
     
      <Footer/>
    </div>

    </>
  )
}

export default layout