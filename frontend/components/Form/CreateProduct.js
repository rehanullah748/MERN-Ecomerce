'use client'
import React, { useEffect, useState } from 'react'
import { FileUploader } from "react-drag-drop-files";
import Checkbox from './Checkbox'
import ColorList from './colorList'
import Input from './Input'
import { TwitterPicker } from 'react-color';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useMutation } from 'react-query';
import Spinner from '../Spinner';
import { errorsConversion } from '@/Utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CreateProduct = () => {
    const {push} = useRouter()
    const [state, setState] = useState({
        title: "",
        price: "",
        quantities: "",
        description: "",
        discount: "",
        category: "",
        image: "",
        colors: [],
        
    })
    const [checked, setChecked] = useState({
        small: false,
        extrasmall: false,
        medium: false,
        large: false,
        extralarge: false,
      })

      const [errors, setErrors] = useState({})
      
  const checkBoxOnChange = (e) => {
    setChecked({...checked, [e.target.name]: e.target.checked})
    console.log(checked)
  }
    const deleteColor = (color) => {

        const filtered = state.colors.filter((clr) => clr.color !== color.color)
        setState({ ...state, colors: filtered })
    }
    const saveColor = (color) => {

        const filtered = state.colors.filter((clr) => color.hex !== clr.color);
        setState({ ...state, colors: [...filtered, { color: color.hex, id: uuidv4() }] })
    }


    const onChange = (e) => {

        setState({ ...state, [e.target.name]: e.target.value })
    }
    const [imageLoader, setImageLoader] = useState(false)
    const fileTypes = ["JPG", "PNG", "JPEG"];
    const handleChange = async (img) => {
        const file = new FormData();
        file.append("file", img);
        file.append("upload_preset", "r4444res");
        file.append("cloud_name", "dgifwzl50");
        setImageLoader(true)
        try {
            const { data } = await axios.post(
                "https://api.cloudinary.com/v1_1/dgifwzl50/image/upload",
                file
            );
            console.log(data)
            setImageLoader(false)
            setState({ ...state, image: data.secure_url });
        } catch (error) {
            setImageLoader(false)
            toast.error("image upload failed")
        }
    };
    const { error, isError, isSuccess, isLoading, mutate, data} = useMutation(data => {
        return axios.post('http://localhost:8000/api/product/create-product', data)
        
        
      })
      console.log(data)
      
   
    const CreateProduct = () => {
        mutate({...state, sizes: checked})
        
    }
    useEffect(() => {
        if(isError) {
            if(error?.response?.status === 400 ) {
               
                const response = errorsConversion(error?.response?.data?.errors);
                setErrors(response);
                  }
        }
        if(isSuccess) {
toast.success("product has been created")
push("/dashboard/all_products")
        }
    }, [isError,isSuccess])
    console.log(errors)
    return (
        <>

            <h1 className='text-lg mb-5'>Create Product</h1>
            <div className='grid  grid-cols-1 lg:grid-cols-2 gap-7'>
                <Input error={errors.title} type='text' placeholder='product title' name='title' value={state.title} onChange={onChange} />
                
                <Input error={errors.price} type='number' placeholder='product price' name='price' value={state.price} onChange={onChange} />
                <Input error={errors.quantities} type='number' placeholder='quantities' name='quantities' value={state.quantities} onChange={onChange} />
                <Input error={errors.discount} type='text' placeholder='discount' name='discount' value={state.discount} onChange={onChange} />
                 <div>
                <select class="py-3 px-4 pr-9 block w-full outline-none border  border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" name='category' value={state.category} onChange={onChange}>
                    <option selected >Select Category</option>
                    <option>Shoes</option>
                    <option>Clothes</option>
                    <option>Mobile</option>
                    <option>computer accesseries</option>
                    <option>cosmetices</option>
                    <option>food</option>
                    
                </select>
                {errors.category && (
              <span className="text-rose-600">{errors.category}</span>
            )}
                </div>
                
                <div>
                    <Checkbox  checked={checked}  onChange={checkBoxOnChange}  />
                   
                </div>
                <div>
                    <label className='mb-5' htmlFor="color">choose colors</label>
                    <TwitterPicker onChangeComplete={saveColor} />
                </div>

                <div>
                    {imageLoader ? <Spinner/> : state.image ? <div className='w-full h-[200px] relative'><Image fill className='w-full h-full object-contain' src={state.image}/></div> :  <FileUploader handleChange={handleChange} name="file"  types={fileTypes} />}
                   
                </div>
            </div>
            <div className='flex w-4/12 mt-4'>
                <ColorList colors={state.colors} deleteColor={deleteColor} />
            </div>
            <div>
            <textarea name="description" value={state.description} onChange={onChange} class="py-3 px-4 block w-full border-[2px] outline-none border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows="6" placeholder="This is a description"></textarea>
            {errors.description  && <span className='text-rose-600'>{errors.description}</span> }
            </div>
           
            { isLoading ? <Spinner/> :  <button onClick={CreateProduct} type="button" class="py-3 mt-5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-all text-sm dark:focus:ring-gray-900 dark:focus:ring-offset-gray-800">
  Create Product
</button> }
           

        </>
    )
}

export default CreateProduct