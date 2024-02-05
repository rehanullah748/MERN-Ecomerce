import CustomImage from '@/components/Global/CustomImage';
import axios from 'axios'
import Navebar from '@/components/Navebar'
import CountProducts from '@/components/CountProducts';
import { BsCart } from 'react-icons/bs';
import { check_auth } from '@/app/actions';

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  try {
    const { data } = await axios.get(`${process.env.URL}/product/${params?.slug}`)
    console.log(data)
    return {
      title: data.title,
      description: data.description?.slice(0,100)
      
    }
} catch (error) {
    
    console.log("error", error)
}
  
 console.log("show me iron", params)
 
 
}
const fetchDetails = async (slug) => {
  
  console.log(slug)
    try {
        const { data } = await axios.get(`${process.env.URL}/product/${slug}`)
        console.log(data)
        return data;
    } catch (error) {
        
        console.log("error", error)
    }
}

const page = async(props) => {
  const auth = await check_auth();
  console.log("checking auth", auth)
    const details = await fetchDetails(props.params.slug)
    console.log(details)
   
  return (
 <>
 <div>
    <Navebar auth={auth}/>
    
  <div className='max-w-screen-xl mx-auto my-20'>
    
      <div className='grid grid-cols md:grid-cols-2 '>
        <div className='w-full h-[250px] relative'><CustomImage url={details?.image} fallback={'/fallback.png'}/></div>
        <div>
            <h1 className='text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5' >{details?.title}</h1>
            <p className='text-body text-sm lg:text-base leading-6 lg:leading-8'>{details?.description}</p>
            <div className='flex items-center  space-x-2 mt-5'>
            <span className='text-2xl font-semibold text-gray-500 line-through'>{details?.price}$</span>
            <span className='text-2xl font-semibold text-black'>{details?.price-details?.price*details?.discount/100}$</span>
            
            </div>
            <>
                
      <div>
        <CountProducts auth={auth} details={details}/>

      </div>
     
            </>
        </div>
        
      </div>
    </div>
    </div>
    </>
  )
}

export default page
