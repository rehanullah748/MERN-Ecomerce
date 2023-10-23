"use client"
import Checkbox from '@/components/Form/Checkbox'
import Input from '@/components/Form/Input'
import ColorList from '@/components/Form/colorList'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react'
import { TwitterPicker } from 'react-color'
import { FileUploader } from 'react-drag-drop-files'
import { useSearchParams, useRouter } from 'next/navigation'

const page = () => {
  const router = useSearchParams()
  const { push } = useRouter()
  const id = router.get("id")
  const [update, setUpdate] = useState({
    title: "",
    price: "",
    quantities: "",
    description: "",
    discount: "",
    category: "",
    image: "",
    colors: [],
  })
  const [errors, setErrors] = useState({})
  const [checked, setChecked] = useState({
    small: false,
    extrasmall: false,
    medium: false,
    large: false,
    extralarge: false,
  })
  const handleChange = async (img) => {
    const file = new FormData();
    file.append("file", img);
    file.append("upload_preset", "r4444res");
    file.append("cloud_name", "dgifwzl50");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dgifwzl50/image/upload",
        file
      );
      console.log(data)
      setUpdate({ ...update, image: data.secure_url });
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value })
  }
  const checkBoxOnChange = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked })
  }
  const saveColor = (color) => {
    const filtered = update.colors.filter((clr) => color.hex !== clr.color);
    setUpdate({ ...update, colors: [...filtered, { color: color.hex, id: uuidv4() }] })
  }
  useEffect(async () => {
    const fectchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/product/product-details/${id}`)
        console.log(data)
        setUpdate(data)
        setChecked(data.sizes)
       
      } catch (error) {
      }
    }
    fectchProduct();
  }, [id])

  const UpdateProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/product/update-product/${id}`, { ...update, ...checked })
      console.log(checked)
      console.log(update)
      push("/dashboard/all_products")
    } catch (error) {
      setErrors(error)
    }
  }

 
  
  return (
    <>
      <div className='grid  grid-cols-1 lg:grid-cols-2 gap-5'>
        <Input type='text' placeholder='product title' name='title' value={update.title} onChange={onChange} />
        <Input type='number' placeholder='quantities' name='quantities' value={update.quantities} onChange={onChange} />
        <Input type='number' placeholder='price' name='price' value={update.price} onChange={onChange} />
        <Input type='text' placeholder='discount' name='discount' value={update.discount} onChange={onChange} />
        <div>
          <select class="py-3 px-4 pr-9 block w-full outline-none border  border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" name='category' value={update.category} onChange={onChange} >
            <option selected >Select Product</option>
            <option>Shoes</option>
            <option>Clothes for Men use special</option>
            <option>Mobile</option>
          </select>
        </div>
        <div>
          <Checkbox checked={checked}  onChange={checkBoxOnChange} />
        </div>
        <div>
          <label className='mb-5' htmlFor="color">choose colors</label>
          <TwitterPicker onChangeComplete={saveColor} />
        </div>
        <div>
          <FileUploader handleChange={handleChange} />
        </div>
        <div>
          <label className='mb-5' htmlFor="color"></label>
          <ColorList colors={update?.colors} />
        </div>

        <div>
        </div>
      </div>
      <div className='mt-4'>
        <textarea name="description" class="py-3 px-4 block w-full border-[2px] outline-none border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows="6" placeholder="This is a description" value={update.description} onChange={onChange}></textarea>
      </div>

      <button className='bg-blue-700 rounded-lg px-5 py-3' onClick={UpdateProduct}>Update Product</button>
    </>

  )
}

export default page