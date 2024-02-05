"use client"
import { addToCart } from '@/Store/Reducers/cart'
import { openModel } from '@/Store/Reducers/userReducer';
import { check_auth } from '@/app/actions';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useDispatch } from 'react-redux'


const CountProducts = ({details, auth}) => {
console.log(auth)
  
  console.log(details?.colors[0]?.color)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState([])
  const [count, setCount] = useState(1)
  const dispatch = useDispatch();

    const Increment = () => {
      setCount(count+1)
  }
  const Decrement = () => {
      if (count > 1) {
          setCount(count-1)
      }
  }
  useEffect(() => {
    if(details?.colors?.length > 0) {
      setSelectedColor(details?.colors[0])
    }

  }, [details])
  const handleSizeClick = (size) => {
    // setSelectedSize([...selectedSize, size]);
    setSelectedSize(size);
  };
    console.log(selectedSize)
    
  return (
    <>
     <h3 className='text-base md:text-lg text-heading font-semibold mb-3 capitalize mt-5'>Sizes</h3>
                <ul className='flex flex-wrap colors ltr:-mr-3 rtl:-ml-3 space-x-7'>
                  {details?.sizes?.extrasmall && <li onClick={() => handleSizeClick('extrasmall')} className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>xs</li>}
                  {details?.sizes?.small && <li onClick={() => handleSizeClick('small')} className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>sm</li>}
                  {details?.sizes?.medium && <li onClick={() => handleSizeClick('medium')} className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>md</li>}
                  {details?.sizes?.large && <li onClick={() => handleSizeClick('large')} className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>lg</li>}
                  {details?.sizes?.extralarge && <li onClick={() => handleSizeClick('extralarge')} className='cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 ltr:md:mr-3 rtl:md:ml-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black border-black'>xl</li>}
                   
                </ul>
                {details?.colors?.length > 0 && <>
                <h3 className='text-base md:text-lg text-heading font-semibold mb-3 capitalize mt-5'>Color</h3>
                <div className='flex flex-wrap space-x-3'>
      {details?.colors?.map(color =>(
          <div onClick={() => setSelectedColor(color)} key ={color.id}  className='flex items-center justify-center w-[30px] h-[30px] rounded-full cursor-pointer p-3 ' style={{background:color.color}}>
          {color.color === selectedColor.color && <CheckRoundedIcon  />} 
          </div>
      ))}
      </div></>}
       
      <div className='flex items-center mt-5 '>
    <span onClick={Increment} className='border border-1 py-3 px-4'><AiOutlinePlus size={25} /></span>
    <input className='border border-1 w-[100px] py-3 text-black text-center' type="text" value={count} />
    <span onClick={Decrement} className='border border-1 py-3 px-4'><AiOutlineMinus size={25} /></span>
    <button onClick={()=>{
      if(auth?.auth) {
        if(details?.sizes?.xs || details?.sizes?.sm || details?.sizes?.md || details?.sizes?.lg || details?.sizes?.xl){
          if(selectedSize === ""){
           toast.error("please choose a size")
          }else{
            
   dispatch(addToCart({...details,userQuantities:count,selectedColor,selectedSize, userId: auth?.user?._id}))
          }
   }else{
           
   dispatch(addToCart({...details,userQuantities:count,selectedColor, userId: auth?.user?._id }))
   }
      } else {
       
        dispatch(openModel())
      }
 }
    } className='text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md  h-11 md:h-12 px-5 bg-heading text-white py-2 transform-none normal-case bg-black hover:text-white hover:bg-gray-600 hover:shadow-cart hover:cursor-pointer w-full md:w-6/12 xl:w-full  hover:bg-gray-400' >Add to Cart </button>
    
  </div>
    </>
    
  )
}

export default CountProducts
