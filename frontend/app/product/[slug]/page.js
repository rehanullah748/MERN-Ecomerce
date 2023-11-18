import CustomImage from '@/components/Global/CustomImage';
import axios from 'axios'
import Navebar from '@/components/Navebar'
import CountProducts from '@/components/CountProducts';
import { BsCart } from 'react-icons/bs';


const fetchDetails = async (slug) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/api/product/${slug}`)
        return data;
    } catch (error) {
        
        console.log("error", error)
    }
}

const page = async(props) => {
    console.log(props)
    const details = await fetchDetails(props.params.slug)
    console.log(details)
   
  return (
 <>
 <div>
    <Navebar/>
    
  <div className='max-w-screen-xl mx-auto my-20'>
    
      <div className='grid grid-cols md:grid-cols-2 '>
        <div className='w-full h-[250px] relative'><CustomImage url={details.image} fallback={'/fallback.png'}/></div>
        <div>
            <h1 className='text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5' >{details.title}</h1>
            <p className='text-body text-sm lg:text-base leading-6 lg:leading-8'>{details.description}</p>
            <div className='flex items-center  space-x-2 mt-5'>
            <span className='text-2xl font-semibold text-gray-500 line-through'>{details.price}$</span>
            <span className='text-2xl font-semibold text-black'>{details.price-details.price*details.discount/100}$</span>
            
            </div>
            <div>
                <h3 className='text-base md:text-lg text-heading font-semibold mb-3 capitalize mt-5'>Sizes</h3>
                <ul className='flex flex-wrap colors ltr:-mr-3 rtl:-ml-3 space-x-7'>
                    <li className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>sm</li>
                    <li className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>md</li>
                    <li className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>lg</li>
                    <li className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>xl</li>
                    <li className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>xsm</li>
                </ul>
                <h3 className='text-base md:text-lg text-heading font-semibold mb-3 capitalize mt-5'>Color</h3>
                <div className='flex flex-wrap space-x-3'>
      {details.colors.map(color =>(
          <div key ={color.id}  className='w-[30px] h-[30px] rounded-full cursor-pointer p-3 ' style={{background:color.color}}>
  
          </div>
      ))}
      </div>
      <div>
        <CountProducts details={details}/>
      </div>
     
            </div>
        </div>
        
      </div>
    </div>
    </div>
    </>
  )
}

export default page
