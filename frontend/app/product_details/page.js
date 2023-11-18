"use client"
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const page = () => {
    const [details, setDetails] = useState({})
    const params = useSearchParams();
    const id = params.get("id")
    const getProductById = async() => {
        const { data } = await axios.get(`http://localhost:8000/api/product/product-details/${id}`)
        return data;
    }
    const { data, isError, isFetching } = useQuery('productDetails', getProductById)
    useEffect(() => {
        if (!isError && !isFetching) {
          setDetails(data)
          console.log(details)
          
        }
        
      }, [data, isError, isFetching])
  return (
    <div>{details.title}</div>
  )
}

export default page