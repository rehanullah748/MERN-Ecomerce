"use client"
import { addToCart } from '@/Store/Reducers/cart'
import { useState } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai' 
import { useDispatch } from 'react-redux'

const CountProducts = ({details}) => {
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
  return (
    <div className='flex items-center mt-5 '>
    <span onClick={Increment} className='border border-1 py-3 px-4'><AiOutlinePlus size={25} /></span>
    <input className='border border-1 w-[100px] py-3 text-black text-center' type="text" value={count} />
    <span onClick={Decrement} className='border border-1 py-3 px-4'><AiOutlineMinus size={25} /></span>
    <button onClick={() => dispatch(addToCart({...details, userQuantities:count}))} className='w-[350px] rounded lg py-3 bg-black text-white'>Add To Cart</button>
    
  </div>
  )
}

export default CountProducts
