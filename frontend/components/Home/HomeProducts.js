"use client"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import CustomImage from '../Global/CustomImage'
import { useSearchParams, useRouter } from 'next/navigation'
import { Pagination } from '@mui/material'
import  Link  from 'next/link'


const HomeProducts = () => {
  const { push } = useRouter()
  const params= useSearchParams()
  let page= params.get("page")
  page = !page || Number(page)<=0 ? 1 : page
    const [products, setProducts]= useState([])
    const [count, setCount]= useState(0)
    console.log(count)
    const totalLinks = Math.ceil(count/8);
    console.log(totalLinks)

  const getproducts = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/product/home-products/${page}`)
    console.log(data)
    return data;
  }

  const { data, isError, isFetching } = useQuery(['products', page], getproducts)
  const handlePaginationChange = (e, value) => {
    push(
      `/?page=${Number(value)}`,
      undefined,
      {
        shallow: true,
      }
    )
  }
  useEffect(() => {
    if (!isError && !isFetching) {
      setProducts(data.products)
      setCount(data.total)
      
    }
  }, [data, isError, isFetching])
  console.log(products)
  
  return (
    <div className='max-w-[1200px] w-full mx-auto mt-20'>
      <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>{
        isFetching ? "loading" : products?.length > 0 && products?.map((product) => {
          return (
            <Link href={`/product/${product?.slug}`} key={product._id} className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className='w-full h-[200px] relative'>
                <CustomImage url={product.image} fallback={'/fallback.png'} /></div>
              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {product.title}
                </h3>
              <span className='space-x-4 line-through text-gray-500'>{product.price}$</span>
              <span className='text-gray-700 p-3 font-bold text-lg'>{product.price-product.price*product.discount/100}$
              </span>
              </div>
            </Link>
          )
        })
      }</div>
{products?.length !==0 &&  <Pagination
        count={totalLinks}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        shape="rounded"
        className="mt-3"
        onChange={handlePaginationChange}
      /> }

    </div>
  )
}

export default HomeProducts
