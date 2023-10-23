"use client"
import { discount } from '@/Utils'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsArrowLeftCircleFill } from "react-icons/bs";


const page = () => {
  const {push} = useRouter()
  const router = useSearchParams()
  const id = router.get("id")
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(false)
 const [price, setPrice] = useState('')
  
  
  
  useEffect(() => {
    var ProductDetails = async() => {
      setLoading(true)
      try {
        const { data } = await axios.get(`http://localhost:8000/api/product/product-details/${id}`)
        console.log(data)
        setDetails(data)
        setLoading(false)
        const priceResponse = discount(data.price, data.discount);
        setPrice(priceResponse)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    ProductDetails();
  },[id])
  console.log(details)
  const goBack = () => {
    push("/dashboard/all_products")
  }
  return (
    <div>
      {loading ? "loading..."
      : <>
      <div className='w-[30px] h-[30px]'>
      <BsArrowLeftCircleFill className='w-full h-full cursor-pointer' onClick={goBack}/>
      </div>
      
      <div className='grid grid-cols gap-x-10 md:grid-cols-2'>
       
        <div className='relative'>
        <div class="w-[80px] h-[80px]  rounded-full bg-yellow-600 text-black flex justify-center items-center text-xl font-medium absolute left-[30px]  top-[30px]"><span>-50%</span>
        </div>
        <div  className="w-full h-[600px] border border-gray-200 flex justify-center items-center  overflow-hidden relative  md:mb-3 ">
        <Image className='object-contain w-[350px] shadow-md rounded-md  md:mb-0' src={details.image} alt='image' width={200} height={200} />
        </div>
          
        </div>
        
        <div className='flex flex-col mt-7 md:mt-2'>
          <div>
          <span className='text-gray-600 text-lg font-normal uppercase mb-2'>{details.title}</span>
          </div>
          <div className='my-4'>
        <span className="text-xl  font-medium text-qblack  aos-init aos-animate">{details.category}</span>
        </div>
        <div className='py-3'>
        <span class="text-md font-500 text-gray-420 line-through px-2">{details.price}</span>
          <span class="text-2xl font-500 text-red-500">${price}</span>
        </div>
        <div className='py-3 flex flex-col'>
        <span class="text-md font-500 text-gray-500 ">Discount</span>
          <span class="text-2xl font-500 text-red-500">{details.discount}%</span>
        </div>
        <div>
        <p className="text-gray-500 py-10 text-sm text-normal leading-7 aos-init aos-animate">{details.description}</p>
        </div>
        <div>
          <span></span>
        </div>

      

        </div>
      </div> </> }
      
    </div>
    
  )
}

export default page




