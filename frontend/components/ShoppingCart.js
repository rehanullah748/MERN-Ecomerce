import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { toggleModel } from '@/Store/Reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, removeProduct, totalPrice } from '@/Store/Reducers/cart';

const ShoppingCart = () => {
    const [filterProducts, setFilterProducts] = useState([])
    const dispatch = useDispatch()
    const {cartModel, user} = useSelector((state) => state.userReducer)
    const {cart, totalAmount} = useSelector((state) => state.cartReducer)
    console.log(totalAmount)
  useEffect(() => {
  const cartProducts = cart.filter(item => item.userId === user?._id)
  setFilterProducts(cartProducts)
  console.log(cartProducts)
  },[cart,user])
  
  useEffect(() => {
  dispatch(totalPrice(user?._id))
  },[cart, user])
  return (
    
    <>
        <div className='flex justify-between mb-6'>
          <div className='flex space-x-4'>
          <h1 className='font-extrabold text-lg'>My Cart</h1>
          <span className='w-7 h-7 rounded-md flex items-center justify-center text-sm bg-blue-600 text-white'>{filterProducts.length}</span>
          </div>
          <span className='cursor-pointer' onClick={()=>dispatch(toggleModel())}><IoMdClose  /></span>
        </div>
      
      
  {/* seconed row */}
  {filterProducts.map((product) => (
     <div className='relative grid grid-cols-1 md:grid-cols-2 px-6 pt-5 pb-5 border-t'>
     <div className='flex gap-8'>
     <span className='relative w-[100px] h-[100px]'><Image className='w-full h-full object-contain' src={product.image} fill alt="" /></span>
     <div className='space-y-1'>
         <h1 className='text-lg font-semibold'>{product.title}</h1>
         <div className='flex items-center space-x-2 '>
         <span className='text-lg font-bold'>${product.price}</span>
         
         </div>
         <div className='flex w-[120px] items-center mt-8 justify-between px-2 border border-gray-1 py-2'>
           <span onClick={()=>dispatch(increment({id: product._id, user}))} className=' text-center bg-gray-200  p-1 rounded-lg'><FiPlus size={20} /></span>
           <span className='text-center w-10'>{product.userQuantities}</span>
           <span onClick={()=>dispatch(decrement({id: product._id, user}))} className=' text-center bg-gray-200  p-1 rounded-lg'><FiMinus size={20}/></span>
         </div>
         
     </div>
     </div>
  
     <div className='flex flex-col items-end '>
     <div className=''><IoMdClose onClick={() =>dispatch(removeProduct({id: product._id, user}))}/></div>
     <div className='mt-[70px] text-lg font-bold text-blue-700'>${product.userQuantities * product.price}</div>
     </div>
    
   </div>
  ))}
      <div className='flex justify-between'>
      <h1>Total Price</h1>
      <span>{totalAmount}</span>
     </div>
  
      </>
  )
}

export default ShoppingCart
