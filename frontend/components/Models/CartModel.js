"use client"

import { useSelector } from 'react-redux';
import ShoppingCart from '../ShoppingCart';
import { useState } from 'react';
import CheckOutForm from '../Home/CheckOutForm';


const CartModel = () => {
  const [state, setState] = useState(0)
  const {cartModel, user} = useSelector((state) => state.userReducer)
  return (
    <>
    {!cartModel ? "" : <div className=' backdrop-blur-md flex justify-center items-center fixed bg-black/40 w-full h-full z-[99999] px-7 py-8'>
    <div className='w-[80%] max-h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:w-4
    [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-slate-700
    dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 bg-white p-7 rounded-lg'>
    {state === 0 ? <ShoppingCart/> : state === 1 ? <CheckOutForm/> : ""}
    <div className='flex border-t justify-between items-center pt-4'>
      {state > 0 && <button onClick={()=>setState(state - 1)} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  Go Back
</button> }
    
    <button onClick={()=>setState(state + 1)} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800">
  Check out
</button>
    </div>
</div>
    
  </div> }
  </>
    )
   
  
}

export default CartModel
 